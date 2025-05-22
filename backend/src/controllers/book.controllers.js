import { validateBookInfo } from "../utils/book.utils.js";
import cloudinary from "../utils/cloudinary.js";
import { Book } from "../models/book.model.js";
import { deleteUploadedFiles } from "../utils/auth.utils.js";
import { sendRes } from "../utils/responseHelper.js";
import { logError } from "../utils/comman.utils.js";
import { BookRequest } from "../models/bookrequest.model.js";
import { Review } from "../models/review.model.js";
import { Notification } from "../models/notification.model.js";

export const addNewBook = async (req, res) => {
  try {
    const { title, author, genre, condition, location, publicationYear, externalURL } = req.body;
    const owner = req.user._id;

    const result = validateBookInfo(title, author, genre, condition, location);
    if (!result.isvalid) {
      deleteUploadedFiles(req.files);
      return sendRes(res, 422, result.message);
    }

    let image = [];
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );

      const uploadedImages = await Promise.all(imageUploadPromises);
      image = uploadedImages.map(img => img.secure_url);
      deleteUploadedFiles(req.files);
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      condition,
      location,
      publicationYear,
      externalURL,
      image: image[0],
      owner
    });

    if (!newBook) return sendRes(res, 500, "Error adding new book.");

    return sendRes(res, 201, "Book added successfully.", newBook);
  }
  catch (error) {
    deleteUploadedFiles(req.files);
    logError("addNewBook (book controllers)", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("owner", "_id firstName lastName profilePic")
      .sort({ createdAt: -1 });

    return sendRes(res, 200, "Books retrieved successfully", books);
  }
  catch (error) {
    logError("getAllBooks (book controllers)", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return sendRes(res, 404, "No book found with the provided ID.");
    }

    return sendRes(res, 200, "Book deleted successfully.");
  } catch (error) {
    logError("deleteBookById", error); // LOG ERROR
    return sendRes(res, 500, "Something went wrong on our side. Please try again later."); // SEND ERROR RESPONSE
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, genre, condition, location, publicationYear, externalURL, } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const uploadedImages = await Promise.all(imageUploadPromises);
      images = uploadedImages.map(img => img.secure_url);
      deleteUploadedFiles(req.files);
    }

    const newBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      genre,
      condition,
      location,
      publicationYear,
      externalURL,
      image: images[0],
    });

    return sendRes(res, 201, "Book Updates successfully.", newBook);

  } catch (error) {
    deleteUploadedFiles(req.files?.image);
    logError("updateBook", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

export const createBookRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const loggedInUser = req.user;

    const book = await Book.findById(id);
    if (!book) return sendRes(res, 404, "Book not found");

    if (book.owner.toString() === loggedInUser._id) {
      return sendRes(res, 400, "You cannot request your own book");
    }

    // Create book request and notification concurrently
    const [bookRequest] = await Promise.all([
      BookRequest.create({
        book: id,
        requester: loggedInUser._id,
        owner: book.owner,
        message,
      }),
      Notification.create({
        from: loggedInUser._id,
        to: book.owner,
        message: `${loggedInUser.name} has requested your book.`,
      })
    ]);

    return sendRes(res, 201, "Book request created successfully", bookRequest);
  } catch (error) {
    logError("createBookRequest", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

export const getBookRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await BookRequest.find({
      $or: [{ requester: userId }, { owner: userId }]
    })
      .populate("book", "title author") // Customize the fields you want
      .populate("requester", "name email")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    return sendRes(res, 200, "Book requests fetched successfully", requests);
  } catch (error) {
    logError("getBookRequests", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

export const updateBookRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!["approved", "rejected"].includes(status)) {
      return sendRes(res, 400, "Invalid status value");
    }

    const request = await BookRequest.findById(requestId);

    if (!request) return sendRes(res, 404, "Book request not found");

    if (request.owner.toString() !== userId) {
      return sendRes(res, 403, "You are not authorized to update this request");
    }

    if (request.status !== "pending") {
      return sendRes(res, 400, "Request has already been processed");
    }

    request.status = status;
    await request.save();

    return sendRes(res, 200, `Book request ${status} successfully`, request);
  } catch (error) {
    logError("updateBookRequestStatus", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    console.log(bookId, rating, comment, userId);


    const book = await Book.findById(bookId);
    if (!book) return sendRes(res, 404, "Book not found");

    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) return sendRes(res, 400, "You have already reviewed this book");

    const review = await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    return sendRes(res, 201, "Review added successfully", review);
  } catch (error) {
    logError("addReview", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

export const getReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate("user", "firstName lastName profilePic")
      .sort({ createdAt: -1 });

    // Transform the reviews to match the expected format
    const formattedReviews = reviews.map(review => ({
      _id: review._id,
      user: {
        firstName: review.user.firstName,
        lastName: review.user.lastName,
        profilePicture: review.user.profilePic || ""
      },
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt
    }));

    return sendRes(res, 200, "Reviews fetched successfully", formattedReviews);
  } catch (error) {
    logError("getReviewsForBook", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};

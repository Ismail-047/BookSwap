import { validateBookInfo } from "../utils/book.utils.js";
import cloudinary from "../utils/cloudinary.js";
import { Book } from "../models/book.model.js";
import { deleteUploadedFiles } from "../utils/auth.utils.js";
import { sendRes } from "../utils/responseHelper.js";
import { logError } from "../utils/comman.utils.js";
import { BookRequest } from "../models/bookrequest.model.js";

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
      .populate("owner", "_id firstName lastName")
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
    const { bookId, message } = req.body;
    const loggedInUser = req.user;

    const book = await Book.findById(bookId);
    if (!book) return sendRes(res, 404, "Book not found");

    if (book.owner.toString() === loggedInUser._id) return sendRes(res, 400, "You cannot request your own book");

    const bookRequest = await BookRequest.create({
      book: bookId,
      requester: req.user.id,
      owner: book.owner,
      message,
    });

    return sendRes(res, 201, "Book request created successfully", bookRequest);
  }
  catch (error) {
    logError("createBookRequest", error);
    return sendRes(res, 500, "Something went wrong on our side. Please try again.");
  }
};


// // 3. Update the status of a book request
// exports.updateBookRequestStatus = async (req, res) => {
//   try {
//     const { requestId, status } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(requestId)) {
//       return res.status(400).json({ message: "Invalid request ID format" });
//     }

//     const bookRequest = await BookRequest.findById(requestId);
//     if (!bookRequest) {
//       return res.status(404).json({ message: "Book request not found" });
//     }

//     const book = await Book.findById(bookRequest.book);
//     if (!book) {
//       return res.status(404).json({ message: "Related book not found" });
//     }

//     if (book.owner.toString() !== req.user.id.toString()) {
//       return res.status(403).json({ message: "Only the book owner can approve or reject requests" });
//     }

//     // Update status
//     bookRequest.status = status;

//     if (status === "approved") {
//       book.status = "unavailable";
//       await book.save();
//     }

//     await bookRequest.save();

//     // ✅ Create notification for requester
//     const notificationMessage = status === "approved"
//       ? `Your request for "${book.title}" has been approved.`
//       : `Your request for "${book.title}" has been rejected.`;

//     await Notification.create({
//       user: bookRequest.requester,
//       message: notificationMessage
//     });

//     res.status(200).json({ message: `Request ${status} successfully`, bookRequest });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

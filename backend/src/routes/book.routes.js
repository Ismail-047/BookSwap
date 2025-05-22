import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { upload } from "../middlewares/multer.js";
import { addNewBook, addReview, createBookRequest, deleteBookById, getAllBooks, getBookRequests, getReviewsForBook, updateBook, updateBookRequestStatus } from "../controllers/book.controllers.js";

const router = express.Router();

router.get("/get-all-books", getAllBooks);

router.post("/add-new-book", authenticateToken, upload.array("image", 1), addNewBook);

router.patch("/update-book/:id", authenticateToken, upload.array("image", 1), updateBook);

router.delete("/delete-book/:id", authenticateToken, deleteBookById);

router.post("/request-book/:id", authenticateToken, createBookRequest);

router.get("/get-book-requests", authenticateToken, getBookRequests);

router.patch("/update-book-request-status", authenticateToken, updateBookRequestStatus);

router.post("/add-review/:bookId", authenticateToken, addReview);

router.get("/get-reviews/:bookId", getReviewsForBook);

export default router;

import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { upload } from "../middlewares/multer.js";
import { addNewBook, deleteBookById, getAllBooks, updateBook } from "../controllers/book.controllers.js";

const router = express.Router();

router.get("/get-all-books", getAllBooks);

router.post("/add-new-book", authenticateToken, upload.array("image", 1), addNewBook);

router.patch("/update-book/:id", authenticateToken, upload.array("image", 1), updateBook);

router.delete("/delete-book/:id", authenticateToken, upload.array("image", 1), deleteBookById);

export default router;

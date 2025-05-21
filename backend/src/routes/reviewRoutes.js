const express = require("express");
const router = express.Router();
const { addReview, getReviewsForBook } = require("../controllers/reviewController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, addReview);
router.get("/:bookId", getReviewsForBook);

module.exports = router;

const Review = require("../models/reviewModel");

exports.addReview = async (req, res) => {
  try {
    const { book, rating, comment } = req.body;

    const review = new Review({
      book,
      user: req.user.id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add review", error: err.message });
  }
};

exports.getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate("user", "firstName lastName");
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews", error: err.message });
  }
};

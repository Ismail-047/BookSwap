const express = require("express");
const router = express.Router();
const { addToWishlist, getWishlist } = require("../controllers/wishlistController");
const verifyToken = require("../middleware/verifyToken");

router.post("/add", verifyToken, addToWishlist);
router.get("/", verifyToken, getWishlist);

module.exports = router;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, MessageCircle, Send, X, Loader2 } from "lucide-react";
import useBookStore from "../../zustand/book.store";
import { toast } from "react-hot-toast";

const AddReview = ({
  onCancel
}) => {
  const { id } = useParams();
  const { addReview } = useBookStore();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Book ID is missing. Please try again.");
      return;
    }

    setLoading(true);
    await addReview(id, rating, comment);
    setLoading(false);

    setRating(0);
    setComment("");
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star
            size={28}
            className={`${star <= (hoveredRating || rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 hover:text-yellow-200"
              } transition-colors duration-200`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-3 text-sm font-medium text-gray-600 bg-yellow-50 px-2 py-1 rounded-full">
          {rating} star{rating !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
            <p className="text-sm text-gray-600">Share your thoughts about this book</p>
          </div>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* Rating Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating />
          <p className="text-xs text-gray-500 mt-2">
            Click on the stars to rate this book
          </p>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <label htmlFor="comment" className="block text-sm font-semibold text-gray-900 mb-3">
            Your Review
            <span className="text-gray-500 font-normal text-xs ml-1">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="What did you think about this book? Share your experience with other readers..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 resize-none"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {comment.length}/500
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Help other readers by sharing specific details about what you liked or didn't like
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="flex items-center space-x-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Writing Tips</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Be specific about what you liked or disliked</li>
          <li>• Mention the genre and target audience</li>
          <li>• Avoid major spoilers in your review</li>
        </ul>
      </div>
    </div>
  );
};

export default AddReview;

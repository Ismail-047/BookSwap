import React, { useState } from "react";
import { Star, MessageCircle, Send, X, AlertCircle, Loader2 } from "lucide-react";

const AddReview = ({
  bookId,
  onSuccess,
  onCancel,
  onError
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock authentication - replace with your actual auth store
  const isAuthenticated = true; // Replace with: useAuthStore().isAuthenticated;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to add a review.");
      return;
    }
    if (rating === 0) {
      setError("Please provide a rating.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Replace with actual API call:
      /*
      const response = await axios.post(`/api/v1/books/${bookId}/reviews`, {
        rating,
        comment
      }, {
        withCredentials: true
      });

      if (response.status === 201) {
        setRating(0);
        setComment("");
        if (onSuccess) {
          onSuccess(response.data.data);
        }
      } else {
        setError(response.data.message || "Failed to add review.");
        if (onError) onError(response.data.message || "Failed to add review.");
      }
      */

      // Mock success
      const mockReview = {
        _id: Date.now().toString(),
        rating,
        comment,
        user: {
          firstName: "You",
          lastName: "",
          profilePicture: "/api/placeholder/40/40"
        },
        createdAt: new Date().toISOString()
      };

      setRating(0);
      setComment("");
      if (onSuccess) {
        onSuccess(mockReview);
      }

    } catch (err) {
      console.error("Review submission error:", err);
      const errorMessage = err.response?.data?.error || "Failed to add review.";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = () => {
    return (
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
  };

  return (
    <div className="">
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
        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

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

        {/* Authentication Notice */}
        {!isAuthenticated && (
          <div className="flex items-center justify-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              Please log in to submit a review
            </span>
          </div>
        )}
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
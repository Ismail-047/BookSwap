import React, { useState, useEffect } from "react";
import { Star, User, Calendar, MessageCircle } from "lucide-react";

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await axios.get(`/api/books/${bookId}/reviews`);
        // setReviews(response.data);

        // Mock data for demonstration
        const mockReviews = [
          {
            _id: "1",
            user: {
              firstName: "Sarah",
              lastName: "Johnson",
              profilePicture: "/api/placeholder/40/40"
            },
            rating: 5,
            comment: "Absolutely loved this book! The character development was incredible and I couldn't put it down. Highly recommend to anyone who enjoys fantasy novels.",
            createdAt: "2024-01-15T10:30:00Z"
          },
          {
            _id: "2",
            user: {
              firstName: "Michael",
              lastName: "Chen",
              profilePicture: "/api/placeholder/40/40"
            },
            rating: 4,
            comment: "Great storyline with some unexpected twists. The pacing was good throughout most of the book, though it slowed down a bit in the middle chapters.",
            createdAt: "2024-01-10T14:20:00Z"
          },
          {
            _id: "3",
            user: null,
            rating: 3,
            comment: "Decent read but not quite what I expected. The premise was interesting but the execution could have been better.",
            createdAt: "2024-01-08T09:15:00Z"
          }
        ];
        setReviews(mockReviews);
      } catch (err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
              } transition-colors duration-200`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating}/5
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span>Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Be the first to share your thoughts about this book!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex items-center mb-6">
        <Star className="h-6 w-6 text-yellow-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Reviews ({reviews.length})
        </h2>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={review._id}
            className={`bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${index === 0 ? 'ring-2 ring-blue-100' : ''
              }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  {review.user?.profilePicture ? (
                    <img
                      src={review.user.profilePicture}
                      alt={`${review.user?.firstName} ${review.user?.lastName}`}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {review.user
                      ? `${review.user.firstName} ${review.user.lastName}`
                      : "Anonymous Reader"
                    }
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Badge for first review */}
              {index === 0 && (
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={review.rating} />
            </div>

            {/* Comment */}
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>

            {/* Helpful actions (optional) */}
            <div className="flex items-center justify-end mt-4 space-x-4">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Helpful
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button (if needed) */}
      {reviews.length >= 10 && (
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
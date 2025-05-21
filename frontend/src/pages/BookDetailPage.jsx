import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../zustand/authStore';
import AddReview from '../components/reviews/AddReview';
import ReviewList from '../components/reviews/ReviewList';
import useBookStore from '../zustand/book.store';


const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser, isAuthenticated } = useAuthStore();
  const { allBooks } = useBookStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [book, setBook] = useState(null);

  useEffect(() => {
    if (allBooks?.length && id) {
      const foundBook = allBooks.find(b => b._id === id);
      setBook(foundBook || null);
    }
  }, [id, allBooks]);


  const handleRequestBook = () => {
    if (!isAuthenticated) {
      setError('Please log in to request a book');
      return;
    }

    setShowRequestModal(true);
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      setError('Please log in to add a book to your wishlist');
      return;
    }

    try {
      await addToWishlist(book._id);
      setSuccess('Book added to your wishlist!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book to wishlist');
    }
  };

  const handleSubmitRequest = async () => {
    try {
      setRequestLoading(true);
      await createBookRequest(book._id, requestMessage);
      setSuccess('Book request sent successfully!');
      setShowRequestModal(false);
      setRequestMessage('');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send book request');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleReviewAdded = () => {
    setShowReviewForm(false);
    setSuccess('Review added successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const isOwner = book && currentUser && book.owner === currentUser.id;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition duration-300 ease-in-out">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            Back to Books
          </Link>
        </div>

        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess(null)} />
        )}

        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-200 transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg border border-blue-200 transform transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 shadow-inner border border-blue-100">
                <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  </svg>
                  Book Details
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Genre:</span>
                    <span className="font-medium text-indigo-800 py-1 px-2 bg-blue-100 rounded-md">{book.genre}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Condition:</span>
                    <span className="font-medium text-indigo-800 py-1 px-2 bg-blue-100 rounded-md">{book.condition}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Location:</span>
                    <span className="font-medium text-indigo-800 py-1 px-2 bg-blue-100 rounded-md">{book.location}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Listed:</span>
                    <span className="font-medium text-indigo-800 py-1 px-2 bg-blue-100 rounded-md">{new Date(book.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="p-2">
                <h1 className="text-3xl font-bold text-indigo-900 leading-tight">{book.title}</h1>
                <p className="text-xl text-indigo-600 mt-1">by {book.author}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {book.genre}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {book.condition}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {book.location}
                  </span>
                </div>

                <div className="mt-6 text-gray-700 leading-relaxed">
                  <p className="bg-white p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">{book.description}</p>
                </div>

                <div className="mt-6 flex flex-col space-y-2 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-inner">
                  <p className="text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                    </svg>
                    <span className="font-medium text-indigo-800">Owner:</span>
                    <span className="ml-2">{book.ownerName || 'Unknown'}</span>
                  </p>

                  {book.externalURL && (
                    <p className="text-gray-700 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                      </svg>
                      <span className="font-medium text-indigo-800">External Link:</span>{' '}
                      <a
                        href={book.externalURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-indigo-600 hover:text-indigo-800 underline transition duration-300"
                      >
                        View on external site
                      </a>
                    </p>
                  )}
                </div>

                {!isOwner && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button onClick={handleRequestBook} variant="primary" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      Request Book
                    </button>
                    <button onClick={handleAddToWishlist} variant="outline" className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg shadow-sm transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                )}

                {isOwner && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate(`/books/${book._id}/edit`)}
                      variant="secondary"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                      Edit Book
                    </button>
                    <button
                      variant="danger"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete Book
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white shadow-xl rounded-xl p-6 border border-indigo-200 transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b border-indigo-100 pb-4">
            <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
              Reviews
            </h2>
            {isAuthenticated && !isOwner && (
              <button
                onClick={() => setShowReviewForm(true)}
                variant="primary"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-inner">
              <h3 className="text-lg font-medium text-indigo-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                </svg>
                Share Your Thoughts
              </h3>
              <AddReview bookId={book._id} onSuccess={handleReviewAdded} onCancel={() => setShowReviewForm(false)} />
            </div>
          )}

          <ReviewList bookId={book._id} />
        </div>

        {/* Book Request Modal */}

        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-indigo-700 font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path>
              </svg>
              You are requesting:
            </p>
            <p className="text-lg font-bold text-indigo-900 mt-2">"{book?.title}"</p>
            <p className="text-indigo-700">by {book?.author}</p>
          </div>

          <div>
            <label htmlFor="requestMessage" className="block text-sm font-medium text-indigo-700 mb-2">
              Message to the book owner (optional)
            </label>
            <textarea
              id="requestMessage"
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Why are you interested in this book? When and how would you like to meet for the exchange?"
              className="block w-full border border-blue-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] text-gray-700"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              variant="outline"
              onClick={() => setShowRequestModal(false)}
              className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              variant="primary"
              onClick={handleSubmitRequest}
              loading={requestLoading}
              disabled={requestLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
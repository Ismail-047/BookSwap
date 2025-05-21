import React, { useState } from "react";
import SearchBooks from "../components/SearchBooks";
import useBookStore from "../zustand/book.store";
import BookCardsLoader from "../components/BookCardsLoader";
import BookCard from "../components/BookCard";

const ViewBooksPage = () => {

  const { isGettingAllBooks, allBooks, searchResults } = useBookStore();

  const [selectedBook, setSelectedBook] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");


  if (isGettingAllBooks) return <BookCardsLoader />

  return (
    <div className="p-6 rounded-lg shadow-sm">

      <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b border-indigo-200 pb-3">
        Available Books
      </h2>

      <SearchBooks />

      {allBooks.length === 0 ? (
        <div className="text-center py-10 bg-white bg-opacity-50 rounded-lg shadow-sm">
          <p className="text-indigo-600">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around gap-6 mt-6">
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))
          ) : (
            allBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))
          )}
        </div>
      )}

      {/* Book Request Modal as Popup */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowRequestModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
                <div className="flex justify-between items-center border-b border-indigo-100 pb-3 mb-4">
                  <h3 className="text-lg font-semibold text-indigo-700" id="modal-title">
                    Request Book
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-indigo-600 focus:outline-none"
                    onClick={() => setShowRequestModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedBook && (
                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/3">
                      <img
                        src={selectedBook.image || "/api/placeholder/300/400"}
                        alt={selectedBook.title}
                        className="w-full h-auto object-cover rounded shadow-md"
                      />
                    </div>
                    <div className="w-2/3">
                      <h3 className="text-lg font-semibold text-indigo-800">{selectedBook.title}</h3>
                      <p className="text-sm text-gray-600">by {selectedBook.author}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {selectedBook.genre}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {selectedBook.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="requestMessage" className="block text-sm font-medium text-indigo-700 mb-1">
                    Message to the book owner (optional)
                  </label>
                  <textarea
                    id="requestMessage"
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder="Why are you interested in this book? When and how would you like to meet for the exchange?"
                    className="w-full px-3 py-2 border border-indigo-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-indigo-100">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                    onClick={() => setShowRequestModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${requestLoading ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    onClick={handleSubmitRequest}
                    disabled={requestLoading}
                  >
                    {requestLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Send Request"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooksPage;
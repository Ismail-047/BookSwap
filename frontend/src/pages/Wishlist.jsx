import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../zustand/userStore";
import { HeartOff, HeartMinus } from "lucide-react";
import useBookStore from "../zustand/book.store";
import BookCard from "../components/BookCard";

const Wishlist = () => {

  const { userWishlist, emptyWishList, removeBookFromWishlist } = useUserStore();
  const { allBooks } = useBookStore();

  const [booksInWishlist, setBooksInWishlist] = useState([]);

  useEffect(() => {
    if (userWishlist && allBooks) {
      const filtered = allBooks.filter(book => userWishlist.includes(book._id));
      setBooksInWishlist(filtered);
    }
  }, [userWishlist, allBooks]);

  if (!userWishlist || userWishlist?.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-blue-100 shadow-sm">
        <div className="bg-blue-100 p-6 rounded-full mb-6">
          <HeartOff size={48} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-700 mb-6 text-center max-w-md">
          Add books to your wishlist to keep track of titles you"d like to read in the future.
        </p>
        <Link
          to="/books"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-blue-200 pb-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">My Wishlist</h1>
              <p className="text-gray-700 mt-2">
                Books you"ve added to your wishlist will appear here. When a book becomes available,
                you"ll receive a notification.
              </p>
            </div>
            <button onClick={() => emptyWishList()} className="bg-blue-100 p-3 rounded-full">
              <HeartOff size={32} className="text-indigo-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-around gap-6 mt-6">
          {booksInWishlist.map((book) => (
            <div
              key={book?._id}
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
                <button onClick={() => removeBookFromWishlist(book?._id)} className="absolute -top-3 -right-3 z-50 bg-red-300 p-3 rounded-full">
                  <HeartMinus size={35} className="text-red-700" />
                </button>
                <BookCard
                  book={book}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
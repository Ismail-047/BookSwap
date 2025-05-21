import React from 'react';
import { Bookmark, Edit2, Trash2, Heart, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/userStore';
import useBookStore from '../zustand/book.store';
const BookCard = ({ book, showOwnerControls = false, onEdit, onDelete }) => {

  const { setBookToRequest } = useBookStore();
  const { addBookToWishlist } = useUserStore();

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100 flex flex-col h-full w-64 md:w-72 lg:w-96">
      <div className="relative group">
        <img
          src={book?.image}
          alt={book?.title}
          className="h-64 w-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 shadow-sm">
            {book?.condition}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{book?.title}</h3>
        </div>

        <p className="text-sm text-gray-600 italic mb-2">by {book?.author}</p>

        <div className="flex items-center justify-between mt-1 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {book?.genre}
          </span>
          <span className="text-sm font-medium text-indigo-600 flex items-center">
            <Star size={14} className="mr-1 fill-current" />
            {book?.location}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link to={`/books/${book?._id}`}
            className="mb-4 flex items-center justify-center w-full text-indigo-600 hover:text-indigo-800 font-medium text-sm py-2 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
          >
            <BookOpen size={16} className="mr-2" />
            View Details
          </Link>

          {!showOwnerControls && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBookToRequest(book)}
                className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                <Bookmark size={16} className="mr-2" />
                Request
              </button>
              <button
                onClick={() => addBookToWishlist(book?._id)}
                className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-blue-50 text-indigo-700 hover:bg-blue-100 transition-colors duration-200 text-sm font-medium border border-indigo-100"
              >
                <Heart size={16} className="mr-2" />
                Wishlist
              </button>
            </div>
          )}

          {showOwnerControls && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onEdit && onEdit(book?._id)}
                className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-blue-50 text-indigo-700 hover:bg-blue-100 transition-colors duration-200 text-sm font-medium border border-indigo-100"
              >
                <Edit2 size={16} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(book?._id)}
                className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 text-sm font-medium border border-red-100"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
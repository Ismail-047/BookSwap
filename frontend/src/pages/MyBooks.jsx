import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useComponentStore from "../zustand/componentStore";
import useBookStore from "../zustand/book.store";
import { PlusCircle, BookOpen } from "lucide-react";
import BookCard from "../components/BookCard";

const MyBooks = () => {

  const navigateTo = useNavigate();
  const { confirmDeletion } = useComponentStore();
  const { loggedInUserBooks, isGettingAllBooks, deleteBookById } = useBookStore();

  const handleDeleteBook = (bookId) => {
    deleteBookById(bookId);
  };

  const handleConfirmDeletion = async (bookId) => {
    confirmDeletion("Are you sure you want to delete this book?", () => handleDeleteBook(bookId));
  };

  const handleEditBook = (bookId) => {
    navigateTo(`/edit-book/${bookId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-blue-200 pb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold text-indigo-800">My Books</h1>
        </div>
        <Link
          to="/add-new-book"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 shadow-md"
        >
          <PlusCircle size={20} />
          <span>Add New Book</span>
        </Link>
      </div>

      {isGettingAllBooks ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
        </div>
      ) : loggedInUserBooks?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-blue-100">
          <BookOpen className="mx-auto text-blue-300 mb-4" size={48} />
          <p className="text-gray-600 mb-6 text-lg">You haven"t added any books yet.</p>
          <Link
            to="/add-new-book"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded transition-colors duration-200 shadow-md inline-flex items-center gap-2"
          >
            <PlusCircle size={20} />
            <span>Add Your First Book</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around gap-6 mt-6">
          {loggedInUserBooks.map((book) => (
            <div key={book._id} className="transform hover:-translate-y-1 transition-transform duration-200">
              <BookCard
                book={book}
                showOwnerControls={true}
                onEdit={() => handleEditBook(book?._id)}
                onDelete={() => handleConfirmDeletion(book?._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
import React from "react";
import useBookStore from "../zustand/book.store";
import { Link } from "react-router-dom";
import { Book, Heart, Inbox, Plus } from "lucide-react";
import BookCardsLoader from "../components/BookCardsLoader";
import BookCard from "../components/BookCard";
import Intro from "../components/Intro";

const Explore = () => {
    const { isGettingAllBooks, allBooks } = useBookStore();


    if (isGettingAllBooks) return <BookCardsLoader />

    return (
        <>
            <Intro
                heading="Welcome to BookSwap"
                description="Discover, share, and swap books with our community."
            />
            <div className="animate-themeAnimationLg p-6 max-w-7xl mx-auto animate-fadeIn">

                {/* Featured Books Section */}
                <div className="mb-8">

                    <div className="rounded-lg ">

                        <h2 className="text-2xl font-black text-indigo-700 text-center">
                            FEATURED BOOKS
                        </h2>
                        <p className="text-center font-medium text-gray-600">
                            Most popular and trending books in the community.
                        </p>

                        <div className="h-[1px] w-full bg-gray-300 mt-4" />
                    </div>

                    {allBooks.length === 0 ? (
                        <div className="text-center py-10 bg-white bg-opacity-50 rounded-lg shadow-sm">
                            <p className="text-indigo-600">No books found.</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-around gap-6 mt-6">
                            {allBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links Section */}
                <div className="bg-blue-50 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">Quick Links</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link to="/my-books" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                            <Book className="h-6 w-6 text-indigo-600 mr-2" />
                            <span>My Books</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                            <Heart className="h-6 w-6 text-indigo-600 mr-2" />
                            <span>Wishlist</span>
                        </Link>
                        <Link to="/my-requests" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                            <Inbox className="h-6 w-6 text-indigo-600 mr-2" />
                            <span>Requests</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Explore; 
import React from "react";
import useBookStore from "../zustand/book.store";
import { Link } from "react-router-dom";
import { Book, Heart, Inbox, Plus } from "lucide-react";
import BookCardsLoader from "../components/BookCardsLoader";
import BookCard from "../components/BookCard";
import Intro from "../components/Intro";
import QuickActions from "../components/QuickActions";

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
                <QuickActions />
            </div>
        </>
    );
};

export default Explore; 
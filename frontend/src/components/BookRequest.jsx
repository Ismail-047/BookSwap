import React, { useState } from "react";
import { MessageCircle, Send, BookOpen, User } from "lucide-react";
import useBookStore from "../zustand/book.store";

const BookRequest = () => {
    const [message, setMessage] = useState("");

    const { bookToRequest, setBookToRequest } = useBookStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
    };

    return (
        <>
            <div onClick={() => setBookToRequest(null)}
                className="fixed top-0 left-0 w-full flex justify-center items-center z-40 bg-black/70 p-6 min-h-screen" />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl z-50 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <header className="bg-indigo-600 text-white p-4">
                    <h1 className="text-xl font-bold flex items-center">
                        <BookOpen className="mr-2" />
                        Request Book
                    </h1>
                </header>

                <div className="p-6">
                    <div className="flex mb-6">
                        <div className="w-24 h-36 bg-blue-100 rounded overflow-hidden flex-shrink-0">
                            <img src={bookToRequest.coverImage} alt={bookToRequest.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-indigo-900">{bookToRequest.title}</h2>
                            <p className="text-gray-600">{bookToRequest.author}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                                <User size={16} className="mr-1" />
                                <span>Owned by {bookToRequest.owner.name}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-indigo-900 mb-1">
                                Message to owner
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Let the owner know why you' d like to borrow this book..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <MessageCircle className="absolute right-3 bottom-3 text-blue-400" size={18} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Be specific about how long you"d like to borrow the book and how you"ll return it.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                disabled={!message.trim()}
                            >
                                <Send size={16} className="mr-2" /> Submit Request
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>

    );
};

export default BookRequest;
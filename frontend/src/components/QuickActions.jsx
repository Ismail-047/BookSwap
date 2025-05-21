import React from "react";
import { Link } from "react-router-dom";
import { Heart, PlusCircle, Search } from "lucide-react";

function QuickActions() {
    return (
        < div className="bg-gradient-to-r from-sky-100 to-indigo-100 p-6 rounded-lg shadow-md mb-8">

            <h3 className="text-lg font-medium text-indigo-800 mb-4">
                Quick Actions
            </h3>

            <div className="flex flex-wrap gap-4">

                <Link to="/add-new-book"
                    className="px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add New Book
                </Link>

                <Link to="/books"
                    className="px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 bg-sky-100 text-indigo-700 hover:bg-sky-200"
                >
                    <Search className="h-4 w-4" />
                    Browse Books
                </Link>

                <Link to="/wishlist"
                    className="px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                    <Heart className="h-4 w-4" />
                    View Wishlist
                </Link>

            </div>

        </div>
    )
}

export default QuickActions
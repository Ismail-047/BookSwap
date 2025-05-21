// REACT
import React from "react"
// ICONS
import { Search, Book, MessageCircle, Heart, Repeat, Star } from "lucide-react";

function Features() {
    const features = [
        {
            icon: <Book className="w-6 h-6 text-indigo-500" />,
            title: "List Your Books",
            description: "Share books you've finished reading with others who'll appreciate them."
        },
        {
            icon: <Search className="w-6 h-6 text-indigo-500" />,
            title: "Find Books You Want",
            description: "Search for specific titles, authors, or browse by genre and location."
        },
        {
            icon: <Repeat className="w-6 h-6 text-indigo-500" />,
            title: "Simple Exchange Process",
            description: "Request books, arrange exchanges, and build your personal library."
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
            title: "Connect with Readers",
            description: "Message other users and discuss your favorite books."
        },
        {
            icon: <Heart className="w-6 h-6 text-indigo-500" />,
            title: "Create Wishlists",
            description: "Add books you're looking for and get notified when they become available."
        },
        {
            icon: <Star className="w-6 h-6 text-indigo-500" />,
            title: "Reviews & Ratings",
            description: "Build trust within the community through feedback after exchanges."
        },
    ];
    return (
        <section id="features" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                        Everything You Need to Exchange Books
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Our platform makes it easy to find, exchange, and discuss books with fellow readers.
                    </p>
                    <div className="h-1 w-24 bg-indigo-400 mx-auto mt-4 rounded"></div>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-indigo-600"
                        >
                            <div className="inline-flex items-center justify-center h-14 w-14 rounded-lg bg-blue-100 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                            <p className="mt-3 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Features
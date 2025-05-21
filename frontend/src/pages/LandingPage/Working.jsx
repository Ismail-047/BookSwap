import React from 'react'
import { Book, User, Repeat, ArrowRight } from 'lucide-react';

function Working() {
    return (
        <section id="how-it-works" className="py-16 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-64 bg-blue-50 rounded-bl-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-indigo-50 rounded-tr-full opacity-70"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                        How BookSwap Works
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Join our community in three simple steps
                    </p>
                    <div className="h-1 w-24 bg-indigo-400 mx-auto mt-4 rounded"></div>
                </div>

                <div className="mt-16 grid gap-10 md:grid-cols-3 relative">
                    {/* Step 1 */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
                        <div className="absolute -top-5 -right-5 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                        <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <User className="h-10 w-10 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Create an Account</h3>
                        <p className="text-gray-600">Sign up for free and set up your profile with your reading preferences.</p>
                        <div className="absolute bottom-4 -right-4 hidden md:block">
                            <ArrowRight className="h-8 w-8 text-indigo-300" />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
                        <div className="absolute -top-5 -right-5 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
                        <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <Book className="h-10 w-10 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">List or Search Books</h3>
                        <p className="text-gray-600">Add books you want to exchange or browse listings from other users.</p>
                        <div className="absolute bottom-4 -right-4 hidden md:block">
                            <ArrowRight className="h-8 w-8 text-indigo-300" />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
                        <div className="absolute -top-5 -right-5 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
                        <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <Repeat className="h-10 w-10 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Make the Exchange</h3>
                        <p className="text-gray-600">Connect with other readers, arrange the exchange, and enjoy your new book!</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300 font-medium">
                        Start Exchanging Books
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Working
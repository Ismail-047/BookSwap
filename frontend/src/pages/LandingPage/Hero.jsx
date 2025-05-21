import React from 'react'
import { Book, ChevronRight, BookOpen, RefreshCw } from 'lucide-react';
import useAuthStore from '../../zustand/authStore';
import { Link } from 'react-router-dom';

function Hero() {

    const { isAuthenticated } = useAuthStore();

    return (
        <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">

            <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center transition-opacity duration-1000`}>

                <div className="md:pr-8 animate-themeAnimationLg">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                        Share Books, <br />
                        <span className="text-indigo-600">Connect Communities</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Exchange books you've read for ones you haven't. Join our sustainable reading community today.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to={isAuthenticated ? "/" : "/login"} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center">
                            Get Started <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/about-us" className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium text-lg transition duration-300 flex items-center justify-center">
                            Learn More
                        </Link>
                    </div>
                </div>

                <div className="relative md:block animate-themeAnimationLg">

                    <div className="absolute -top-16 -left-4 w-64 h-64 bg-blue-400 rounded-full opacity-20 animate-pulse" />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-300" />

                    <div className="relative bg-white rounded-xl shadow-2xl p-6 backdrop-blur-lg bg-opacity-60">
                        <div className="flex justify-between mb-6">
                            <div className="flex items-center">
                                <div className="bg-indigo-600 p-3 rounded-full">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="ml-3 font-semibold text-gray-800">BookSwap</span>
                            </div>
                            <div className="text-indigo-600 flex items-center">
                                <RefreshCw className="w-5 h-5 mr-2" />
                                <span className="font-medium">120+ Exchanges</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                                <div className="h-12 w-8 bg-indigo-600 rounded mr-4 flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-gray-800">The Great Gatsby</h3>
                                    <p className="text-sm text-gray-600">Available for exchange</p>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                                <div className="h-12 w-8 bg-blue-400 rounded mr-4 flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Becoming</h3>
                                    <p className="text-sm text-gray-600">Recently added</p>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                                <div className="h-12 w-8 bg-indigo-400 rounded mr-4 flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Educated</h3>
                                    <p className="text-sm text-gray-600">3 people interested</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg flex items-center transition duration-300">
                                <Book className="w-4 h-4 mr-2" />
                                Browse Library
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Hero
import React from "react";
import { Loader, BookOpen } from "lucide-react";

export default function MainLoadingPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="flex flex-col items-center px-4">

                <div className="relative">
                    <BookOpen size={64} className="text-indigo-600" />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="animate-ping w-16 h-16 rounded-full bg-indigo-600 opacity-20"></div>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-black mt-2  text-indigo-600">BOOK SWAP</h1>

                <p className="text-blue-800 text-center mb-5">
                    Connecting book lovers around the world
                </p>

                <Loader size={35} className="animate-spin text-indigo-600" />

            </div>

        </div>
    );
}
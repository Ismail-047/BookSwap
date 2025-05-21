// REACT
import React from "react"
import { Link } from "react-router-dom";
// ICONS
import { BookOpen, RefreshCw, Map, Users } from "lucide-react";

function OurStats() {
    const stats = [
        {
            value: "10K+",
            label: "Active Users",
            icon: <Users className="h-6 w-6 text-indigo-600" />
        },
        {
            value: "50K+",
            label: "Books Listed",
            icon: <BookOpen className="h-6 w-6 text-indigo-600" />
        },
        {
            value: "25K+",
            label: "Successful Exchanges",
            icon: <RefreshCw className="h-6 w-6 text-indigo-600" />
        },
        {
            value: "100+",
            label: "Cities Covered",
            icon: <Map className="h-6 w-6 text-indigo-600" />
        }
    ];

    return (
        <section className="py-16 bg-white relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-100 via-indigo-300 to-blue-100" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 text-center relative group"
                        >
                            <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 transition-transform duration-300 group-hover:scale-100 -z-10"></div>
                            <div className="inline-flex items-center justify-center mb-4">
                                {stat.icon}
                            </div>
                            <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.value}</p>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                            <div className="h-1 w-12 bg-blue-200 mx-auto mt-4 rounded transition-all duration-300 group-hover:w-20 group-hover:bg-indigo-300"></div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="max-w-4xl mx-auto mt-12 px-4">

                <div className="p-8 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-2xl font-bold">
                            Ready to join our community?
                        </h3>
                        <p className="mt-2 font-medium text-white">
                            Start exchanging books with readers in your area today.
                        </p>
                    </div>
                    <Link to="/signup"
                        className="px-6 py-3 bg-white text-indigo-600 hover:bg-blue-50 rounded font-medium shadow-lg hover:shadow-xl transition duration-300">
                        Sign Up Now
                    </Link>
                </div>

            </div>

        </section>
    )
}

export default OurStats
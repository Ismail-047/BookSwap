import React from 'react'

function Intro({
    heading,
    description
}) {
    return (
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 p-10 py-14 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute transform rotate-45 -translate-y-1/2 -translate-x-1/4 bg-white w-96 h-96 rounded-full" />
                <div className="absolute transform rotate-45 translate-y-1/2 translate-x-3/4 bg-white w-64 h-64 rounded-full" />
            </div>

            <div className="relative z-10">
                <h2 className="text-3xl font-black text-white">
                    {heading?.toUpperCase()}
                </h2>
                <p className="text-white mt-2">
                    {description}
                </p>
            </div>

        </div>
    )
}

export default Intro
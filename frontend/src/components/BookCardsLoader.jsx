import React from "react"

function BookCardsLoader() {
    return (
        <div className="flex flex-wrap px-5 py-14 justify-around">
            <div className="animate-shimmer loading min-w-80 min-h-96 w-[30vw] h-[80vh] mb-10 rounded" />
            <div className="animate-shimmer loading min-w-80 min-h-96 w-[30vw] h-[80vh] mb-10 rounded" />
            <div className="animate-shimmer loading min-w-80 min-h-96 w-[30vw] h-[80vh] mb-10 rounded" />
            <div className="animate-shimmer loading min-w-80 min-h-96 w-[30vw] h-[80vh] mb-10 rounded" />
            <div className="animate-shimmer loading min-w-80 min-h-96 w-[30vw] h-[80vh] mb-10 rounded" />
        </div>

    )
}
export default BookCardsLoader;
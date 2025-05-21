import React from "react";

const RequestCard = ({
    request,
    onUpdateStatus,
    isOwnerView
}) => {

    const { status, bookTitle, requestDate, userName } = request;

    const getStatusBadge = () => {
        switch (status) {
            case "pending":
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                        Pending
                    </span>
                );
            case "accepted":
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        Accepted
                    </span>
                );
            case "rejected":
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 hover:shadow-lg transition-shadow duration-300 transform hover:scale-102">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-indigo-900">{bookTitle}</h3>
                        <p className="text-sm text-indigo-600 font-medium">
                            {isOwnerView ? `From: ${userName}` : `To: ${userName}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(requestDate).toLocaleDateString()}</p>
                    </div>
                    <div>{getStatusBadge()}</div>
                </div>

                {isOwnerView && status === "pending" && (
                    <div className="flex space-x-2 mt-5">
                        <button
                            onClick={() => onUpdateStatus(request._id, "accepted")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm flex-1">
                            Accept
                        </button>
                        <button
                            onClick={() => onUpdateStatus(request._id, "rejected")}
                            className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1">
                            Decline
                        </button>
                    </div>
                )}

                {!isOwnerView && status === "pending" && (
                    <button
                        onClick={() => onUpdateStatus(request._id, "cancelled")}
                        className="mt-5 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                        Cancel Request
                    </button>
                )}
            </div>
        </div>
    );
};

export default RequestCard;
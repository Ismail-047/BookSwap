import React from "react";
import { Book, User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import useBookStore from "../zustand/book.store";

const RequestCard = ({
    request,
    isOwnerView
}) => {

    const { cancelBookRequest, updateBookRequestStatus } = useBookStore();

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "accepted":
                return <CheckCircle className="w-4 h-4" />;
            case "rejected":
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "approved":
                return "bg-green-50 text-green-700 border-green-200";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="p-6">
                <div className="flex gap-4">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                            {request.book.image ? (
                                <img
                                    src={request.book.image}
                                    alt={request.book.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Book className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>

                    {/* Request Details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                    {request.book.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">by {request.book.author}</p>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <User className="w-4 h-4" />
                                    <span>
                                        {isOwnerView ? `From ${request.requester.firstName} ${request.requester.lastName}` : `To ${request.owner.firstName} ${request.owner.lastName}`}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(request.createdAt)}</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusStyle(request.status)}`}>
                                {getStatusIcon(request.status)}
                                <span className="capitalize">{request.status}</span>
                            </div>
                        </div>

                        {/* Message */}
                        {request.message && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {isOwnerView && request.status === "pending" && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateBookRequestStatus(request._id, "approved")}
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    Accept Request
                                </button>
                                <button
                                    onClick={() => updateBookRequestStatus(request._id, "rejected")}
                                    className="flex-1 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-medium py-2 px-4 rounded-lg transition-all duration-200"
                                >
                                    Decline
                                </button>
                            </div>
                        )}

                        {!isOwnerView && request.status === "pending" && (
                            <button
                                onClick={() => cancelBookRequest(request._id)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200"
                            >
                                Cancel Request
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;

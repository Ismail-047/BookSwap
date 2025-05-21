import React, { useState, useEffect } from "react";
import useAuthStore from "../zustand/authStore";
import RequestCard from "../components/RequestCard";
import { ThemeButton } from "../components/Buttons";

const MyRequests = () => {

  const { authUser } = useAuthStore();
  const [filter, setFilter] = useState("all");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (authUser) {
      const combinedRequests = authUser.receivedRequests
        .map(req => ({ ...req, isIncoming: true }))
        .concat(authUser.sentRequests.map(req => ({ ...req, isIncoming: false })));
      setRequests(combinedRequests);
    }
  }, [authUser]);

  const handleUpdateStatus = (requestId, newStatus) => {
    setRequests(prev =>
      prev.map(req => req._id === requestId ? { ...req, status: newStatus } : req)
    );
  };

  const filteredRequests = () => {
    if (filter === "all") return requests;
    if (filter === "incoming") return requests.filter(req => req.isIncoming);
    if (filter === "outgoing") return requests.filter(req => !req.isIncoming);
    return [];
  };

  const requestCounts = {
    all: requests.length,
    incoming: requests.filter(req => req.isIncoming).length,
    outgoing: requests.filter(req => !req.isIncoming).length,
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">My Requests</h1>
          <ThemeButton btnLabel="NEW REQUEST" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-2xl font-bold text-indigo-700">Book Requests</h2>
          </div>

          <div className="mb-8">
            <div className="flex gap-3 p-2 rounded-lg">
              {["all", "incoming", "outgoing"].map(type => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded flex items-center transition-all duration-200 flex-1 justify-center ${filter === type
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-100"
                    }`}
                  onClick={() => setFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <span className={`ml-2 ${filter === type ? "bg-white bg-opacity-20" : "bg-indigo-100"} rounded-full px-2 py-0.5 text-xs`}>
                    {requestCounts[type]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {filteredRequests().length === 0 ? (
            <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-indigo-800 font-medium text-lg">No requests found</p>
              <p className="text-indigo-600 mt-2">Try changing your filter or create a new request</p>
              <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Request
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRequests().map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onUpdateStatus={handleUpdateStatus}
                  isOwnerView={request.isIncoming}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;

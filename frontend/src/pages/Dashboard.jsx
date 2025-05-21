import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import useBookStore from "../zustand/book.store";
import { Bell, Book, BookOpen, PlusCircle, Search, Heart } from "lucide-react";
import Intro from "../components/Intro";
import QuickActions from "../components/QuickActions";

const Dashboard = () => {

  const { allBooks } = useBookStore();
  const { authUser } = useAuthStore();


  const requests = [
    {
      _id: "1",
      isIncoming: true,
      requester: { firstName: "Sarah", lastName: "Johnson" },
      book: { title: "The Midnight Library" },
      createdAt: "2025-05-15T12:00:00Z",
      status: "pending"
    },
    {
      _id: "2",
      isIncoming: false,
      book: { title: "Project Hail Mary" },
      createdAt: "2025-05-10T14:30:00Z",
      status: "approved"
    },
    {
      _id: "3",
      isIncoming: true,
      requester: { firstName: "Michael", lastName: "Chen" },
      book: { title: "Klara and the Sun" },
      createdAt: "2025-05-05T09:15:00Z",
      status: "rejected"
    }
  ];
  const CustomLink = ({ to, children, className }) => (
    <button
      onClick={() => { }}
      className={className}
    >
      {children}
    </button>
  );

  return (
    <>
      <Intro
        heading="Dashboard"
        description={`Welcome back, ${authUser?.firstName || "Book Lover"}! Manage your book collection, exchanges, and requests all from one place.`}
      />

      <div className="min-h-screen p-6">

        <div className="max-w-6xl mx-auto animate-themeAnimationLg">

          <div className="flex w-full gap-4 justify-between mt-5 mb-10">

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group w-full">
              <div className="border-t-4 border-sky-400"></div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-sky-100 p-3 rounded-full shadow-sm group-hover:bg-sky-200 transition-colors duration-300">
                    <Book className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-800">My Books</h3>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div>
                    <span className="text-4xl font-bold text-indigo-600">{allBooks.length}</span>
                    <span className="text-gray-500 ml-2 text-sm">total</span>
                  </div>
                  <CustomLink
                    to="/my-books"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-full border border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </CustomLink>
                </div>
              </div>
            </div>

            {/* Incoming Requests Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group w-full">
              <div className="border-t-4 border-sky-400"></div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-sky-100 p-3 rounded-full shadow-sm group-hover:bg-sky-200 transition-colors duration-300">
                    <Bell className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-800">Incoming Requests</h3>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div>
                    <span className="text-4xl font-bold text-indigo-600">{authUser?.receivedRequests?.length || 0}</span>
                    <span className="text-gray-500 ml-2 text-sm">pending</span>
                  </div>
                  <CustomLink
                    to="/my-requests?filter=incoming"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-full border border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </CustomLink>
                </div>
              </div>
            </div>

            {/* Outgoing Requests Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group w-full">
              <div className="border-t-4 border-sky-400"></div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-sky-100 p-3 rounded-full shadow-sm group-hover:bg-sky-200 transition-colors duration-300">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-800">Outgoing Requests</h3>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div>
                    <span className="text-4xl font-bold text-indigo-600">{authUser?.sentRequests?.length || 0}</span>
                    <span className="text-gray-500 ml-2 text-sm">active</span>
                  </div>
                  <CustomLink
                    to="/my-requests?filter=outgoing"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-full border border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </CustomLink>
                </div>
              </div>
            </div>

          </div>


          <QuickActions />

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-indigo-800 flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Recent Activity
              </h3>
              <Link to="/notifications" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                View All Notifications
              </Link>
            </div>

            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request._id} className="border-b border-sky-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-indigo-900 font-medium">
                          {request.isIncoming
                            ? `${request.requester?.firstName} ${request.requester?.lastName} requested "${request.book?.title}"`
                            : `You requested "${request.book?.title}"`}
                        </p>
                        <p className="text-sm text-indigo-400 mt-1">
                          {new Date(request.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-indigo-600">No recent activity.</p>
            )}
          </div>

        </div>

      </div>
    </>
  );
}
export default Dashboard;
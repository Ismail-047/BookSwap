import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import useBookStore from "../zustand/book.store";
import { Bell, Book, BookOpen, PlusCircle, Search, Heart } from "lucide-react";

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

  const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2";

    const variantStyles = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700",
      secondary: "bg-sky-100 text-indigo-700 hover:bg-sky-200",
      outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
    };

    return (
      <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-8">Dashboard</h1>

        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-indigo-600">
          <h2 className="text-xl font-semibold mb-2 text-indigo-800">
            Welcome back, {authUser?.firstName || "Book Lover"}!
          </h2>
          <p className="text-gray-600">
            Manage your book collection, exchanges, and requests all from one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 border-t-4 border-sky-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-sky-100 p-3 rounded-full">
                <Book className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-indigo-800">My Books</h3>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold text-indigo-600">{allBooks.length}</span>
              <Link to="/my-books" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View All
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 border-t-4 border-sky-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-sky-100 p-3 rounded-full">
                <Bell className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-indigo-800">Incoming Requests</h3>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold text-indigo-600">{authUser?.receivedRequests?.length || 0}</span>
              <Link to="/my-requests?filter=incoming" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View All
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 border-t-4 border-sky-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-sky-100 p-3 rounded-full">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-indigo-800">Outgoing Requests</h3>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold text-indigo-600">
                {authUser?.sentRequests?.length || 0}
              </span>
              <Link to="/my-requests?filter=outgoing" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-sky-100 to-indigo-100 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-medium text-indigo-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/add-new-book">
              <Button variant="primary">
                <PlusCircle className="h-4 w-4" />
                Add New Book
              </Button>
            </Link>
            <Link to="/books">
              <Button variant="secondary">
                <Search className="h-4 w-4" />
                Browse Books
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="outline">
                <Heart className="h-4 w-4" />
                View Wishlist
              </Button>
            </Link>
          </div>
        </div>

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
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
export default Dashboard;
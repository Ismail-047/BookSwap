import { useState, useEffect } from "react";
import { Bell, CircleCheck, Clock, User } from "lucide-react";
import Intro from "../components/Intro";
import axiosInstance from "../lib/axios";


const NoNotifications = ({
  filter
}) => {
  return (
    <div className="p-16 flex flex-col items-center justify-center text-gray-500">
      <Bell className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium">No notifications found</p>
      <p className="mt-1">
        {filter === "all"
          ? "You don't have any notifications yet."
          : filter === "unread"
            ? "You've read all your notifications."
            : "You don't have any read notifications."}
      </p>
    </div>
  );
};
// Function to format the timestamp
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};

export default function NotificationPage() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axiosInstance.get("/api/v1/user/get-all-notifications");
      setNotifications(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    }
    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification._id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  // Filter notifications based on current filter state
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  // Count unread notifications
  // const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <>
      <Intro
        heading="Your Notifications"
        description="Stay updated with your book exchange activities. Click on unread notifications to mark them as read."
      />

      <div className="bg-gray-50 max-w-4xl mx-auto my-6">

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 animate-themeAnimationLg">
          {/* Filter tabs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 py-4 text-sm font-medium ${filter === "all"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-500"
                  }`}
              >
                All Notifications
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`flex-1 py-4 text-sm font-medium ${filter === "unread"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-500"
                  }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`flex-1 py-4 text-sm font-medium ${filter === "read"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-500"
                  }`}
              >
                Read
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={markAllAsRead}
              className="flex items-center shadow-lg gap-2 bg-indigo-600 hover:bg-indigo-800 text-white text-sm py-3 px-6 rounded transition duration-300 my-5 mr-1 font-bold"
            >
              Mark all as read
              <CircleCheck className="h-5 w-5" />
            </button>
          </div>

          {/* Notifications list */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-500">Loading notifications...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <NoNotifications filter={filter} />
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`relative p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? "bg-blue-50" : ""
                      }`}
                  >
                    <div className="flex">
                      {/* Avatar */}
                      <div className="flex-shrink-0 mr-4">
                        <div className="relative">
                          <img
                            src={notification.from.avatar}
                            alt={notification.from.name}
                            className="h-10 w-10 rounded-full bg-gray-200"
                          />
                          {!notification.isRead && (
                            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-white"></span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.from.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatTimeAgo(notification.createdAt)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="ml-4 flex-shrink-0">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
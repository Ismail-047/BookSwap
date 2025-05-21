import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BellOff } from "lucide-react";
import { useNotificationStore } from "../zustand/notificationStore";

function Notifications() {

    const navigateTo = useNavigate();
    const { unreadNotifications, } = useNotificationStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const getUnreadNotificationsCount = () => {
        return unreadNotifications?.length;
    }

    const handleSeeAllNotifications = () => {
        setShowNotifications(false);
        navigateTo("/notifications");
    }

    return (
        <div className="ml-3 relative">

            {/* NOTIFICATIONS BUTTON */}
            <button type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-full p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">

                <Bell className="h-6 w-6" />

                {getUnreadNotificationsCount() > 0 && (
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
                )}
            </button>

            {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden animate-themeAnimation">

                    <div className="w-full max-w-md">

                        {/* Alert Notification Banner */}
                        <div className="bg-indigo-600 text-white rounded-t-md shadow-lg overflow-hidden">

                            <div className="flex items-center px-4 py-3">
                                {/* Icon with badge */}
                                <div className="relative mr-4">
                                    <Bell size={24} className="text-white" />
                                    <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {getUnreadNotificationsCount()}
                                    </span>
                                </div>

                                {/* Notification text */}
                                <div className="flex-1">
                                    <p className="font-medium">unread notifications</p>
                                </div>

                                {/* Action button */}
                                <button onClick={handleSeeAllNotifications} className="ml-4 px-4 py-1.5 bg-blue-400 hover:bg-blue-500 rounded text-sm font-medium">
                                    See all
                                </button>
                            </div>

                        </div>

                        {unreadNotifications.length > 0 ? (
                            <div className="max-h-80 overflow-y-auto">
                                {unreadNotifications.map(notification => (
                                    <div
                                        key={notification._id}
                                        className={`px-4 py-3 border-b last:border-b-0 hover:bg-indigo-50 cursor-pointer transition-colors duration-150 ${notification.isRead ? "bg-white" : "bg-blue-50"}`}
                                        onClick={() => { }}
                                    >
                                        <p className="text-sm text-gray-700">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 font-medium px-4 py-6 text-sm text-gray-500">
                                <BellOff size={24} className="text-gray-500" />
                                No unread notifications yet
                            </div>
                        )}

                    </div>

                </div>
            )}
        </div>
    )
}

export default Notifications
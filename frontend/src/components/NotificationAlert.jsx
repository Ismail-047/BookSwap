import { Bell } from "lucide-react";

export default function NotificationAlert() {
    return (
        <div className="flex items-center justify-center p-8 bg-gray-100 min-h-screen">
            <div className="w-full max-w-md">
                {/* Alert Notification Banner */}
                <div className="bg-indigo-600 text-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex items-center p-4">
                        {/* Icon with badge */}
                        <div className="relative mr-4">
                            <Bell size={24} className="text-white" />
                            <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                7
                            </span>
                        </div>

                        {/* Notification text */}
                        <div className="flex-1">
                            <p className="font-medium">You have 7 unread notifications</p>
                        </div>

                        {/* Action button */}
                        <button className="ml-4 px-3 py-1 bg-blue-400 hover:bg-blue-500 rounded-md text-sm font-medium">
                            View all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
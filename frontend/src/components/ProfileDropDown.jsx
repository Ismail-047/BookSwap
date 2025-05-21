import React, { useState } from 'react'
import useAuthStore from '../zustand/authStore';
import { NavLink } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

function ProfileDropDown() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { authUser, logoutUser } = useAuthStore();

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div className="ml-3 relative">
            <div>
                <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1 border border-gray-200"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Open user menu</span>
                    {authUser?.profilePicture ? (
                        <img
                            className="h-8 w-8 rounded-full"
                            src={authUser.profilePicture}
                            alt="Profile"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-inner">
                            {authUser?.firstName?.charAt(0)}{authUser?.lastName?.charAt(0)}
                        </div>
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 min-w-64 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden animate-themeAnimation">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <p className="text-sm font-medium text-gray-900 ">
                            {authUser?.firstName} {authUser?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {authUser?.email}
                        </p>
                    </div>
                    <NavLink
                        to="/profile"
                        className="block pl-3 pr-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150  items-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <User className="mr-2 h-4 w-4 text-gray-500" />
                        Your Profile
                    </NavLink>
                    <button
                        className="block w-full text-left pl-3 pr-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150  items-center"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4 text-red-500" />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropDown;
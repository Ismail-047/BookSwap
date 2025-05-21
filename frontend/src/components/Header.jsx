import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell, Menu, X, User, LogOut, Book, Heart, Inbox, Home, LayoutDashboard, LogIn, LogOutIcon, Compass } from "lucide-react";
import useAuthStore from "../zustand/authStore";
import Logo from "./Logo";
import useUserStore from "../zustand/userStore";
import Notifications from "./Notifications";
import ProfileDropDown from "./ProfileDropDown";


function HeaderLink({
  to,
  Icon,
  label,
  count,
}) {
  return (
    <NavLink to={to}
      className="group inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-indigo-700 hover:border-indigo-400 transition-all duration-200">

      {Icon &&
        <Icon className="h-5 w-5 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
      }

      <span className="ml-2">{label}</span>

      {count && (
        <div className="ml-2 text-[11px] h-5 w-5 text-center bg-indigo-600 text-white rounded-full">
          {count}
        </div>
      )}
    </NavLink>

    /*
    ADD THIS TO INDEX.CSS
    .active {
      @apply text-indigo-700 border-indigo-400;
    }
    */
  );
}

const Header = () => {

  const [unreadCount, setUnreadCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { wishlistItemsCount } = useUserStore();
  const { isAuthenticated, logoutUser } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setUnreadCount(0);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logoutUser();
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-[0px_0px_5px_gray] z-[200] border-b border-indigo-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-20">

          <div className="flex">
            {/* LOGO */}
            <Logo />

            {/* HOME */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">

              <HeaderLink to="/"
                label="Home"
                Icon={Home}
              />
              {isAuthenticated && (
                <>
                  <HeaderLink to="/dashboard"
                    label="Dashboard"
                    Icon={LayoutDashboard}
                  />
                  <HeaderLink to="/my-books"
                    label="My Books"
                    Icon={Book}
                  />
                  <HeaderLink to="/my-requests"
                    label="Requests"
                    Icon={Inbox}
                  />
                  <HeaderLink to="/wishlist"
                    label="Wishlist"
                    Icon={Heart}
                    count={wishlistItemsCount()}
                  />
                </>
              )}
            </div>

          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Notifications />

                {/* Profile dropdown */}
                <ProfileDropDown />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login"
                  className="text-gray-600 bg-white flex items-center gap-2 hover:text-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <LogIn size={17} /> Log In
                </NavLink>
                <NavLink to="/signup"
                  className="bg-gradient-to-r flex items-center gap-2 from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 shadow-sm">
                  <LogOutIcon size={17} /> Sign up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-indigo-100 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink to="/" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
              <Home className="mr-3 h-5 w-5 text-gray-500" />
              Home
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/explore" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <Compass className="mr-3 h-5 w-5 text-gray-500" />
                  Explore
                </NavLink>
                <NavLink to="/dashboard" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
                  Dashboard
                </NavLink>
                <NavLink to="/my-books" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <Book className="mr-3 h-5 w-5 text-gray-500" />
                  My Books
                </NavLink>
                <NavLink to="/my-requests" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <Inbox className="mr-3 h-5 w-5 text-gray-500" />
                  Requests
                </NavLink>
                <NavLink to="/wishlist" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <Heart className="mr-3 h-5 w-5 text-gray-500" />
                  Wishlist
                </NavLink>
                <NavLink to="/notifications" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <Bell className="mr-3 h-5 w-5 text-gray-500" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/profile" className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors duration-150">
                  <User className="mr-3 h-5 w-5 text-gray-500" />
                  Profile
                </NavLink>
                <button
                  className="flex w-full items-center text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-500 hover:text-red-700 transition-colors duration-150"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5 text-red-500" />
                  Sign out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="space-y-2 mt-4 px-3 pb-3">
                <NavLink to="/login" className="block w-full text-center text-base font-medium text-gray-600 hover:text-indigo-700 py-2 px-4 rounded-md border border-gray-300 hover:border-indigo-300 transition-colors duration-150">
                  Sign in
                </NavLink>
                <NavLink to="/register" className="block w-full text-center mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md text-base font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 shadow-sm">
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Book, Heart, Users } from 'lucide-react';
import useUserStore from '../../zustand/userStore';
import { useState } from 'react';
import { ThemeButton } from "../Buttons";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToNewsletters } = useUserStore();

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await subscribeToNewsletters(email)
    setIsLoading(false);
  };

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-purple-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-purple-600 mr-2" />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BookSwap</span>
            </div>
            <p className="text-gray-600">
              Exchange books, share knowledge, and build a community of readers around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-blue-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-pink-600">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-blue-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-red-600">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-books" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> My Books
                </Link>
              </li>
              <li>
                <Link to="/my-requests" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Requests
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Browse Books
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center transition-colors duration-200">
                  <span className="mr-2">•</span> Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                <span className="text-gray-600">contact@bookswap.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                <span className="text-gray-600">
                  123 Book Street<br />
                  Reading, CA 94103<br />
                  United States
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-center text-gray-900 mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-600 text-center mb-4">Get the latest news and updates about BookSwap</p>
            <form onSubmit={handleFormSubmission} className="flex">
              <input required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 appearance-none rounded-l-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
              <ThemeButton
                btnLabel="Subscribe"
                extraClasses="bg-gradient-to-r from-blue-600 to-purple-600 min-w-28"
                isButtonLoading={isLoading}
              />
            </form>
          </div>
        </div>

        {/* App features section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">10,000+ Books</h3>
              <p className="text-gray-600">Access to thousands of books shared by our community members</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Growing Community</h3>
              <p className="text-gray-600">Join thousands of book lovers from around the world</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-600 mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Free to Use</h3>
              <p className="text-gray-600">Our platform is completely free for all users</p>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} BookSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
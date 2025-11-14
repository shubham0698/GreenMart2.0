import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartIcon, MenuIcon, CloseIcon } from "./script";

const Header = ({ cartItemCount, onCartClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <nav className="w-full px-3 sm:px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-green-700 tracking-tight hover:text-green-800 transition-colors"
        >
          Green<span className="text-green-500">Mart</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-gray-100 border border-green-200 rounded-full px-4 py-1.5 w-1/3 shadow-inner hover:shadow-md transition-all duration-200">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent px-2 py-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-5 h-5 text-green-600 hover:text-green-700 cursor-pointer transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="text-gray-700 font-medium hover:text-green-700 transition-all duration-200 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Mobile Search */}
          <div className="md:hidden flex items-center bg-gray-100 border border-green-200 rounded-full px-3 py-1 w-40 sm:w-52 mr-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent px-2 py-1 outline-none text-gray-700 text-sm placeholder-gray-400"
            />
            <svg
              className="w-5 h-5 text-green-600 hover:text-green-700 cursor-pointer transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative text-gray-600 hover:text-green-700 transition-colors"
            aria-label="Open cart"
          >
            <CartIcon className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile Icon */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-green-700 border-2 border-green-600 rounded-full p-0.5 hover:scale-105 transition-transform hover:shadow-md"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0zM4.5 20.25a8.25 8.25 0 0 1 15 0"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white border border-green-100 rounded-xl shadow-xl py-2 animate-fade-in">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  <p className="font-semibold">Welcome, User!</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700 text-sm rounded-md transition-all"
                >
                  View Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700 text-sm rounded-md transition-all"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => alert("Logged out!")}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-600 text-sm rounded-md transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden ml-2 text-gray-700 hover:text-green-700 transition-colors"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg animate-slide-down">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="block px-4 py-3 text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)} // close menu on click
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

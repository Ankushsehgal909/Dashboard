import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-blue-200 dark:bg-blue-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center ml-96 p-2">
        <div className="relative flex mx-24 hidden md:block w-96"> {/* Increased width */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-blue-300 rounded-md bg-blue-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search anything..."
          />
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 ml-4"> {/* Icon section */}
          <button className=" text-gray-500 dark:text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m0 0v1a3 3 0 1 0 6 0v-1m-6 0h6"></path>
            </svg>
            <span className="sr-only">Notifications</span>
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

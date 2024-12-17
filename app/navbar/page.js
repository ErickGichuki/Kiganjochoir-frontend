'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-blue-400 top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center px-4 py-4">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
            <Link href="/" className="text-xl font-bold">
              SDA Kiganjo <span className="text-purplefortitle">Church Choir</span>
            </Link>
          </div>
          <div className='hidden md:flex space-x-8 text-md'>
             <Link href='/' className='text-purplefortitle'>
                 Home
             </Link>
             <Link href='/aboutus' className=''>
                 About us
             </Link>
             <Link href='/recordedsongs' className=''>
                 Songs
             </Link>
             <Link href='/contact' className=''>
                 Contact
             </Link>
             <Link href='/login' className='bg-signupcolor text-white px-4 py-2 rounded-full hover:bg-signuphover transition duration-300'>
                 Login
             </Link>
         </div>
          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={handleToggle}
            aria-expanded={isOpen}
          >
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-400 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 shadow-lg`}
      >
        <div className="p-6 flex flex-col space-y-6 items-center justify-center">
          <button
            className="self-end py-2 bg-yellow-500 rounded-full px-4 focus:outline-none"
            onClick={closeSidebar}
          >
            Close
          </button>
          <Link href="/" className="text-lg font-medium hover:text-gray-700" onClick={closeSidebar}>
            Home
          </Link>
          <Link href="/aboutus" className="text-lg font-medium hover:text-gray-700" onClick={closeSidebar}>
            About Us
          </Link>
          <Link href="/recordedsongs" className="text-lg font-medium hover:text-gray-700" onClick={closeSidebar}>
            Songs
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:text-gray-700" onClick={closeSidebar}>
            Contact
          </Link>
          <Link
            href="/login"
            className="text-lg font-medium bg-signupcolor text-white px-4 py-2 rounded-full hover:bg-signuphover transition"
            onClick={closeSidebar}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}

      <style>{`
        .hamburger span {
          transition: all 0.3s ease-in-out;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      `}</style>
    </>
  );
}

export default Navbar;
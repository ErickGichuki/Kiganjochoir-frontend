'use client'
import React, { useState } from 'react'
import Link from 'next/link'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () =>{
        setIsOpen(false);
    }
  return (
    <>
    <nav className='top-0 left-0 z-50 w-full p-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-4'>
                <img src='/logo.png' alt='logo' className='w-12 h-12'/>
                <Link href='/' className='text-2xl font-bold'>
                    SDA Kiganjo <span className='text-purplefortitle'>Church Choir</span>
                </Link>
            </div>
        
        <div className='hidden md:flex space-x-8 text-md'>
            <Link href='/' className='text-purplefortitle'>
                Home
            </Link>
            <Link href='/aboutus' className=''>
                About us
            </Link>
            <Link href='/songs' className=''>
                Songs
            </Link>
            <Link href='/contact' className=''>
                Contact
            </Link>
            <Link href='/signup' className='bg-signupcolor text-white px-4 py-2 rounded-full hover:bg-signuphover transition duration-300'>
                SignUp
            </Link>
        </div>
        <button 
         className='md:hidden flex items-center px-3 py-2 rounded text-white focus:outline-none'
         onClick={() =>setIsOpen(!isOpen)}
         aria-expanded={isOpen}
         >
            <div className={`hamburger ${isOpen ? "open": ""}`}>
                <span className='block bg-blue-400 w-6 h-0.5 mb-1 transition-all transform duration-300'></span>
                <span className='block bg-blue-400 w-6 h-0.5 mb-1 transition-all transform duration-300'></span>
                <span className='block bg-blue-400 w-6 h-0.5 mb-1 transition-all transform duration-300'></span>
            </div>
         </button>
        </div>
        {isOpen && (
            <div className='md:hidden absolute top-0 left-0 w-full h-full p-6 space-y-4 z-40 bg-yellow-400'>
                <Link
                href='/'
                className='block text-base font-medium hover:text-gray-300 cursor-pointer'
                onClick={handleClick}
                >
                    Home
                </Link>
                <Link
                href='/aboutus'
                className='block text-base font-medium hover:text-gray-300 cursor-pointer'
                onClick={handleClick}
                >
                    About us
                </Link>
                <Link
                href='/recordedsongs'
                className='block text-base font-medium hover:text-gray-300 cursor-pointer'
                onClick={handleClick}
                >
                    Songs
                </Link>
                <Link
                href='/contact'
                className='block text-base font-medium hover:text-gray-300 cursor-pointer'
                onClick={handleClick}
                >
                    Contact
                </Link>
                <Link
                href='/signup'
                className='block text-base font-medium hover:text-gray-300 cursor-pointer'
                onClick={handleClick}
                >
                    Signup
                </Link>
            </div>
        )}
    </nav>
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
  )
}

export default Navbar

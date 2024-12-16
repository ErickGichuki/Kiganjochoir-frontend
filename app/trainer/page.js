'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function TrainerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  }

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>; // Display loading message while checking for access token
  }

  return (
    <div
      className='relative min-h-screen bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(/choir.png)` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay to improve text visibility */}

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 absolute top-1/2 transform -translate-y-1/2 w-full px-4">
        <Link href='/createsong' className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
          Create Song
        </Link>
        <Link href='/contact' className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
          Messages
        </Link>
        <button onClick={handleLogout} className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
          Logout
        </button>
        <Link href='/updateproducts' className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
          Manage Songs
        </Link>
      </div>
    </div>
  )
}

export default TrainerDashboard

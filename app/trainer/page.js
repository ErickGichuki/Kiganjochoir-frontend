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
      className='relative min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(/choir.png)` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-24 left-0 w-full p-4 flex justify-center items-center z-50">
        <nav className='flex space-x-4'>
        <Link href='/createsong' className='bg-violet-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-violet-700 transition'>
          Create Song
        </Link>
        <Link href='/message' className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
          Messages
        </Link>
        <button onClick={handleLogout} className='bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition'>
          Logout
        </button>
        </nav>
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen text-center relative z-10'>
        <h2 className='text-3xl font-bold mt-12 text-white mb-12'>
          Welcome to Trainers Dashboard!!
        </h2>
        <div className='flex space-x-8'>
          <Link
          href='/updatesong'
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded text-xl'
          >
            Manage Songs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard

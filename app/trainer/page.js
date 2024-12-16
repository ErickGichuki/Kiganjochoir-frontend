'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function TrainerDashboard() {
  const router = useRouter();  // Using useRouter instead of useParams

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  }

  return (
    <div
      className='relative min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(/choir.png)` }}
    >
      <div className='flex justify-center items-center space-x-4'>
        <Link href='/createsong' className='bg-blue-600 text-white px-4 py-2 rounded'>
          Create Song
        </Link>
        <Link href='/contact' className='bg-blue-600 text-white px-4 py-2 rounded'>
          Messages
        </Link>
        <button onClick={handleLogout} className='bg-blue-600 text-white px-4 py-2 rounded'>
          Logout
        </button>
        <Link href='/updateproducts' className='bg-blue-600 text-white px-4 py-2 rounded'>
          Manage Songs
        </Link>
      </div>
    </div>
  )
}

export default TrainerDashboard

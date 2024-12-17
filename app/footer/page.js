import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div className='bg-blue-300 py-8'>
        <div className='container mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='mb-4'>
                <h3 className='text-xl font-bold mb-2'>SDA Kiganjo Church Choir</h3>
                <p className='text-md'>We are a dedicated team in the ministry to propel the message of the 3 Angels Message to all the world in our generation. <br/>Rev 14:6-12</p>
            </div>
            <div className='mb-4'>
                <h3 className='text-lg font-bold mb-2'>Quick Links</h3>
                <div className='flex flex-col space-y-2'>
                    <Link href='/' className='transition duration-300'>Home</Link>
                    <Link href='/aboutus' className='transition duration-300'>About Us</Link>
                    <Link href='/login' className='transition duration-300'>Login</Link>
                    <Link href='/contact' className='transition duration-300'>Contact</Link>
                </div>
            </div>
            <div className='mb-4'>
                <h3 className='text-lg font-bold mb-2'>Follow us</h3>
                <div className='flex flex-col space-y-2'>
                    <Link href='/' className='transition duration-300'>Twitter</Link>
                    <Link href='/' className='transition duration-300'>Facebook</Link>
                    <Link href='/' className='transition duration-300'>WhatsApp</Link>
                    <Link href='/' className='transition duration-300'>Instagram</Link>
                </div>
            </div>
            <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-4'>Volumes</h3>
                <div className='flex flex-col space-y-2'>
                    <Link href='/' className='mt-4'>Volume 1</Link>
                    <Link href='/' className='mt-4'>Volume 2</Link>
                </div>
            </div>
        </div>
        <div className='mt-8 border-t border-white pt-6 text-center'>
            <p className='text-md'>
                &copy;{new Date().getFullYear()} SDA Kiganjo Church Choir. All Rights Reserved.
            </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <div className='bg-herocolor pt-4'>
      <div className='h-100 mx-auto max-w-8xl py-6 px-6 flex flex-col md:flex-row justify-between items-center'>
        <div className='mt-8 md:mr-8'>
            <h1 className='font-bold text-2xl'>
                Heavenly Music
            </h1>
            <h3 className='text-md'>
                that transforms
            </h3>
            <p className='text-md mb-6'>
                Let everything that has breath praise the Lord. As we behold the presence of the Lord it is always good to sing with spirit and understanding. Amen
            </p>
            <div className='space-x-5'>
                <button className='text-white font-semibold py-2 px-4 border rounded-3xl mb-4 bg-songsbutton hover'>
                    Our Songs
                </button>
                <button className='bg-white text-songsbutton font-semibold py-2 px-4 rounded-3xl mb-8 hover:bg-songsbutton hover:text-white'>
                    Get Started
                </button>
            </div>
        </div>
        <div className='mt-8 md:mt-0'>
            <div className='flex flex-col justify-center space-y-4 up-down h-80 w-full'>
                <Image src='/choir.png' alt='choir' width={440} height={256} className='rounded-full' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

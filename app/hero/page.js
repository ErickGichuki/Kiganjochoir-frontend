'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function Hero() {
    const [text, setText] = useState('');
    const [color, setColor] = useState('text-red-600');
    const fullText = 'Let everything that has breath praise the Lord. As we behold the presence of the Lord it is always good to sing with spirit and understanding. Amen'

    useEffect(()=>{
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < fullText.length) {
                const currentChar = fullText[index];
                if (currentChar) {
                    setText((prevText) => prevText + currentChar);
                }
                if (index < fullText.length / 3) {
                    setColor('text-red-600');
                } else if (index < (2 * fullText.length) / 3){
                    setColor('text-violet-600');
                } else {
                    setColor('text-black');
                }
                index += 1;
            } else{
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, []);
  return (
    <div className='bg-herocolor pt-4'>
      <div className='h-100 mx-auto max-w-8xl py-6 px-6 flex flex-col md:flex-row justify-between items-center'>
        <div className='mt-8 md:mr-8'>
            <h1 className='font-bold text-2xl'>
                Heavenly <span className='text-violet-700'>Music</span>
            </h1>
            <h3 className='text-md mb-2'>
                that transforms
            </h3>
            <p className={`mt-2 mb-6 text-md ${color}`}>
                {text}
            </p>
            <div className='space-x-5'>
                <a 
                    className='text-white font-semibold py-3 px-4 border rounded-3xl mb-4 bg-songsbutton hover'
                    href='/recordedsongs'>
                    Our Songs
                </a>
                <a className='bg-white text-songsbutton font-semibold py-3 px-4 rounded-3xl mb-8 hover:bg-songsbutton hover:text-white'>
                    Get Started
                </a>
            </div>
        </div>
        <div className='mt-8 md:mt-0'>
            <div className='flex flex-col justify-center space-y-4 up-down h-80 w-full'>
                <Image src='/choir.png' alt='choir' width={256} height={256} className='rounded-full w-64 h-64 animate-spin-slow' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

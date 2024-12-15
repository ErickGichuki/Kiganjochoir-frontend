'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Page() {
    const [songs, setSongs] = useState([]);
    useEffect(() =>{
        axios.get('https://kiganjochoir.onrender.com/recordedsongs/')
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, []);
  return (
    <div className='bg-gradient-to-r from-violet-200 via-red-200 to-indigo-400 py-10'>
      <h2 className='font-bold text-center text-xl text-blue-700 my-4'>SDA Kiganjo Church Choir Songs</h2>
      {songs.map(song => (
        <div key={song.id} className='bg--500 rounded-full pb-10 mb-4 mx-4'>
            <h3 className='text-black text-center'>{song.title}</h3>
            <audio controls controlsList='nodownload' className=''>
                <source src={song.audio} type='audio/mpeg' />
                Your browser seems not to support the audio element!!
            </audio>
        </div>
      ))}
    </div>
  )
}

export default Page

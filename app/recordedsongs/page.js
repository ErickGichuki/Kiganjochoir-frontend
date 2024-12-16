'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Page() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() =>{
      const fetchSongs = async () => {
        try {
          const response = await axios.get(
            "https://kiganjochoir.onrender.com/recordedsongs/"
          );
          setSongs(response.data);
        } catch (error) {
          console.error("Error fetching songs:", error);
          setError("Failed to load songs. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchSongs();
    }, []);
  return (
    <div className='bg-gradient-to-r py-10'>
      <h2 className='font-bold text-center text-xl text-blue-700 my-4'>SDA Kiganjo Church Choir Songs</h2>
      {loading ? (
        <div className='flex justify-center items-center'>
          <AiOutlineLoading3Quarters className="text-4xl text-blue-700 animate-spin" />
        </div>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : songs.length === 0 ? (
        <p className='text-center text-gray-500'>No songs available at the moment!!</p>
      ): (
        <div className='space-y-4'>
          {songs.map(song => (
          <div key={song.id} className='bg--500 rounded-full pb-10 mb-4 mx-4'>
            <h3 className='text-black text-center'>{song.title}</h3>
            <audio controls controlsList='nodownload' className=''>
                <source src={song.audio} type='audio/mpeg' />
                Your browser seems not to support the audio element!!!!
            </audio>
          </div>
      ))}
        </div> 
      )}
    </div>
  )
}

export default Page

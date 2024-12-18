'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Page() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState('');
    const [color, setColor] = useState('text-red-600');
    const fullText = 'May these songs bless you, touch you and prepare you for the soon return of Jesus.'
    
    useEffect(()=>{
            let index = 0;
            const intervalId = setInterval(() => {
                if (index < fullText.length) {
                    const currentChar = fullText[index];
                    if (currentChar) {
                        setText((prevText) => prevText + currentChar);
                    }
                    if (index < fullText.length / 3) {
                        setColor('text-blue-600');
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
    <div className='bg-gradient-to-r from-blue-200 via-yellow-300 to-green-300 py-10'>
      <h2 className={`font-bold text-center text-lg text-blue-700 mx-auto my-6 ${color}`}>
        {text}
      </h2>
      
      {loading ? (
        <div className='flex justify-center items-center'>
          <AiOutlineLoading3Quarters className="text-4xl text-blue-700 animate-spin" />
        </div>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : songs.length === 0 ? (
        <p className='text-center text-gray-500'>No songs available at the moment!</p>
      ) : (
        <div className='space-y-6'>
          {songs.map((song, index) => (
            <div key={song.id} className='bg-white shadow-lg rounded-lg pb-6 mb-4 mx-6 p-2'>
              <h3 className='text-xl text-blue-800 font-semibold text-start'>{index + 1}. {song.title}</h3>
              <audio controls controlsList='nodownload' className='w-full mt-4'>
                <source src={song.audio} type='audio/mpeg' />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page;

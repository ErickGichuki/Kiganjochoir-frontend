'use client'
import React, { useState } from 'react';
import axios from 'axios';

function CreateSong() {
    const[song, setSong] = useState({
        title: "",
        audio: "",

    })
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        const { title, value} = e.target;
        setSong({ ...song, [title]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!song.audio){
            setMessage("please provide an audio.");
            return;
        }

        try {
            await axios.post("https://kiganjochoir.onrender.com/recordedsongs/", {
                title: song.title,
                audio: song.audio,
            });
            setMessage("Song added successfully!");
            setTimeout(() =>{
                setMessage("");
            }, 2000);
            setSong({
                title: "",
                audio: "",
            });
        } catch (error) {
            console.error("Error adding the song:", error);
            setMessage("Failed to add the song.");
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default CreateSong

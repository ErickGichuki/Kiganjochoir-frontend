'use client';
import React, { useState } from 'react';
import axios from 'axios';

function CreateSong() {
    const [song, setSong] = useState({
        title: "",
        audio: null,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "audio") {
            setSong({ ...song, audio: files[0] });
        } else {
            setSong({ ...song, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!song.audio) {
            setMessage("");
            setError("Please provide an audio file.");
            return;
        }

        const formData = new FormData();
        formData.append("title", song.title);
        formData.append("audio", song.audio);

        setLoading(true); // Start loading

        try {
            const response = await axios.post("https://kiganjochoir.onrender.com/recordedsongs/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Song added successfully!");
            setError("");
            setTimeout(() => setMessage(""), 2000);
            setSong({
                title: "",
                audio: null,
            });
        } catch (error) {
            console.error("Error adding the song:", error);
            setError("Failed to add the song.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded shadow-md">
            <h1 className="text-xl font-bold mb-4">Add a New Song</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={song.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter song title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="audio" className="block text-sm font-medium text-gray-700">
                        Audio File
                    </label>
                    <input
                        type="file"
                        name="audio"
                        id="audio"
                        accept="audio/*"
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Adding Song..." : "Add Song"}
                </button>
            </form>
            {loading && (
                <div className="mt-4 text-blue-600 flex items-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    Adding the song...
                </div>
            )}
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default CreateSong;

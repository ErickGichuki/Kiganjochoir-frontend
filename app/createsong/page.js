'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For fetching dynamic route params
import axios from 'axios';

function UpdateSong() {
    const { id } = useParams();  // Get the song ID from URL
    const [song, setSong] = useState({
        title: "",
        audio: null,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);  // To track if it's an update or creation

    useEffect(() => {
        if (id) {
            fetchSong(id);  // Fetch song details if updating
        }
    }, [id]);

    // Function to fetch song data for updating
    const fetchSong = async (songId) => {
        try {
            const response = await axios.get(`https://kiganjochoir.onrender.com/recordedsongs/${songId}`);
            setSong(response.data);
            setIsEditing(true);  // Mark as editing when the song exists
        } catch (error) {
            console.error("Error fetching song:", error);
            setError("Failed to fetch the song.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "audio") {
            setSong({ ...song, audio: files[0] });
        } else {
            setSong({ ...song, [name]: value });
        }
    };

    // Handle form submission (either add or update song)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!song.audio) {
            setError("Please provide an audio file.");
            setMessage("");
            return;
        }

        const formData = new FormData();
        formData.append("title", song.title);
        formData.append("audio", song.audio);

        setLoading(true);  // Start loading state

        try {
            let response;
            if (isEditing) {
                // If editing, update the existing song
                response = await axios.put(
                    `https://kiganjochoir.onrender.com/recordedsongs/${song.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setMessage("Song updated successfully!");
            } else {
                // If creating, add a new song
                response = await axios.post(
                    "https://kiganjochoir.onrender.com/recordedsongs/",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setMessage("Song added successfully!");
            }

            setError("");
            setSong({ title: "", audio: null });  // Reset form
            setTimeout(() => setMessage(""), 2000);  // Clear message after a while
        } catch (error) {
            console.error("Error saving song:", error);
            setError("Failed to save the song.");
        } finally {
            setLoading(false);  // End loading state
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded shadow-md">
            <h1 className="text-xl font-bold mb-4">{isEditing ? "Update Song" : "Add New Song"}</h1>

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
                        required={!isEditing}  // Make required only if creating a new song
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Saving Song..." : isEditing ? "Update Song" : "Add Song"}
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
                    Saving the song...
                </div>
            )}

            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default UpdateSong;

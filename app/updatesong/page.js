// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';  // Ensure this import is correct
// import axios from 'axios';

// function UpdateSong() {
//   const router = useRouter();  // Use router from Next.js
//   const { id } = router.query;  // Get the song ID from the URL (query params)
//   const [song, setSong] = useState({
//     title: "",
//     audio: null,
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);  // Track if it's an edit or create

//   // Fetch song details if editing
//   useEffect(() => {
//     if (id) {
//       fetchSong(id);
//     }
//   }, [id]);

//   const fetchSong = async (songId) => {
//     try {
//       const response = await axios.get(`https://your-api-url/recordedsongs/${songId}`);
//       setSong(response.data);
//       setIsEditing(true);
//     } catch (error) {
//       console.error("Error fetching song:", error);
//       setError("Failed to fetch the song.");
//     }
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "audio") {
//       setSong({ ...song, audio: files[0] });
//     } else {
//       setSong({ ...song, [name]: value });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!song.audio) {
//       setError("Please provide an audio file.");
//       setMessage("");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", song.title);
//     formData.append("audio", song.audio);

//     setLoading(true);

//     try {
//       let response;
//       if (isEditing) {
//         // Update existing song
//         response = await axios.put(
//           `https://your-api-url/recordedsongs/${song.id}`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         setMessage("Song updated successfully!");
//       } else {
//         // Create new song
//         response = await axios.post(
//           "https://your-api-url/recordedsongs/",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         setMessage("Song created successfully!");
//       }

//       // Reset form and show success message
//       setSong({
//         title: "",
//         audio: null,
//       });
//       setIsEditing(false);
//       setLoading(false);
//       setTimeout(() => {
//         setMessage("");
//       }, 1500);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setError("Failed to submit the song.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 pt-24 mt-4 border border-gray-200 rounded-lg shadow-lg">
//       <button
//         onClick={() => router.push("/admin")}
//         className="mb-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Go Back
//       </button>
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         {isEditing ? "Edit Song" : "Add New Song"}
//       </h2>

//       {message && (
//         <p
//           className={`text-center mb-6 p-2 rounded ${
//             message.includes("success")
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       {error && (
//         <p className="text-center text-red-700 mb-6">{error}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="title">
//             Song Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={song.title}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="audio">
//             Song Audio
//           </label>
//           <input
//             type="file"
//             name="audio"
//             id="audio"
//             onChange={handleChange}
//             accept="audio/*"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {song.audio && (
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Current Audio</label>
//             <audio controls>
//               <source src={URL.createObjectURL(song.audio)} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={loading}
//           >
//             {isEditing ? "Update Song" : "Add Song"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateSong;

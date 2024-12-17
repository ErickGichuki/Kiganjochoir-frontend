'use client'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

function ContactPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !subject || !message){
        setStatus("Please fill all fields.");
    }
    try{
        await axios.post("https://kiganjochoir.onrender.com/account/contact/", {
            name,
            email,
            subject,
            message,
        });
        setStatus("Your message has been sent successfully!!")
        setEmail("");
        setName("");
        setSubject("");
        setMessage("");
        setTimeout(() =>{
            setStatus("");
        }, 1500);
    } catch (error) {
        console.error("Error sending message: ", error);
        setStatus("Failed to send message! Please try again.");
    }
  }
  return (
    <div className='pt-2 bg-gray-100 mt-6 mb-4 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-10'>Talk to us.</h2>
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='md:w-1/2'>
                <h3 className='text-2xl font-semibold mb-4'>
                    Heard us before? <span className='text-purple-500'>we spread the gospel of the kingdom</span>
                </h3>
                <p className='text-lg text-gray-700 mb-8'>
                    If you got any question kindly get in touch with us so that we can help you and know more about Jesus.
                </p>

                {status && <p className='text-green-500 mb-4'>{status}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                    />
                    <button
                    type='submit'
                    className='bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors'
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <div className='md:w-1/2'>
                <Image
                src="/logo.png"
                alt='contact'
                className='w-32 h-32 rounded-full'
                width={256}
                height={256}
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

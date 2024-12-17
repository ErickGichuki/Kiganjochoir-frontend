'use client';
import { useState } from 'react';
import React from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [see, setSee] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://kiganjochoir.onrender.com/account/login/', {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('role', response.data.role);

        // Navigate to appropriate dashboard based on role
        if (response.data.role === 'trainer') {
          router.push('/trainer');
        } else {
          router.push('/songs'); 
        }

      } catch (error) {
        // Handle errors, like invalid credentials
        if (error.response) {
          setErrorMessage(error.response.data.detail || 'Something went wrong');
        } else {
          setErrorMessage('Network error, please try again later');
        }
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Welcome to the ministry</h2>

      {/* Display error message if any */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="text"
            placeholder='Enter your email address'
            {...formik.getFieldProps('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <div className='relative'>
          <input
            id="password"
            type={see ? 'text' : 'password'}
            placeholder="Enter your password"
            {...formik.getFieldProps('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <button
          type='button'
          onClick={() => setSee((prev) => !prev)}
          className='absolute right-3 top-3'
          >
            {see ? 'Hide' : 'Show'}
          </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

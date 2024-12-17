'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() =>{
    setIsClient(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[a-zA-Z0-9]/, 'Password must be alphanumeric (letters and numbers only)')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      const { username, email, password } = values;

      try {
        const response = await axios.post('https://kiganjochoir.onrender.com/account/signup/', {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          router.push('/login');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setError('There was an error with the registration. Please try again.');
      }
    },
  });

  if (!isClient) {
    return null;
}
return (
  <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-300 to-green-500 p-4'>
    <div className='w-full max-w-lg md:max-w-7xl p-4 md:p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 bg-white shadow-lg rounded-lg'>
      <div className='hidden md:block md:w-1/2'>
        <Image src='/logo.png' alt='signup' width={256} height={256} className='w-full h-auto rounded-full shadow-lg' />
      </div>
      <div className='w-full md:w-1/2 p-4 md:p-8 space-y-6'>
        <h2 className='text-xl md:text-2xl font-bold text-center text-gray-700'>Welcome Signup with us</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <input
         className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
         type='text'
         name='username'
         placeholder='Username'
         {...formik.getFieldProps('username')}
         />
         {formik.touched.username && formik.errors.username && (
          <p className='text-red-500 text-sm'>{formik.errors.username}</p>
         )}
         <input
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps('confirmPassword')}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              → Register
            </button>
      </form>
    </div>
  </div>
)
}
export default SignupPage
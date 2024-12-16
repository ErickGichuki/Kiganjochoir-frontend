'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be at most 20 characters')
        .required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        // Make the POST request to your backend API
        const response = await axios.post('https://kiganjochoir.onrender.com/account/signup/', {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        // Handle the successful signup response
        if (response.status === 201) {
          alert('Signup successful! Please check your email for confirmation.');
        }
      } catch (err) {
        // Handle errors from the API
        setError(err.response?.data?.message || 'Something went wrong, please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-indigo-500">
      <div className="flex justify-center items-center max-w-md bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="w-full space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up ✨</h2>

          {/* Display error message if any */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <input
                type="text"
                name="username"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

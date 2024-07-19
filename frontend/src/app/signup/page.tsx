'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`;
      await axios.post(url, {
        username: email,
        email,
        password,
      });
      window.location.href = '/signin';
    } catch (e: any) {
      let message = 'Registration Failed';
      if(e instanceof AxiosError && e.response?.data?.error?.message) {
        message = e.response?.data?.error?.message;
      }
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 p-3 rounded w-full mb-4"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 p-3 rounded w-full mb-4"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
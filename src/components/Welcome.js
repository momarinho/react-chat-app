import React, { useState } from 'react';
import { auth } from '../config/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in as:', user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Welcome!</h2>
      <p className="text-center text-gray-600 mb-8">
        Sign in to start chatting
      </p>

      <form
        onSubmit={handleLoginFormSubmit}
        className="flex flex-col items-center"
      >
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="bg-gray-200 rounded-md py-2 px-4 w-full mb-4"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="bg-gray-200 rounded-md py-2 px-4 w-full mb-4"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In with Email and Password
        </button>
      </form>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        onClick={googleSignIn}
        type="button"
      >
        Sign In with Google
      </button>
    </main>
  );
};

export default Welcome;

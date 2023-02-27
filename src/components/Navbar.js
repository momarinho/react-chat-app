import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const googleSignOut = () => {
    auth.signOut();
  };

  return (
    <nav className="flex justify-between items-center bg-blue-500 px-4 py-3">
      <h1 className="text-white text-2xl font-bold">React Chat App</h1>
      {user ? (
        <button
          onClick={googleSignOut}
          type="button"
          className="bg-white hover:bg-gray-100 text-red-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow sign-out"
        >
          Sign Out
        </button>
      ) : (
        <h3 className='text-white'>Hello there</h3>
      )}
    </nav>
  );
};

export default Navbar;

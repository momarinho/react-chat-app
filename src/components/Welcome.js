import React, { useState } from 'react';
import { auth } from '../config/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // Initialize the modal to be shown

  let navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Signed in with Google successfully');
        navigate('/chatbox');
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
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
        navigate('/chatbox');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-blue-900 px-4 py-3 flex justify-between">
                <h2 className="text-2xl text-gray-100 font-bold">Login</h2>
                <button
                  onClick={closeModal}
                  className="text-red-600 hover:text-red-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleLoginFormSubmit} className="space-y-4">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-gray-200 rounded-md py-2 px-4 w-full"
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
                    className="bg-gray-200 rounded-md py-2 px-4 w-full"
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="mr-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleRegister}
                      type="submit"
                      className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <hr className="my-4" />
                <button
                  onClick={googleSignIn}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Render the rest of the page */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">Welcome!</h1>
        <p className="text-gray-500 mb-4">Login to start chat...</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Welcome;

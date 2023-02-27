import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      alert('Enter a valid message');
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form
      onSubmit={(event) => sendMessage(event)}
      className="flex items-center space-x-4"
    >
      <label htmlFor="messageInput" className="sr-only">
        Enter Message
      </label>
      <input
        className="border border-gray-300 rounded-lg py-2 px-4 flex-grow"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;

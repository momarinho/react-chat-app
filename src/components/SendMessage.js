import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    event.stopPropagation();

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
    <div className="py-2 bg-gray-700 text-gray-300 fixed bottom-0 left-0 w-full">
      <form onSubmit={sendMessage} className="flex items-center">
        <label htmlFor="messageInput" className="sr-only">
          Enter Message
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 m-1 flex-grow"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          id="messageInput"
          name="messageInput"
          type="text"
          maxLength={200}
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className="m-1 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;

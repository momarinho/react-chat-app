import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';

const SendMessage = () => {
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
  };

  return (
    <form onSubmit={(event) => sendMessage(event)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        className=""
        value={message}
        onChange={(event) => event.target.value}
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="type your message here..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;

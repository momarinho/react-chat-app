import React, { useEffect, useRef, useState } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import Message from './Message';
import SendMessage from './SendMessage';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  const scroll = useRef()

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    });
    return unsubscribe;
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-screen">
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6 max-h-[calc(100vh-9rem)]">
        <ul className="">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;

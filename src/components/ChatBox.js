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

  const scroll = useRef();

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
    <main className="min-h-screen mt-2 mr-2 ml-2 mb-16 flex flex-col justify-between">
      <div className="flex-grow overflow-auto">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <div className="sticky bottom-0 left-0 right-0">
        <SendMessage scroll={scroll} />
      </div>
    </main>
  );
};

export default ChatBox;

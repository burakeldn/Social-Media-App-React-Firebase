import React, { useCallback, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function AddPost() {
  const postsRef = collection(db, 'posts');
  const currentUser = auth.currentUser;

  const [body, setBody] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await addDoc(postsRef, {
          body: body,
          createdAt: serverTimestamp(),
          createdBy: currentUser.displayName,
        });
        setBody('');
      } catch (error) {
       alert('Error adding document:', error);
      }
    },
    [postsRef, body, currentUser.displayName]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What are you working on?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

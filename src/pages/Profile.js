import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function Profile() {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const [data, isLoading] = useCollection(q);
  const currentUser = auth.currentUser;

  const deletePost = async (id, createdBy) => {
    if (currentUser.displayName === createdBy) {
      try {
        await deleteDoc(doc(db, 'posts', id));
      } catch (error) {
        alert('Error deleting document:', error);
      }
    } else {
      alert('You are not authorized to delete this post.');
    }
  };

  if (isLoading) {
    return <div>
      <h1>Loading..</h1>
    </div>;
  }

  const currentUserPosts = data ? data.docs.filter(doc => doc.data().createdBy === currentUser.displayName) : [];
  const totalPosts = currentUserPosts.length;

  return (
    <div className="posts-container">
      {currentUser ? (
        <div>
          <h2>{currentUser.displayName}</h2>
          <p>Email: {currentUser.email}</p>
          <p>Total Posts: {totalPosts}</p>

          <Link to="/">Go to Home</Link>

          <h3>My Posts</h3>
          {data.docs.map((doc) => {
            const post = doc.data();
            if (currentUser.displayName === post.createdBy) {
              return (
                <div className="post" key={doc.id}>
                  <div className="post-header">
                    <p>{post.createdBy}</p>
                    <p>{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()} - {new Date(post.createdAt?.seconds * 1000).toLocaleTimeString()}</p>
                  </div>
                  <p className="post-body">{post.body}</p>
                  {currentUser.displayName === post.createdBy && (
                    <button onClick={() => deletePost(doc.id, post.createdBy)}>Delete</button>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div>You need to login to view this page.</div>
      )}
    </div>
  );
}

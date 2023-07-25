import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function Posts() {
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

    return (
        <div className="posts-container">
            {data.docs.map((doc) => {
                const post = doc.data();
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
            })}
        </div>
    );
}
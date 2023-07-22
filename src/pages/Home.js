import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import { auth } from '../firebase';
import Posts from '../components/Posts'
import AddPost from '../components/AddPost';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <AddPost/>
          <Posts/>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;

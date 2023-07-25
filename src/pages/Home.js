import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import { auth } from '../firebase';
import Posts from '../components/Posts'
import AddPost from '../components/AddPost';
import { useNavigate } from 'react-router-dom';

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

  const history = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleGoToProfile = () => {
    history('/profile');
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleGoToProfile}>Go to Profile</button>
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

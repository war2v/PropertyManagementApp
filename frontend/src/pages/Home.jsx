import React from 'react'

const Home = ({setAuth}) => {
  return (
    <div>Home
      <button onClick={() => setAuth(false)}>Log Out</button>
    </div>
  );
};

export default Home;

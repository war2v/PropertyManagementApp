import React from 'react'

const Home = ({setAuth}) => {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }
  return (
    <div>Home
      <button className="bg-white rounded border" onClick={() => setAuth(false)}>Log Out</button>
    </div>
  );
};

export default Home;

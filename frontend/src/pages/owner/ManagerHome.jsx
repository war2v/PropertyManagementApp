import React from 'react'

const ManagerHome = ({setAuth}) => {
  return (
    <div>Manager Home
      <button className="bg-white rounded border" onClick={() => setAuth(false)}>Log Out</button>
    </div>
  );
};

export default ManagerHome;

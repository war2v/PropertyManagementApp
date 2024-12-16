import React from 'react'

const ManagerHome = ({setAuthManager}) => {
  return (
    <div>Manager Home
      <button className="bg-white rounded border" onClick={() => setAuthManager(false)}>Log Out</button>
    </div>
  );
};

export default ManagerHome;

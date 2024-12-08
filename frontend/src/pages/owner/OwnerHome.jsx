import React from 'react'

const OwnerHome = ({setAuth}) => {
  return (
    <div>Owner Home
      <button className="bg-white rounded border" onClick={() => setAuth(false)}>Log Out</button>
    </div>
  );
};

export default OwnerHome;

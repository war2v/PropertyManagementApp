import React from 'react'

const TenantHome = ({setAuth}) => {
  return (
    <div>Tenant Home
      <button className="bg-white rounded border" onClick={() => setAuth(false)}>Log Out</button>
    </div>
  );
};

export default TenantHome;

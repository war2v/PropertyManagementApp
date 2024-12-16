import React from 'react'

const TenantHome = ({setAuthTenant}) => {
  return (
    <div>Tenant Home
      <button className="bg-white rounded border" onClick={() => setAuthTenant(false)}>Log Out</button>
    </div>
  );
};

export default TenantHome;

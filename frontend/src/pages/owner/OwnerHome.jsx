import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const OwnerHome = ({setAuth}) => {
  const [name, setName] = useState("");
  async function getName () {
    try {
      const response = await fetch("http://localhost:5000/dashboard/owner-username",{
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      setName(parseRes.username)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() =>{
    getName();
  });


  return (
    <div>Owner Home
      <button className="bg-blue-800 rounded border" onClick={() => setAuth(false)}>Log Out</button>
      <button className="bg-blue-800 rounded border"><Link to="/portfolio-registration">Create A Portfolio</Link></button>
      <div>
        <h1>Hello {name}</h1>
      </div>
    </div>
  )
};

export default OwnerHome;

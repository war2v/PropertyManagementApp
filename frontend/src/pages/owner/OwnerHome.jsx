import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const OwnerHome = ({setAuth}) => {
  const [name, setName] = useState("");
  const [portfolio_list, setPortfolioList] = useState([])


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

  async function getPortfolios () {
    try {
      const response = await fetch("http://localhost:5000/dashboard/owner-portfolios", {
        methd: "GET",
        headers: { token: localStorage.token }
      });
      const p_list = []
      const parseRes = await response.json();
      //console.log(parseRes.length);
      for(let i=0; i<parseRes.length; i++){
        p_list.push(
          <div className="flex justify-center space-x-4">
            <div className='py-4 '>
              <Link to={`/portfolio/${parseRes[i].p_name}`}>
              <button className='rounded w-44 px-5 py-2.5 overflow-hidden bg-green-500 group  relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300' key={i}>
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative"></span>
                {parseRes[i].p_name}
              </button>
              </Link>
            </div>
            <div className='py-4'>
              <Link to={`/property-registration/${parseRes[i].p_name}`}>
                <button className='rounded w-max px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300' key={i}>
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Add Property</span>
                </button>
              </Link>
            </div>
          </div>);
      }
  
      setPortfolioList(p_list);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPortfolios();
  }, []);
  useEffect(() =>{
    [getName()];
  });

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  }
  return (
    <div className="text-center">Owner Home
      <button className="bg-blue-800 rounded border" onClick={() => logout()}>Log Out</button>
      <button className="bg-blue-800 rounded border"><Link to="/portfolio-registration">Create A Portfolio</Link></button>
      <div>
        <h1>Hello {name}</h1>
      </div>
      <div>
        <h1>Portfolios {portfolio_list}</h1>
        
      </div>
    </div>
  )
};

export default OwnerHome;

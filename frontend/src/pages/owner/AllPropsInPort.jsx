import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SideNav from '../../components/SideNav';



export default function AllPropsInPort() {
  const [portfolio_list, setPortfolioList] = useState([]);

  async function getProperties(){
    const response = fetch("http://localhost:5000/dashboard/properties",{
      method: "GET",
      headers: { token: localStorage.token }
    }); 

    const parseRes = await response.json();
    console.log(parseRes);
  }

  async function getPortfolios () {
    try {
      const response = await fetch("http://localhost:5000/dashboard/owner-portfolios", {
        methd: "GET",
        headers: { token: localStorage.token }
      });
      const p_list = []
      const parseRes = await response.json();
      console.log(parseRes.length);
      for(let i=0; i<parseRes.length; i++){
        p_list.push(
          <div key={i} className={`flex ${i<parseRes.length-1 ? "border-b" : ""} justify-center w-full space-x-3`}>
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
            <div className='border-l border-r px-4 py-4'>
              <div>
                Properties in Portfolio
              </div>
            </div>
          </div>);
      }
  
      setPortfolioList(p_list);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    [getPortfolios(), getProperties()];
  }, []);

  return (
    <div className='flex'>
      <SideNav/>
        
      <div className='text-left m-10 p-5 border w-screen rounded-lg'>
        <div className='text-center w-full'>
          <div className="m-5 font-bold font-mono text-5xl">
            <h1>All Portfolios</h1>
          </div>
          <div className='border rounded-lg '>{portfolio_list.length == 0 ? "You Need to Create a Portfolio" : portfolio_list}</div>
            
        </div>
      </div>
    </div>
  )
}

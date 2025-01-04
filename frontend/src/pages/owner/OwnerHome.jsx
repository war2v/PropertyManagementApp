import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../../components/SideNav';

const OwnerHome = ({setAuth}) => {
  const date = new Date();
  const [name, setName] = useState("");
  const [portfolio_list, setPortfolioList] = useState([]);
  const property_amount_list = new Map();
  const [total_props, setTotalProps] = useState(0);
  const [total_ports, setTotalPorts] = useState(0);


  async function getName () {
    try {
      const response = await fetch("http://localhost:5000/dashboard/owner-username",{
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      setName(parseRes.username);
    } catch (err) {
      console.log(err);
    }
  }

  async function getTotalProperties () {
    try {
      const response = await fetch("http://localhost:5000/dashboard/owner-total-properties", {
        method: "GET",
        headers: { token: localStorage.token}
      });
      const parseRes = await response.json();
      //console.log(parseRes);
      
      
      for(const key in parseRes){
        //console.log(key);
        
        switch(key){
          case "total_props":
            setTotalProps(parseRes.total_props);
          case "total_ports":
            setTotalPorts(parseRes.total_ports);
          default:
            property_amount_list.set(key, parseRes[key]);
        }  
      }

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
          <div key={i} className={`flex ${i<parseRes.length-1 ? "border-b" : ""} justify-center w-full space-x-3`}>
            <div className='py-4 '>
              <Link to={`/portfolio/${parseRes[i].p_name}`}>
              <button className='rounded w-44 px-5 py-2.5 overflow-hidden bg-blue-500 group  relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300' key={i}>
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative"></span>
                {parseRes[i].p_name}
              </button>
              </Link>
            </div>
            <div className='py-4'>
              <Link to={`/property-registration/${parseRes[i].p_name}`}>
                <button className='rounded w-max px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300' key={i}>
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Add Property</span>
                </button>
              </Link>
            </div>
            <div className='border-l border-r px-4 py-4'>
              <div>
                Properties in Portfolio
              </div>
              <div>
                {property_amount_list.get(parseRes[i].p_name)}
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
    [getPortfolios(), getTotalProperties()];
  }, []);
  useEffect(() =>{
    [getName()];
  });

  
  return (
    <div className='flex'>
      <SideNav/>
      

      <div className='m-auto w-screen'>
        <div className='text-left m-10 p-5 border rounded-lg'>
          <h3 className='font-semibold font-mono text-3xl'>{date.getMonth()} : {date.getDate()} : {date.getFullYear()}</h3>
          <h1 className='font-semibold font-mono text-5xl'>Welcome back {name}!</h1>
          <div className='text-center'>
            <button className="bg-blue-800 border p-2 hover:ring-2 rounded-lg w-max px-5 py-2.5 overflow-hidden group relative hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative"></span>
              <Link to="/portfolio-registration"><h1>Create New Portfolio</h1></Link></button>
          </div>
          
          <div className="flex justify-center space-x-6 p-5">

            <div className=' flex m-10 p-5 border rounded-lg'>
              <h1 className='text-center p-6'>You Currently have {total_ports} portfolios.</h1>
              <h1 className="text-center p-6 border-l">You Currently have {total_props} properties.</h1>
            </div>
          </div>
          <div className='text-center w-full'>
            
            <div className='border rounded-lg '>{portfolio_list.length == 0 ? "You Need to Create a Portfolio" : portfolio_list}</div>
            
          </div>
      </div>
        
        
        
      </div>
    </div>
  )
};

export default OwnerHome;

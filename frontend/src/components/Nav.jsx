import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/way.png';

const NavLinks = ({location, isAuthOwner}) => {
    const logintab = () => {
        switch(location.pathname){
            case '/owner-login':
                return (isAuthOwner ? <></>:
                <li className="navlink sm:inline hover:underline">
                    <NavLink to="">Login/Register</NavLink>
                </li>
                )
        }
    };
   
    return (
        <div>
            <ul className='flex items-center space-x-5 px-5' >
            <li className="navlink sm:inline hover:underline">
                <NavLink to="/About">About Us</NavLink>
            </li>
            <li className="navlink sm:inline hover:underline">
                <NavLink to="">Services {isAuthOwner}</NavLink>
            </li>
            
            {

                logintab()
            }
            <li>
                <form className={"flex items-center bg-slate-100 rounded"}>
                    <input type="text" placeholder="Search A Property" className="bg-transparent text-slate-500 focus:outline-none"/>
                    <button type="submit">
                        <i className="text-slate-500 p-4 fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </li>
            
            </ul>
        </div>
    );
};

export default function Nav({isAuthOwner, setAuthOwner, isAuthTenant, setAuthTenant, isAuthManager, setAuthManager}) {
    const [isOpen, setIsOpen] = useState(true);

    const location = useLocation()

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


  return (
    <nav className="sticky text-white dark:bg-gray-800 top-0 z-50 py-3 backdrop-blur-lg border-b border-blue-700/80">
        <div className=" container px-4 mx-auto relative items-center w-screen">
            <div className="flex justify-center items-center">
                <div className="flex justify-center flex-shrink-0">
                    
                    <NavLink to="/">
                        <div className="flex ">
                            <img className='h-10' src={logo} alt="logo"></img>
                            <h1 className="font-bold text-sm sm:text-xl">
                                <span className="text-blue-300">WAY</span>
                                <span>POINT</span>
                            </h1>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center flex-shrink-0">
                    
                        <NavLinks hideNav="" isAuthOwner={isAuthOwner} location={location} toggleNavbar={toggleNavbar}/>
                    
                </div>
            </div>
            
        </div>
        

        
    </nav>
  )
}



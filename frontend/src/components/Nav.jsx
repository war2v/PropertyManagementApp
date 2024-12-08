import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const NavLinks = ({toggleNavbar}) => {
   
    return (
        <ul className="flex gap-3">
            <li className="sm:inline hover:underline">
                <NavLink to="/About">About</NavLink>
            </li>
            <li className="sm:inline hover:underline">
                <NavLink to="/SignIn">Sign-In</NavLink>
            </li>
            <li className={"sm:inline hover:underline"}>
                <NavLink to="/SignUp">Sign-Up</NavLink>
            

            </li>
            <li>
                <button onClick={toggleNavbar}>
                        <i className="fa-solid fa-grip-lines"></i>
                </button>
            </li>
            
        </ul>
    );
};

export default function Nav({setAuth, isAuth}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


  return (
    <nav className="bg-slate-800 shadow-md text-white p-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-2">
            <NavLink to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-red-300">Property</span>
                    <span>Managament</span>
                </h1>
            </NavLink>
           {
            isOpen ? (
                
                <NavLinks toggleNavbar={toggleNavbar}/>
                
                
                
    
            ) : (
                <div>
                    <button onClick={toggleNavbar}>
                        <i className="fa-solid fa-grip-lines"></i>
                    </button>
                </div>
            )
           }
           <form className={isAuth ? "flex items-center bg-slate-100 rounded" : "hide"}>
                <input type="text" placeholder="Search A Property" className="bg-transparent text-slate-500 focus:outline-none"/>
                <button type="submit">
                    <i className="text-slate-500 p-4 fa-solid fa-magnifying-glass"></i>
                </button>
            </form> 
            
        </div>
        
    </nav>
  )
}



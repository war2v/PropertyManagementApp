import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Nav from './components/Nav'



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/is-verify",{
        method: "POST",
        headers: {token: localStorage.token}
      });
      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      //console.log(parseRes);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Nav />
        
        <Routes>
          <Route 
            path="/"  
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<Navigate to="/SignIn" setAuth={setAuth}/>)}/>
          <Route 
            path="/SignIn" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignIn setAuth={setAuth}/>)}/>
          <Route 
            path="/SignUp" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignUp setAuth={setAuth}/>)}/>
          <Route 
            path="/Profile" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<Profile setAuth={setAuth}/>)}/>
          <Route 
            path="/About" 
            element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

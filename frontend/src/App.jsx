import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'
import TenantHome from './pages/tenant/TenantHome';
import OwnerHome from './pages/owner/OwnerHome';
import ManagerHome from './pages/owner/ManagerHome';
import Profile from './pages/Profile'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
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
        <Nav isAuth={isAuthenticated} setAuth={setAuth}/>
        
        <Routes>
          <Route 
            path="/"  
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<Navigate to="/SignIn" setAuth={setAuth}/>)}/>

          <Route 
            path="/tenant-home"  
            element={isAuthenticated ? (<TenantHome setAuth={setAuth}/>) : 
                                       (<Navigate to="/tenant-login" setAuth={setAuth}/>)}/>
          
          <Route 
            path="/owner-home"  
            element={isAuthenticated ? (<TenantHome setAuth={setAuth}/>) : 
                                       (<Navigate to="/tenant-login" setAuth={setAuth}/>)}/>
          <Route 
            path="/SignIn" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignIn setAuth={setAuth}/>)}/>
          <Route 
            path="/tenant-login" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignIn setAuth={setAuth} s_url="http://localhost:5000/auth/tenant-login" bottom_link="../tenant-registration" title="Tenant Login" submit_redirect="../tenant/TenantHome"/>)}/>

          <Route 
            path="/owner-login" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignIn setAuth={setAuth} s_url="http://localhost:5000/auth/owner-login" bottom_link="../owner-registration" title="Owner Login" submit_redirect="../owner/OwnerHome"/>)}/>

          <Route 
            path="/manager-login" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignIn setAuth={setAuth} s_url="http://localhost:5000/auth/manager-login" bottom_link="../manager-registration" title="Manager Login" submit_redirect="../owner/ManagerHome"/>)}/>
          <Route 
            path="/tenant-registration" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignUp setAuth={setAuth} s_url="http://localhost:5000/auth/tenant-registration" bottom_link="../tenant-login" title="Tenant Registration" submit_redirect="../tenant-login"/>)}/>  
          <Route 
            path="/owner-registration" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignUp setAuth={setAuth} s_url="http://localhost:5000/auth/owner-registration" bottom_link="../owner-login" title="Owner Registration" submit_redirect="../owner-login"/>)}/>
          <Route 
            path="/manager-registration" 
            element={isAuthenticated ? (<Home setAuth={setAuth}/>) : 
                                       (<SignUp setAuth={setAuth} s_url="http://localhost:5000/auth/manager-registration" bottom_link="../manager-login" title="Manager Registration" submit_redirect="../manager-login"/>)}/>                                                     

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

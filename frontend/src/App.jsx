import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About'
import LandingPage from './pages/LandingPage'
import TenantHome from './pages/tenant/TenantHome';
import OwnerHome from './pages/owner/OwnerHome';
import ManagerHome from './pages/owner/ManagerHome';
import Profile from './pages/Profile'
import LoginRouting from './pages/LoginRouting';
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Footer from './components/Footer';
import Nav from './components/Nav'
import CreatePortfolio from './pages/owner/CreatePortfolio';
import AddProperty from './pages/owner/AddProperty';
import DisplayPortfolio from './pages/owner/DIsplayPortfolio';
import AllPropsInPort from './pages/owner/AllPropsInPort';



export default function App() {
 
  const [isAuthenticatedOwner, setIsAuthenticatedOwner] = useState(false)
  const setAuthOwner = boolean => {
    setIsAuthenticatedOwner(boolean);
  };

  const [isAuthenticatedTenant, setIsAuthenticatedTenant] = useState(false)
  const setAuthTenant = boolean => {
    setIsAuthenticatedTenant(boolean);
  };
  const [isAuthenticatedManager, setIsAuthenticatedManager] = useState(false)
  const setAuthManager = boolean => {
    setIsAuthenticatedManager(boolean);
  };

  async function isAuthOwner() {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/is-verify-owner",{
        method: "POST",
        headers: {token: localStorage.token}
      });
      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticatedOwner(true) : setIsAuthenticatedOwner(false);
      //console.log(parseRes);
    } catch (err) {
      console.log(err);
    }
  }

  async function isAuthTenant() {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/is-verify-tenant",{
        method: "POST",
        headers: {token: localStorage.token}
      });
      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticatedTenant(true) : setIsAuthenticatedTenant(false);
      //console.log(parseRes);
    } catch (err) {
      console.log(err);
    }
  }

  async function isAuthManager() {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/is-verify-manager",{
        method: "POST",
        headers: {token: localStorage.token}
      });
      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticatedManager(true) : setIsAuthenticatedManager(false);
      //console.log(parseRes);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    isAuthOwner();
  });

  useEffect(() => {
    isAuthTenant();
  });

  useEffect(() => {
    isAuthManager();
  });

  return (
    <Fragment>
      <BrowserRouter>
        <Nav isAuthOwner={isAuthenticatedOwner} setAuthOwner={setAuthOwner}
             isAuthTenant={isAuthenticatedTenant} setAuthTenant={setAuthTenant}
             isAuthManager={isAuthenticatedManager} setAuthManager={setAuthManager}/>
        <div className="bg-blue-300 h-max text-white">
          <Routes>

            <Route
              path="/"
              element={<LandingPage/>}/>

            <Route 
              path="/login-routing"  
              element={<LoginRouting/>}/> 
              
            <Route 
              path="/tenant-home"  
              element={isAuthenticatedTenant ? (<TenantHome setAuth={setAuthTenant}/>) : 
                                        (<Navigate to="/tenant-login" setAuth={setAuthTenant}/>)}/>
            
            <Route 
              path="/owner-home"  
              element={isAuthenticatedOwner ? (<OwnerHome setAuth={setAuthOwner}/>) : 
                                        (<Navigate to="/owner-login" setAuth={setAuthOwner}/>)}/>
        
            <Route 
              path="/tenant-login" 
              element={isAuthenticatedTenant ? (<Navigate to='/tenant-home'/>) : 
                                        (<SignIn setAuth={setAuthTenant} s_url="http://localhost:5000/auth/tenant-login" bottom_link="../tenant-registration" title="Tenant Login" submit_redirect="../tenant/TenantHome"/>)}/>

            <Route 
              path="/owner-login" 
              element={isAuthenticatedOwner ? (<Navigate to="/owner-home"/>) : 
                                        (<SignIn setAuth={setAuthOwner} s_url="http://localhost:5000/auth/owner-login" bottom_link="../owner-registration" title="Owner Login" submit_redirect="../owner/OwnerHome"/>)}/>

            <Route 
              path="/manager-login" 
              element={isAuthenticatedManager ? (<Navigate to="/manager-home"/>) : 
                                        (<SignIn setAuth={setAuthManager} s_url="http://localhost:5000/auth/manager-login" bottom_link="../manager-registration" title="Manager Login" submit_redirect="../owner/ManagerHome"/>)}/>
            <Route 
              path="/tenant-registration" 
              element={isAuthenticatedTenant ? (<Navigate to='/tenant-home'/>) : 
                                        (<SignUp setAuth={setAuthTenant} s_url="http://localhost:5000/auth/tenant-registration" bottom_link="../tenant-login" title="Tenant Registration" submit_redirect="../tenant-login"/>)}/>  
            <Route 
              path="/owner-registration" 
              element={isAuthenticatedOwner ? (<Navigate to="/owner-home"/>) : 
                                        (<SignUp setAuth={setAuthOwner} s_url="http://localhost:5000/auth/owner-registration" bottom_link="../owner-login" title="Owner Registration" submit_redirect="../owner-login"/>)}/>
            <Route 
              path="/manager-registration" 
              element={isAuthenticatedManager ? (<Navigate to="/manager-home"/>) : 
                                        (<SignUp setAuth={setAuthManager} s_url="http://localhost:5000/auth/manager-registration" bottom_link="../manager-login" title="Manager Registration" submit_redirect="../manager-login"/>)}/>                                                     

            <Route 
              path="/portfolio-registration" 
              element={isAuthenticatedOwner ? (<CreatePortfolio setAuth={setAuthOwner} submit_redirect={"/owner-home"}/>) : 
              (<Navigate to="/owner-login" setAuth={setAuthOwner}/>)}/>

            <Route
            path="/property-registration/:p_name"
            element={isAuthenticatedOwner ? (<AddProperty setAuth={setAuthOwner} submit_redirect="/owner-home"/>) : 
            (<Navigate to="/owner-login" setAuth={setAuthOwner}/>)}/>

            <Route
            path="/portfolio/:p_name"
            element={isAuthenticatedOwner ? (<DisplayPortfolio/>) : (<Navigate to="/owner-login" setAuth={setAuthOwner}/>)}/>

            <Route 
            path="/portfolios"
            element={isAuthenticatedOwner || isAuthenticatedManager ? (<AllPropsInPort/>) : (<Navigate to="/owner-login" setAuth={setAuthOwner}/>)}
            
            />

            <Route 
              path="/About" 
              element={<About/>}/>
          </Routes>
        <Footer/>
        </div>
      </BrowserRouter>
    </Fragment>
  )
}

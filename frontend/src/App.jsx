import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Nav from './components/Nav'



export default function App() {
  return (
    <div className="bg-slate-800 h-screen">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/About" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

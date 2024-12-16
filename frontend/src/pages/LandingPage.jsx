import React from 'react'
import Hero from '../components/Hero';
import bgimage from "../assets/house.jpg"

const LandingPage = ({setAuth}) => {
  return (
    <section className="lp text-center p-5 bg-cover bg-center h-screen">
      <Hero/>
    </section>
    
  );
};

export default LandingPage;

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import house from "../assets/house.jpg"

export default function Hero() {
  return (
    <Fragment>
      <div className="flex justify-center py-4 my-4">
        <div className="py-4">
            <h1 className="text-5xl">Manage Your Properties With <br></br> Ease of Mind.</h1>
            <p className="text-xl">
                Waypoint assists property owners and managers by using AI to automate 
            </p>
            <p className="text-xl">
                tedious tasks and allows tenants to find beautiful propertiesto forge 
            </p>
            <p className="text-xl">
                their lives in.
            </p>
            
            <button className="my-5 text-white bg-blue-600 hover:animate-pulse focus:ring-4 focus:outline-none focus:ring-blue -300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2">
                <Link to='./owner-login'>Manage Your Properties</Link>
            </button>
        </div>

      </div>
      <div className='flex justify-center py-4 my-4'>
        <div className="py-4">
            <h1 className="text-5xl">
                Find Your Next Home
            </h1>
            <p className="text-xl">
                View Avaiable Houses in your area. 
            </p>
            <p className="text-xl">
                View managers and owners plus their reviews and ratings.
            </p>
            <button className="my-5 text-white bg-blue-600 hover:animate-pulse focus:ring-4 focus:outline-none focus:ring-blue -300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2">
                <Link to="./tenant-login">Find a Home</Link>
            </button>
        </div>
      </div>
      
    </Fragment>
  )
}

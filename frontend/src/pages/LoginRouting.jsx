import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRouting() {
  return (
    <div className="flex justify-center">
        <button><Link className="my-5 text-white bg-blue-600 hover:animate-pulse focus:ring-4 focus:outline-none focus:ring-blue -300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2" to="/owner-login">Owner Login</Link></button>
        <button><Link className="my-5 text-white bg-blue-600 hover:animate-pulse focus:ring-4 focus:outline-none focus:ring-blue -300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2" to="/manager-login">Manager Login</Link></button>
        <button><Link className="my-5 text-white bg-blue-600 hover:animate-pulse focus:ring-4 focus:outline-none focus:ring-blue -300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2" to="/tenant-login">Tenant Login</Link></button>
    </div>
  )
}

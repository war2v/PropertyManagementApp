import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-blue-300 text-white py-4 h-full border-2 justify-center">
        <table className="m-auto text-center table-auto">
            <thead>
                <tr>
                    <th>
                        <h1 className="p-4">About Us</h1>
                    </th>
                    <th>
                        <h1 className="p-4">Services</h1>
                    </th>
                    <th>
                        <h1 className="p-4">Contact Us</h1>
                    </th>
                    <th>
                        <h1 className="p-4">Social Media</h1>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-4 hover:underline"><Link>Our Story</Link></td>
                    <td className="px-4 hover:underline"><Link>Automation</Link></td>
                    <td className="px-4 hover:underline"><Link>Support</Link></td>
                    <td className="px-4 hover:underline"><Link>X</Link></td>
                </tr>
                <tr>
                    <td className="px-4 hover:underline"><Link>Future Plans</Link></td>
                    <td className="px-4 hover:underline"><Link>Property Management</Link></td>
                    <td className="px-4 hover:underline"></td>
                    <td className="px-4 hover:underline"><Link>Instagram</Link></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import SideNav from '../../components/SideNav';

export default function DisplayPortfolio() {
    const {p_name} = useParams();
    const [property_list, setPropList] = useState([])
    async function getProperties(){
        try {
            const prop_list = [];
            const response = await fetch("http://localhost:5000/dashboard/properties",{
                method: "GET",
                headers: { token: localStorage.token, p_name: p_name }
            });

            const parseRes = await response.json();
            //console.log(parseRes);
            for(let i=0; i<parseRes.length; i++){
                prop_list.push(
                    <tr>
                            <td className="bg-blue-300 border border-t">{parseRes[i].id}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i]._address}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].city}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i]._state}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].zip}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].country}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].property_type}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].property_style}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].bedrooms}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].bathrooms}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].square_feet}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].lot_size}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].year_build}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].market_value}</td>
                            <td className="bg-blue-300 border border-l border-t px-2">{parseRes[i].purchase_date}</td>
                            <td className="bg-blue-400 border border-l border-t px-2">{parseRes[i].description}</td>
                    </tr>
                        
                );
            }
            setPropList(prop_list);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProperties();
    }, []);

  return (
    <div className="flex">
        <SideNav/>
        <div className='w-screen'>
            
                <table className='m-4 py-4 bg-blue-400 border border-white p-2 space-x-2 rounded-sm'>
                    <tr >
                        <th colSpan="16">{p_name}</th>
                    </tr>
                    <tr className='space-x-2 border-t'>
                            <th>Property ID</th>
                            <th className="border-l px-2">Address</th>
                            <th className="border-l px-2">City</th>
                            <th className="border-l px-2">State</th>
                            <th className="border-l px-2">Zip</th>
                            <th className="border-l px-2">Country</th>
                            <th className="border-l px-2">Property Type</th>
                            <th className="border-l px-2">Property Style</th>
                            <th className="border-l px-2">Bedrooms</th>
                            <th className="border-l px-2">Bathrooms</th>
                            <th className="border-l px-2">Square Feet</th>
                            <th className="border-l px-2">Lot Size</th>
                            <th className="border-l px-2">Year Build</th>
                            <th className="border-l px-2">Market Value</th>
                            <th className="border-l px-2">Purchase Date</th>
                            <th className="border-l px-2">Description</th>
                    </tr>
                    {property_list.length > 0 ? <tr className="border-t"><td colSpan="16" className='text-center'>"No Properties Added"</td></tr>: property_list}
                    <tr className="border-t">
                        <th colSpan="16">
                        <button 
                            className="hover:bg-blue-300 bg-blue-700 text-white rounded-lg px-4 p-2 m-2 border w-max self-center"
                            type="submit" 
                            value="Submit"
                            id="sign-up-button">
                            <Link to="/owner-home"> 
                                Back to Dashboard
                            </Link>
                        </button>
                        </th>
                    </tr>
                </table>
            
        </div>
        
    </div>

  )
}

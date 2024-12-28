import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

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
                    <div className="flex justify-center">
                        <div className='flex py-4 bg-blue-400 space-x-4 rounded-sm'>
                            <div>{parseRes[i].id}</div>
                            <div>{parseRes[i]._address}</div>
                            <div>{parseRes[i].city}</div>
                            <div>{parseRes[i]._state}</div>
                            <div>{parseRes[i].zip}</div>
                            <div>{parseRes[i].country}</div>
                            <div>{parseRes[i].property_type}</div>
                            <div>{parseRes[i].property_style}</div>
                            <div>{parseRes[i].bedrooms}</div>
                            <div>{parseRes[i].bathrooms}</div>
                            <div>{parseRes[i].square_feet}</div>
                            <div>{parseRes[i].lot_size}</div>
                            <div>{parseRes[i].year_build}</div>
                            <div>{parseRes[i].market_value}</div>
                            <div>{parseRes[i].purchase_date}</div>
                            <div>{parseRes[i].description}</div>
                        </div>
                    </div>
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
    <div>
        <div className='text-center'>
            {p_name}
            {property_list}
        </div>
    </div>

  )
}

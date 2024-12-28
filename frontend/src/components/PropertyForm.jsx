import React from 'react';
import { useState, useEffect } from 'react';

export default function PropertyForm({p_name, submit_redirect}) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertyStyle, setPropertyStyle] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [squareFt, setSquareFt] = useState("");
    const [lotSize, setLotSize] = useState("");
    const [yearBuild, setYearBuild] = useState("");
    const [marketValue, setMarketValue] = useState(0);
    const [purchaseDate, setPurchaseDate] = useState("");
    const [description, setDescription] = useState("");

    const stateOptions = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'DC', label: 'District Of Columbia' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
      ];

      const handleStateChange = (e) => {
        setState(e.target.value);
      };


      const propTypeOptions = [
        { value: 'Con-Condo', label: 'Con-Condo' },
        { value: 'Bare Land Condo', label: 'Bare Land Condo' },
        { value: 'Comercial', label: 'Comercial' },
        { value: 'other', label: 'other' }
      ];

      const handlePropTypeChange = (e) => {
        setPropertyType(e.target.value);
      };

      const propStyleOptions = [
        { value: 'Duples', label: 'Duples' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Carriage Style', label: 'Carriage Style' },
        { value: 'Low-Rise', label: 'Low-Rise' }
      ];

      const handlePropStyleChange = (e) => {
        setPropertyStyle(e.target.value);
      };

      

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = {p_name, address, city, state, zip, country, propertyType, propertyStyle, bedrooms, bathrooms, squareFt, lotSize, yearBuild, marketValue, purchaseDate, description};
          const response = await fetch("http://localhost:5000/dashboard/create-property",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
          const parseRes = await response.json();
          console.log(parseRes.token);
          localStorage.setItem("token", parseRes.token);
          navigate(submit_redirect);
        } catch (err) {
          console.error(err)
        }
    }
    
  return (
    <form onSubmit={onSubmitForm} className="text-black">
        <h1 Htmlfor='p_name'>Adding Property to <span className="font-bold">{p_name}</span></h1>
        

        <div>
            <label for='address'>Address</label>
            <input 
                className='my-4 px-2.5 mx-4 py-2.5'
                type="text"
                name='address'
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Enter Address'
            >
            </input>
        </div>
        

        <div>
            <label for='city'>City</label>
            <input 
                className='my-4 px-2.5 mx-4 py-2.5'
                type="text"
                name='city'
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter City'
            >
            </input>
        </div>
        

        <div>
            <label for='state'>State</label>
            <select value={state} onChange={handleStateChange} >
                {stateOptions.map((option) => (
                    <option key={stateOptions.value} value={stateOptions.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p>Selected: {state}</p>
        </div>
        
        
        <div>
            <label for='zip'>Zip</label>
            <input 
                className='my-4 px-2.5 mx-4 py-2.5'
                onChange={(e) => setZip(e.target.value)}
                type="number"
                name='zip'
                placeholder='Enter Zip'
            >
            </input>
        </div>
        
        
        <div>
            <label for='country'>Country</label>
            <input 
                className='my-4 px-2.5 mx-4 py-2.5'
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name='country'
                placeholder='Enter Country'
                required
            ></input>
        </div>
        
        
        <div>
            <label for='property_type'>Property Type</label>
            <select value={propertyType} onChange={handlePropTypeChange} >
                {propTypeOptions.map((option) => (
                    <option key={propTypeOptions.value} value={propTypeOptions.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p>Selected: {propertyType}</p>
           
        </div>

        
        <div>
            <label for='property_style'>Property Style</label>
            <select value={propertyStyle} onChange={handlePropStyleChange} >
                {propStyleOptions.map((option) => (
                    <option key={propStyleOptions.value} value={propStyleOptions.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p>Selected: {propertyStyle}</p>
        </div>

        <div>
            <label for='bedrooms'>Bedrooms</label>
            <input 
                type="number"
                onChange={(e) => setBedrooms(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='bedrooms'
                placeholder='Enter Bedrooms'
                required
            ></input>
        </div>

        <div>
            <label for='bathrooms'>Bathrooms</label>
            <input 
                step="0.01"
                type="number"
                onChange={(e) => setBathrooms(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='bathrooms'
                placeholder='Enter Bathrooms'
                required
            ></input>
        </div>

        <div>
            <label for='square_Feet'>Square Feet</label>
            <input 
                type="number"
                step="0.01"
                onChange={(e) => setSquareFt(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='square_feet'
                placeholder='Enter Square Feet'
                required
            ></input>
        </div>  

        <div>
            <label for='lot_size'>Lot Size</label>
            <input 
                type="number"
                step="0.01"
                onChange={(e) => setLotSize(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='lot_size'
                placeholder='Enter Acres'
                required
            ></input> 
        </div>

        <div>
            <label for='year_build'>Year Built</label>
            <input 
                type="date"
                onChange={(e) => setYearBuild(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='year_build'
                placeholder='Enter Year Built'
                required
            ></input>
        </div>

        <div>
            <label for='market_value'>Market Value</label>
            <input
                type="number" 
                onChange={(e) => setMark(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='market_value'
                placeholder='Enter Market Value'
                required
            ></input>
        </div>

        <div>
            <label for='description'>Description</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className='my-4 px-2.5 mx-4 py-2.5'
                name='description'
                placeholder='Enter Description'
                required
            ></input>
        </div>

        <button className='"hover:bg-slate-300 rounded px-4 p-2 mt-4 border w-max self-center'>Add Property</button>
    </form>
    
  )
}

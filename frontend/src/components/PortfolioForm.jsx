import {React, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function PortfolioForm({submit_redirect}) {
  const navigate = useNavigate();
    const [owner1, setOwner1] = useState('');
    
    async function getEmail () {
      try {
        const response = await fetch("http://localhost:5000/dashboard/create-portfolio",{
          method: "GET",
          headers: { token: localStorage.token }
        });

        const parseRes = await response.json();
        setOwner1(parseRes.email)
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() =>{
      getEmail();
    });

    const [name, setName] = useState("");
    const [owner2, setOwner2] = useState('');
    const [owner3, setOwner3] = useState('');
    const [owner4, setOwner4] = useState('');
    const [owner5, setOwner5] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
        }, [name, owner1, owner2, owner3, owner4, owner5])

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = {name, owner1,owner2, owner3, owner4, owner5};
          const response = await fetch("http://localhost:5000/dashboard/create-portfolio",{
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
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col text-black items-center p-4 m-4 bg-slate-100 border rounded">
        <h1>Create Portfolio</h1>
        <form onSubmit={onSubmitForm} className="flex flex-col text-black bg-slate-100 w-96">
          <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="name" 
            onChange={(e) => setName(e.target.value)}
            placeholder="Portfolio Name" 
            id='name'
            autoComplete='off'
            aria-describedby='uidnote'
            required
          />

          1. <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="owner1" 
            value={owner1}
            placeholder="owner email" 
            aria-describedby = "pwdnote"
            disabled
          />
          2. <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="owner2" 
            onChange={(e) => setOwner2(e.target.value)}
            placeholder="owner email" 
            aria-describedby = "pwdnote"
            
          />
          3. <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="owner3" 
            onChange={(e) => setOwner3(e.target.value)}
            placeholder="owner email" 
            aria-describedby = "pwdnote"
          
          />

          4. <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="owner4" 
            placeholder="owner email" 
            aria-describedby = "pwdnote"
            onChange={(e) => setOwner4(e.target.value)}
            
          />
          5. <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="owner5" 
            placeholder="owner email" 
            aria-describedby = "pwdnote"
            onChange={(e) => setOwner5(e.target.value)}
            
          />
          <button 
            className="hover:bg-slate-300 rounded px-4 p-2 mt-4 border w-max self-center"
            type="submit" 
            value="Submit"
            id="sign-up-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

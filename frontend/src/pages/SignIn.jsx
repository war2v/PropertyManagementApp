import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,25}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = ({setAuth}) => {
  const userRef = useRef();
  const errRef = useRef();


  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('');

 


useEffect(() => {
  setErrMsg('');
}, [username, password])


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {username, password};
      const response = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      console.log(parseRes);
      setAuth(true)
      window.location = "/";
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className="flex flex-col items-center m-4 p-4 border h-screen">
      <div className="flex flex-col items-center p-4 bg-slate-100 rounded">
        <h1>Sign-In</h1>
        <p ref={errRef} className={errMsg ? "errmsg" : "hide"}></p>
        <form onSubmit={onSubmitForm} className="flex flex-col text-black bg-slate-100 w-96">
          <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="text" 
            name="username" 
            placeholder="username" 
            onChange={(e) => setUsername(e.target.value)}
            id='username'
            ref={userRef}
            autoComplete='off'
            aria-describedby='uidnote'
            required
          />

          <input 
            className="bg-slate-100 focus:outline-none p-2 mt-4 border" 
            type="password" 
            name="password1" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby = "pwdnote"
            required
          />
          <button 
            className="rounded p-2 mt-4 border w-max self-center"
            type="submit" 
            value="Submit"
            id="sign-up-button">
            Submit
          </button>
        </form>
        <div>
            <p className="font-bold">Need An Account? <Link className="text-blue-400" to={"../SignUp"}>register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn;

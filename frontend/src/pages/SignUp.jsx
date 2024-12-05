import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,25}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUp = ({setAuth}) => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() =>{
    userRef.current.focus();
  }, [])

  useEffect(() =>{
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidName(result);
  }, [username])

  useEffect(() =>{
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() =>{
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match)
    
    console.log(`valid match password: ${validMatchPassword}`)
    console.log(`match: ${match}`)
  }, [password, matchPassword])


useEffect(() => {
  setErrMsg('');
}, [username, password, matchPassword])


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {username, email, password};
      const response = await fetch("http://localhost:5000/auth/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      console.log(parseRes)
      window.location = "/SignIn";
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className="flex flex-col items-center m-4 p-4 border h-screen">
      <div className="flex flex-col items-center p-4 bg-slate-100 rounded">
        <h1>Sign-Up</h1>
        <p ref={errRef} className={errMsg ? "errmsg" : "hide"}></p>
        <form onSubmit={onSubmitForm} className="flex flex-col text-black bg-slate-100 w-96">
          <label htmlFor='username'>
            <p id='uidnote' className={userFocus && username && !validName ? "instructions" : "hide"}>
            4 - 24 characters<br/>
            Must begin with letters <br/>
            Letters, numbers, underscores, and hyphens allowed.
            </p>
            <span className={validName ? "text-green-400" : "fakehide"}>
              <i className="fa-solid fa-circle-check"></i>
            </span>
          </label>
          <input 
            className="bg-slate-100 focus:outline-none p-2 border" 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)}
            id='username'
            ref={userRef}
            autoComplete='off'
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            required
          />
          <label htmlFor='email'>
            <p id='uidnote' className={emailFocus && email && !validEmail ? "instructions" : "hide"}>
                Please enter a valid email.
            </p>
            <span className={validEmail? "text-green-400" : "fakehide"}>
              <i className="fa-solid fa-circle-check"></i>
          </span>
          </label>
          <input 
            className="bg-slate-100 focus:outline-none p-2 border" 
            type="text" 
            name="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value) }
            id='email'
            autoComplete='off'
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            required
            />

            <label htmlFor='password'>
              <span className={validPassword ? "text-green-400" : "fakehide"}>
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <p id='uidnote' className={passwordFocus && !validPassword ? "instructions" : "hide"}>
                one lowercase letter.
                one uppercase letter.
                one digit.
                one special character (!@#$%).
            </p>
            </label>
          <input 
            className="bg-slate-100 focus:outline-none p-2 border" 
            type="password" 
            name="password1" 
            placeholder="Confirm Password" 
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid = {validPassword ? "false" : "true"}
            aria-describedby = "pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlurCapture={() => setPasswordFocus(false)}
            required
          />

          <label htmlFor='password2'>
            <span className={validMatchPassword && password != '' ? "text-green-400" : "fakehide"}>
              <i className="fa-solid fa-circle-check"></i>
            </span>
            <p id='uidnote' className={matchPasswordFocus && !validMatchPassword ? "instructions" : "hide"}>
              Must match previous entry.
            </p>
          </label>
          <input 
            className="bg-slate-100 focus:outline-none p-2 border"
            type="password" 
            name="password2" 
            placeholder="Password Repeat"
            onChange={(e) => setMatchPassword(e.target.value)}
            aria-invalid = {validMatchPassword ? "false" : "true"}
            aria-describedby = "pwdnote"
            onFocus={() => setMatchPasswordFocus(true)}
            onBlurCapture={() => setMatchPasswordFocus(false)}
            required
          />
          <button 
            className={!validName || !validEmail || !validPassword ? "hide" : "rounded p-2"}
            type="submit" 
            value="Submit"
            id="sign-up-button">
            Submit
          </button>
        </form>
        <div>
            <p className="font-bold">Have An Account? <Link className="text-blue-400" to={"../SignIn"}>Sign in here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp;

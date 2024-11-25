import React from 'react'

export default function SignUp() {
  return (
    <div className="flex flex-col items-center m-4 p-4">
      <div className="flex flex-col p-4 bg-slate-100 rounded">
        <h1>Sign-Up Form</h1>
        <form className="flex flex-col text-black bg-slate-100 w-96">
          <input className="bg-slate-100 focus:outline-none p-2" type="text" name="username" placeholder="username"/>
          <input className="bg-slate-100 focus:outline-none p-2" type="text" name="email" placeholder="email"/>
          <input className="bg-slate-100 focus:outline-none p-2" type="text" name="password1" placeholder="password"/>
          <input className="bg-slate-100 focus:outline-none p-2"type="text" name="password1" placeholder="password repeat"/>
          <button className="rounded p-2" type="submit" value="Submit" id="sign-up-button" className="rounded p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

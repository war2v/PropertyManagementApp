import React, {useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom'
import Registration from '../../components/Registration';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,25}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUp = ({setAuth, s_url, bottom_link, title, submit_redirect}) => {

  return (
    
      <Fragment>
        <Registration setAuth={setAuth} s_url={s_url} bottom_link={bottom_link} title={title} submit_redirect={submit_redirect}/>
      </Fragment>
    
  )
}

export default SignUp;

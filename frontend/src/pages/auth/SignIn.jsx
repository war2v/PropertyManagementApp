import { Fragment } from 'react';
import LoginForm from '../../components/LoginForm'

const SignIn = ({setAuth, s_url, bottom_link, title}) => {
  return (
    <Fragment>
      <LoginForm setAuth={setAuth} s_url={s_url} bottom_link={bottom_link} title={title}/>
    </Fragment>
  )
}

export default SignIn;

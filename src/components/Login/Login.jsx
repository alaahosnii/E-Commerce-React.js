import React from 'react'
import LoginForm from '../LoginForm/LoginForm'
import loginImage from "../../assets/signup_img.png"

const Login = () => {
  return (
    <div className='mt-3'>
      <div className='d-flex align-items-center'>
        <img src={loginImage} className='col-6' height={"560px"} />
        <div className='col-2'></div>
        <div className='col-4'>
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>
          <LoginForm />
        </div>

      </div>
    </div>)
}

export default Login
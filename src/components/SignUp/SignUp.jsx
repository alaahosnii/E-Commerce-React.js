import React from 'react'
import signupImage from '@/assets/signup_img.png'
import SignUpForm from '../SignUpForm/SignUpForm'
function SignUp() {
  return (
    <div className='mt-3'>
      <div className='d-flex align-items-center'>
        <img src= {signupImage} className='col-6' height={"560px"}/>
        <div className='col-2'></div>
        <div className='col-4'>
          <h2>Create an Account</h2>
          <SignUpForm />
        </div>

      </div>
    </div>
  )
}

export default SignUp
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import UserDetailsForm from '../UserDetailsForm/UserDetailsForm';

function Account() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  return (
    <div >
      <div className='d-flex justify-content-between container mt-4'>
        <div className='d-flex gap-2 '>
          <div onClick={() => navigate("/")} className='homeNav'>Home</div>
          <div style={{ color: "grey" }}>/</div>
          <div>Account</div>
        </div>
        <div className='d-flex gap-1'>
          <p className='mb-0'>Welcome!</p>
          <p className='mb-0 fw-bold text-danger'>{user && user.name}</p>
        </div>
      </div>
      <div className='container d-flex mt-5 justify-content-center' style={{ height: "100vh" }}>
        <UserDetailsForm />

      </div>

    </div>
  )
}

export default Account
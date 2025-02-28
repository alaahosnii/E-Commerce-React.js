import React, { useEffect, useState } from 'react'
import paymentSuccess from "@/assets/payment_success.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartToDataBase } from '@/redux/slices/CartSlice';
import { toast } from 'react-toastify';
import { getLoggedInUser } from '../../redux/slices/AuthSlice';
function PaymentSuccess() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = toast.loading("Redirecting to Home Page ...", {
      autoClose: 5000
    });
    dispatch(addCartToDataBase({
      products: [],
      totalPrice: 0,
      totalQuantity: 0
    }));

    setTimeout(() => {
      toast.dismiss(id);
      navigate("/");
    }, 5000);
  }, [])
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "80vh" }}>
      <img src={paymentSuccess} height={"300px"} width={"300px"} />
      <div className='d-flex gap-2'>
        <h3 className='mb-0 mt-3'>Congrats </h3>
        <h3 className='mb-0 mt-3 text-danger'>{authState.user && authState.user.name}</h3>
        <h3 className='mb-0 mt-3'>Your Payment was successful</h3>
      </div>
    </div>
  )
}

export default PaymentSuccess
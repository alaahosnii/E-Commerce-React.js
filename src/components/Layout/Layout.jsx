import React, { useEffect, useState } from 'react'
import Header from '@/Header/Header'
import Footer from '@/Footer/Footer'
import { Outlet } from 'react-router-dom'
import NavComponent from '@/NavComponent/NavComponent'
import Spacer from '@/Spacer/Spacer'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '@/redux/slices/AuthSlice'
import { addCartToDataBase, chagngeIsAddToLocalCart, getCartFromDB, resetActionToChangeCart, setCartFromDB } from '@/redux/slices/CartSlice'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-toastify'
function Layout() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  console.log(cartState.localCart);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getLoggedInUser());
      dispatch(getCartFromDB());

    }
  }, []);

  useEffect(() => {
    if (authState.getLoggedInUserError) {
      toast.error(authState.getLoggedInUserError);
    }
  }, [authState.getLoggedInUserError])
  useEffect(() => {
    console.log(cartState.isAddToLocalCart);

    if ((cartState.isAddToLocalCart || cartState.actionToChangeCart) && cartState.localCart.products.length > 0) {
      dispatch(addCartToDataBase({
        products: cartState.localCart.products,
        totalQuantity: cartState.localCart.totalQuantity,
        totalPrice: cartState.localCart.totalPrice
      }));
      if (cartState.actionToChangeCart) {
        dispatch(resetActionToChangeCart());
      }
    }
  }, [cartState.localCart]);

  useEffect(() => {
    console.log("cartState.addCartToDBSuccess", cartState.addCartToDBSuccess);

    if (cartState.addCartToDBSuccess) {

      dispatch(getCartFromDB());
    }
  }, [cartState.addCartToDBSuccess]);

  return (
    <div className='main-layout'>
      <Header />
      <div className='container'>
        <NavComponent />
      </div>
      <Spacer direaction={"horizontal"} />
      <div className='min-vh-100'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
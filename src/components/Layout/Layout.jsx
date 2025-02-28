import React, { useEffect } from 'react'
import Header from '@/components/Header/Header.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import NavComponent from '@/components/NavComponent/NavComponent.jsx'
import Spacer from '@/components/Spacer/Spacer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '@/redux/slices/AuthSlice'
import { addCartToDataBase, getCartFromDB, resetActionToChangeCart } from '@/redux/slices/CartSlice'
import { toast } from 'react-toastify'
function Layout() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  console.log(cartState.localCart);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      console.log("logged");
      
      dispatch(getLoggedInUser());

    }
  }, [])

  useEffect(() => {
    console.log("sss");

    if (authState.token) {
      console.log("token", authState.token);

      // dispatch(getLoggedInUser());
      dispatch(getCartFromDB());

    }
  }, [authState.token]);

  useEffect(() => {
    if (authState.getLoggedInUserError) {
      toast.error(authState.getLoggedInUserError);
    }
  }, [authState.getLoggedInUserError])
  useEffect(() => {
    console.log(cartState.isAddToLocalCart);

    if ((cartState.isAddToLocalCart || cartState.actionToChangeCart) && cartState.localCart.products.length >= 0) {
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
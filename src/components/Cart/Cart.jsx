import React, { useState } from 'react'
import styles from './Cart.module.css'
import CartItem from '../CartItem/CartItem'
import CartSummary from '../CartSummary/CartSummary'
import { useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/CartSlice'
function Cart() {
  const cartState = useSelector((state) => state.cart);
  const cartProducts = cartState.products;
  console.log(cartState);

  return (
    <div className={`${styles.mainWrapper}`}>
      <div className={`${styles.mainContent} d-flex flex-column mt-5 align-items-center`}>
        <div className='shadow p-3 mb-5 bg-white rounded w-100 d-flex'>
          <div className='col-3 text-center'>Product</div>
          <div className='col-3 text-center'>Price</div>
          <div className='col-3 text-center'>Quantity</div>
          <div className='col-3 text-center'>Subtotal</div>
        </div>
        {
          cartProducts.length != 0 ? cartProducts.map((product) => <CartItem key={product.id} product={product} />)
            : <div>No Products</div>
        }

        <CartSummary />
      </div>
    </div>

  )
}

export default Cart
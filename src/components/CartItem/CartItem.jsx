import React, { useContext, useState } from 'react'
import cartProduct from '@/assets/cart_product.png'
import styles from './CartItem.module.css'
import { changeQuantity, deleteFromCart } from '../../redux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function CartItem({ product }) {
  // let cartState = useSelector((state) => state.cart);
  // const { userCart } = useContext(ProductsInCartContext);
  const cartState = useSelector((state) => state.cart);
  // console.log(userCart);
  
  const quantity = cartState.localCart.products.find((cartProduct) => cartProduct.id == product.id).quantity;
  console.log(`quantity ${quantity}`)

  const dispatch = useDispatch();
  const handleQuantity = (e) => {
    console.log(e.target.value)
    console.log(product.id);
    console.log(parseInt(e.target.value));
    console.log(product.price);
    
    
    dispatch(changeQuantity({
      id: product.id,
      quantity: parseInt(e.target.value),
      basePrice: product.price
    }))
  }


  const deleteProduct = (id) => {
    dispatch(deleteFromCart({ id: product.id }));
  }
  return (
    <div className='shadow p-4 mb-5 bg-white rounded w-100 d-flex align-items-center'>
      <div className='col-3 text-center d-flex align-items-center justify-content-center'>
        <div className='d-flex w-75 align-items-center'>
          <div className='position-relative' >
            <img className='me-3' src={cartProduct} width={"40px"} height={"30px"} />
            <div onClick={() => deleteProduct(product.id)} className="btn text-white position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
              X
            </div>
          </div>
          <p className={`${styles.p} mb-0`}>{product.name}</p>
        </div>

      </div>
      <div className='col-3 text-center'>
        <p className={`${styles.p} mb-0`}> {`$${product.price.toFixed(2)}`} </p>
      </div>
      <div className='col-3 text-center'>
        <input type='number' min={1} className={`${styles.input}`} onChange={handleQuantity} value={quantity} />
      </div>
      <div className='col-3 text-center'>
        <p className={`${styles.p} mb-0`}>{`$${product.subTotalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default CartItem
import React from 'react'
import Spacer from '../Spacer/Spacer'
import { useSelector } from 'react-redux';

function CartSummary() {
  const cartState = useSelector((state) => state.cart);
  const cartProducts = cartState.products;
  const total = cartState.totalPrice;
  return (
    <div className='ms-auto border border-1 p-3 border-black rounded col-4'>
      <h6 className='mb-0'>Cart Total</h6>
      <div className='mt-3'>
        <div className='mb-2 text-secondary d-flex justify-content-between' style={{ fontSize: "13px" }}>
          <div>Sub Total:</div>
          <div>{`$${total.toFixed(2)}`}</div>
        </div>
        <Spacer direaction={"horizontal"} />
        <div className='mt-2 mb-2 text-secondary d-flex justify-content-between' style={{ fontSize: "13px" }}>
          <div>Shipping:</div>
          <div>$0</div>
        </div>
        <Spacer direaction={"horizontal"} />
        <div className='mt-2 text-secondary d-flex justify-content-between' style={{ fontSize: "13px" }}>
          <div>Total:</div>
          <div>{`$${total.toFixed(2)}`}</div>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button className='btn btn-danger' type="button">Proceed to Checkout</button>

      </div>
    </div>
  )
}

export default CartSummary
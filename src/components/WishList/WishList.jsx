import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './WishList.module.css'
import ProductComponent from '../ProductComponent/ProductComponent';
import { addToCart } from '../../redux/slices/CartSlice';
function WishList() {
  const favoriteState = useSelector((state) => state.favorite);
  console.log(favoriteState)
  let dispatch = useDispatch();
  const addAllToCart = () => {
    favoriteState.products.forEach((product) => dispatch(addToCart({
      ...product,
      quantity: 1,
      subTotalPrice: product.price,
    })));
  }
  return (
    <div className={`${styles.mainWrapper}`}>
      <div className={`${styles.mainContent} mt-5`}>
        <div className='d-flex justify-content-between'>
          <p className='mb-0 text-dark-emphasis'>WishList ({favoriteState.products.length})</p>
          <div onClick={addAllToCart} className='btn  border border-1 border-black rounded'>
            Move All To Cart
          </div>
        </div>
        <div className='d-flex gap-3'>
          {
            favoriteState.products.length != 0 ?
              favoriteState.products.map((product) => <ProductComponent key={product.id} isWishList={true} product={product} />)
              : <div>No Products</div>
          }
        </div>
      </div>
    </div>
  )
}

export default WishList
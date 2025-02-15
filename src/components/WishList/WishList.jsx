import React from 'react'
import { useSelector } from 'react-redux'
import styles from './WishList.module.css'
import ProductComponent from '../ProductComponent/ProductComponent';
function WishList() {
  const favoriteState = useSelector((state) => state.favorite);
  return (
    <div className={`${styles.mainWrapper}`}>
      <div className={`${styles.mainContent} mt-5`}>
        <p className='mb-0 text-dark-emphasis'>WishList ({favoriteState.products.length})</p>
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
import React, { use, useState } from 'react'
import styles from './ProductComponent.module.css'
import productImage from '../../assets/product_image.png'
import favoriteIcon from '../../assets/fav_icon.png'
import previewIcon from '../../assets/preview_icon.png'
import star from '../../assets/star.png'
import greyStar from '../../assets/grey_star.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/CartSlice'
import "./ProductComponent.css"
import { addToFavorite, removeFromFavorite } from '../../redux/slices/FavoriteSlice'
import heartFilled from '../../assets/heart_filled.png'
import deleteIcon from '../../assets/delete_icon.png'
import whiteCart from '../../assets/white_cart.png'
function ProductComponent({ product, isWishList = false }) {
  const dispatch = useDispatch();
  const favoriteProduct = useSelector((state) => state.favorite.products).find((favProduct) => favProduct.id == product.id);
  const addProductToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1,
      subTotalPrice: product.price,
    }));
  }

  const toggleFavorite = () => {
    if (favoriteProduct) {
      removeProductFromFavorite(product);
    } else {
      addProductToFavorite(product);
    }
  }
  const addProductToFavorite = () => {
    dispatch(addToFavorite(product));
  }
  const removeProductFromFavorite = () => {
    dispatch(removeFromFavorite(product));
  }
  return (
    <div className='d-flex flex-column mt-5'>
      <div className={`productImgContainer position-relative`}>
        {
          isWishList ?
            <img onClick={toggleFavorite} src={deleteIcon} className={styles.favoriteImg} />
            :
            <img onClick={toggleFavorite} src={favoriteProduct ? heartFilled : favoriteIcon} className={styles.favoriteImg} />

        }
        <img src={productImage} width={"115px"} height={"180px"} />
        {
          !isWishList &&
          <img src={previewIcon} className={styles.previewIcon} />

        }
        <div onClick={addProductToCart} className={`${isWishList ? "addToCartBoxInWishlist" : "addToCartBox"} bg-black w-100 position-absolute bottom-0 text-white d-flex justify-content-center align-items-center`}>
          <img src={whiteCart} style={{width: "20px", height: "20px"}}/>
          <p className='mb-0 ms-2'>Add to Cart</p>
        </div>
      </div>
      <h6 className='mt-2 mb-0'>{product.name}</h6>
      <div className='d-flex gap-2 align-items-center mt-2'>
        <p className='mb-0 text-danger'> {product.price} </p>
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <p className='mb-0 text-secondary fw-medium'>(35)</p>
      </div>

    </div>
  )
}

export default ProductComponent
import React, { use, useEffect, useState } from 'react'
import styles from '@/ProductComponent.module.css'
import favoriteIcon from '@/assets/fav_icon.png'
import previewIcon from '@/assets/preview_icon.png'
import star from '@/assets/star.png'
import greyStar from '@/assets/grey_star.png'
import { useDispatch, useSelector } from 'react-redux'
import { addCartToDataBase, addToCart } from '@/redux/slices/CartSlice'
import "@/ProductComponent.css"
import { addToFavorite, removeFromFavorite } from '@/redux/slices/FavoriteSlice'
import heartFilled from '@/assets/heart_filled.png'
import deleteIcon from '@/assets/delete_icon.png'
import whiteCart from '@/assets/white_cart.png'
import cartIcon from '@/assets/cart_icon.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
function ProductComponent({ product, isWishList = false, isFlashSale = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteProduct = useSelector((state) => state.favorite.products).find((favProduct) => favProduct.id == product.id);
  const authState = useSelector((state) => state.auth);
  const addProductToCart = (e) => {
    e.stopPropagation();
    if (authState.user) {
      dispatch(addToCart({
        ...product,
        quantity: 1,
        subTotalPrice: product.price,
      }));
    } else {
      const id = toast.error(
        <div className='d-flex align-items-center justify-content-between w-100'>Login to add to cart
          <Button
            onClick={() => {
              toast.dismiss(id);
              return navigate("/login")
            }}
            variant="contained"
            className={`bg-danger text-white d-flex align-items-center justify-content-center`}
            style={{ height: "30px" }}
          >Login
          </Button>
        </div>,

        {
          autoClose: 5000,
          closeButton: false
        })
    }
  }

  const toggleFavorite = (e) => {
    e.stopPropagation();

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
    <div className='d-flex flex-column'>
      <div onClick={() => navigate(`/product/${product.id}`)} className={`productImgContainer position-relative`}>
        {
          isWishList ?
            <img onClick={toggleFavorite} src={deleteIcon} className={styles.favoriteImg} />
            :
            <img onClick={toggleFavorite} src={favoriteProduct ? heartFilled : favoriteIcon} className={styles.favoriteImg} />

        }
        <img src={product.imageUrl} width={"115px"} height={"180px"} />
        {
          !isWishList &&
          <img src={previewIcon} className={styles.previewIcon} />

        }
        <div onClick={addProductToCart} className={`${isWishList ? "addToCartBoxInWishlist" : "addToCartBox"} bg-black w-100 position-absolute bottom-0 text-white d-flex justify-content-center align-items-center`}>
          <img src={whiteCart} style={{ width: "20px", height: "20px" }} />
          <p className='mb-0 ms-2'>Add to Cart</p>
        </div>
        {
          isFlashSale &&
          <div className='position-absolute top-0 start-0 ms-2 mt-2 bg-danger text-white py-1 px-2 rounded'>
            - {product.salePercentage}%
          </div>
        }
      </div>
      <h6 style={{width: "270px"}} className='mt-2 mb-0'>{product.name}</h6>
      <div className='d-flex gap-2 align-items-center mt-2'>
        {
          isFlashSale &&
          <div className='d-flex align-items-center gap-2'>
            <p className='mb-0 text-danger'> ${product.price} </p>
            <p className='mb-0 text-decoration-line-through text-secondary fw-medium'> ${product.previousPrice} </p>
          </div>
        }
        {!isFlashSale && <p className='mb-0 text-danger'> ${product.price} </p>}
        {
          !isFlashSale &&
          <div className='d-flex align-items-center gap-1'>
            <img src={star} width={"17px"} height={"17px"} />
            <img src={star} width={"17px"} height={"17px"} />
            <img src={star} width={"17px"} height={"17px"} />
            <img src={greyStar} width={"17px"} height={"17px"} />
            <img src={greyStar} width={"17px"} height={"17px"} />
            <p className='mb-0 text-secondary fw-medium'>(35)</p>
          </div>
        }
      </div>
      {isFlashSale && <div className='mt-2 d-flex align-items-center'>
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <p className='mb-0 text-secondary fw-medium ms-2'>(35)</p>
      </div>}

    </div>
  )
}

export default ProductComponent
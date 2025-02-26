import React from 'react'
import Spacer from '../../Spacer/Spacer'
import SizeCard from '../../SizeCard/SizeCard'
import star from '../../../assets/star.png'
import greyStar from '../../../assets/grey_star.png'
import minusImage from '../../../assets/minus.png'
import plus from '../../../assets/plus.png'
import loveIcon from '../../../assets/love_icon.png'
import deliveryicon from '../../../assets/delivery_icon.png'
import returnIcon from '../../../assets/return_icon.png'
import "./RightSide.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../../../redux/slices/FavoriteSlice'

function RightSide({ product, sizes, onSizeSelected, quantity, incrementQuantity, decrementQuantity, addProductToCart }) {
    const favoriteProduct = useSelector((state) => state.favorite.products).find((favProduct) => favProduct.id == product.id);
    const dispatch = useDispatch();
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
        <div className='col-4 d-flex flex-column'>
            <h5> {product?.name} </h5>
            <div className='d-flex mt-1 align-items-center'>
                <img src={star} width={"17px"} height={"17px"} />
                <img className='ms-1' src={star} width={"17px"} height={"17px"} />
                <img className='ms-1' src={star} width={"17px"} height={"17px"} />
                <img className='ms-1' src={star} width={"17px"} height={"17px"} />
                <img className='ms-1' src={greyStar} width={"17px"} height={"17px"} />
                <div className='text-secondary ms-2'>
                    (150 Reviews)
                </div>
                <div className='ms-2' style={{ color: "grey" }}>|</div>
                <div style={{ color: "rgba(0, 255, 102, 1)" }} className='ms-2'>In Stock</div>
            </div>
            <div className='fs-5 mt-3'>${product?.price}</div>
            <div>
                <p className='mt-3'>{product?.description}</p>
            </div>
            <Spacer direaction={"horizontal"} />
            <div className='d-flex mt-3 gap-2 align-items-center'>
                <p className='fs-5 mb-0'>Size:</p>
                {sizes.map((size) => <SizeCard key={size.id} onSelect={onSizeSelected} size={size} />)}
            </div>
            <div className='d-flex mt-4 gap-2' style={{ height: "41px" }}>
                <div className='col border border-1 border-end-0 border-black rounded d-flex align-items-center justify-content-between'>
                    <button onClick={decrementQuantity} style={{ width: "41px", backgroundColor: "transparent" }} className='justify-content-center d-flex align-items-center border border-1 border-start-0 border-top-0 border-bottom-0 border-black h-100'>
                        <img src={minusImage} width={"16px"} />
                    </button>
                    {quantity}
                    <button onClick={incrementQuantity} style={{ width: "41px", backgroundColor: "transparent", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} className='d-flex align-items-center justify-content-center bg-danger border border-1 border-danger border-start-0  border-bottom-0  h-100'>
                        <img src={plus} width={"16px"} />
                    </button>
                </div>
                <button type="button" onClick={addProductToCart} className='btn btn-danger col'>Add To Cart</button>
                <button onClick={toggleFavorite} type='button' className={`${favoriteProduct && "favBtnSelected"} favBtn`} >
                    <img src={loveIcon} width={"16px"} height={"16px"} />
                </button>
            </div>
            <div className='border border-1 border-black rounded mt-4' style={{ height: "180px" }}>
                <div className='d-flex align-items-center p-3 border-bottom border-1 border-black' style={{ height: "50%" }}>
                    <img src={deliveryicon} height={"40px"} width={"40px"} />
                    <div className='d-flex flex-column ms-3 gap-2'>
                        <h6 className='mb-0'>Free Delivery</h6>
                        <p className='mb-0' style={{ fontSize: "13px" }}>Enter your postal code for Delivery Availability</p>
                    </div>
                </div>

                <div className='d-flex align-items-center p-3' style={{ height: "50%" }}>
                    <img src={returnIcon} height={"40px"} width={"40px"} />
                    <div className='d-flex flex-column ms-3 gap-2'>
                        <h6 className='mb-0'>Return Delivery</h6>
                        <p className='mb-0' style={{ fontSize: "13px" }}>Free 30 Days Delivery Returns. Details</p>
                    </div>
                </div>

            </div>
        </div>)
}

export default RightSide
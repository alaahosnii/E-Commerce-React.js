import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./ProductDetails.css"
import styles from "./ProductDetails.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import star from "../../assets/star.png"
import greyStar from "../../assets/grey_star.png"
import Spacer from '../Spacer/Spacer';
import SizeCard from '../SizeCard/SizeCard';
import minusImage from "../../assets/minus.png"
import { Button } from 'react-bootstrap';
import plus from "../../assets/plus.png";
import loveIcon from '../../assets/love_icon.png';
import deliveryicon from '../../assets/delivery_icon.png';
import returnIcon from '../../assets/return_icon.png';
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const sizesList = [

    {
      id: 1,
      sizeNumber: "XS",
      selected: false,
    },
    {
      id: 2,
      sizeNumber: "S",
      selected: false,
    },
    {
      id: 3,
      sizeNumber: "M",
      selected: false,
    },
    {
      id: 4,
      sizeNumber: "L",
      selected: false,
    },
    {
      id: 5,
      sizeNumber: "XL",
      selected: false,
    },
  ];

  const [sizes, setSizesList] = useState(sizesList);
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => (await axiosInstance.get(`/products/${id}`)).data
  });

  const onsSizeSelected = (size) => {
    const newSizes = sizes.map((item) => item.id == size.id ? { ...item, selected: item.selected ? false : true }
      : item.selected ? { ...item, selected: false } : item
    );
    setSizesList(newSizes);
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  }

  const decrementQuantity = () => {
    setQuantity((prev) => prev == 1 ? 1 : prev - 1);
  }
  return (
    <div className={`${styles.mainWrapper}`}>
      <div className="container">
        <div className='d-flex gap-2 mt-5'>
          <div onClick={() => navigate("/")} className='homeNav'>Home</div>
          <div style={{ color: "grey" }}>/</div>
          <div>Product Details</div>
          <div style={{ color: "grey" }}>/</div>
          <div> {product?.name} </div>


        </div>
        <div className='col-12 mt-5 d-flex'>
          <div className='col-6'>
            <div className={`${styles.productImgContainer} d-flex align-items-center justify-content-center`}>
              {isLoading ? <div> Loading... </div> : <img src={product?.imageUrl} height={"315px"} />}
            </div>
          </div>
          <div className='col-2'></div>
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
              {sizes.map((size) => <SizeCard key={size.id} onSelect={onsSizeSelected} size={size} />)}
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
              <button type="button" className='btn btn-danger col'>Buy Now</button>
              <div className='btn d-flex align-items-center justify-content-center border border-1 border-black rounded p-2' style={{ width: "40px" }}>
                <img src={loveIcon} width={"16px"} height={"16px"} />
              </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
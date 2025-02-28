import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "@/components/ProductDetails/ProductDetails.css"
import styles from "@/components/ProductDetails/ProductDetails.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/CartSlice';
import RightSide from '@/components/ProductDetails/RightSide/RightSide.jsx';
import { addToFavorite } from '@/redux/slices/FavoriteSlice';
import { removeFromFavorite } from '@/redux/slices/FavoriteSlice';
import RelatedItem from '@/components/RelatedItem/RelatedItem.jsx';
function ProductDetails() {
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
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizesList] = useState(sizesList);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProductDetails(id);

    console.log("iddd", id);

  }, [id]);
  const getProductDetails = async (id) => {
    console.log("gett", id);

    try {
      const response = await axiosInstance.get(`/products/${id}`);
      console.log(response.data);

      setProduct(response.data);
    } catch (error) {
      console.log("errorrrr");

      setError(error);
    } finally {
      console.log(isLoading);

      setIsLoading(false);
    }
  }
  // const { data: product, isLoading, error } = useQuery({
  //   queryKey: ["productDetails"],
  //   queryFn: async () => (await axiosInstance.get(`/products/${productId}`)).data
  // });

  const onSizeSelected = (size) => {
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

  const addProductToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantity,
      subTotalPrice: product.price * quantity,
    }));
  }
  return (
    <div className={`${styles.mainWrapper}`}>
      <div className="container">
        <div className='d-flex gap-2 mt-5'>
          <div onClick={() => navigate("/")} className='homeNav'>Home</div>
          <div style={{ color: "grey" }}>/</div>
          <div>Product Details</div>
          <div style={{ color: "grey" }}>/</div>
          <div> {product && product.name} </div>
        </div>
        {
          !isLoading ?
            !error ?
              <div>
                <div className='col-12 mt-5 d-flex'>
                  <div className='col-6'>
                    <div className={`${styles.productImgContainer} d-flex align-items-center justify-content-center`}>
                      {isLoading ? <div> Loading... </div> : product && <img src={product?.imageUrl} height={"315px"} />}
                    </div>
                  </div>
                  <div className='col-2'></div>
                  <RightSide product={product && product} sizes={sizes} onSizeSelected={onSizeSelected} quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} addProductToCart={addProductToCart} />
                </div>
                <RelatedItem id={id} />
              </div>
              : <div>{error.message}</div>
            : <div>Loading...</div>
        }

      </div>
    </div>
  )
}


export default ProductDetails;
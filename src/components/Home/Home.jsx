import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import NavComponent from '../NavComponent/NavComponent'
import SideBar from '../SideBar/SideBar'
import Spacer from '../Spacer/Spacer'
import coverImg from '../../assets/cover_img.png'
import CategoryLabel from '../CategoryLabel/CategoryLabel'
import ProductComponent from '../ProductComponent/ProductComponent'
import axiosInstance from '../../utils/axiosInstance'
import ProductsContext from '../../contexts/ProductsContex'

function Home() {
  const { products, setProducts } = useContext(ProductsContext);
  const [error, setError] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      setError(error);
    }


  };
  return (
    <div className='d-flex flex-column container'>

      <div className='d-flex'>
        <div className='col-3'>
          <SideBar />
        </div>
        <div className='col-9'>
          <img src={coverImg} width={"100%"} className='pt-3 ps-3 pe-3' />
        </div>
      </div>
      <CategoryLabel categoryName={"Our Products"} description={"Explore Our Products"} />
      <div className='d-flex flex-wrap gap-5'>
        {
          products.length !== 0 ? products.map((product) => <ProductComponent key={product.id} product={product} />)
            : error && <div>{error.message}</div>
        }
      </div>
    </div>
  )
}

export default Home
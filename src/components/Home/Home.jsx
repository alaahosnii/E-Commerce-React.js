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
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProductsInRoutesContext } from '../../contexts/ProductsInRoutesContext'
import CategorySection from '../CategorySection/CategorySection'
import ProductBanner from '../ProductBanner/ProductBanner'
import NewArrivalSection from '../NewArrivalSection/NewArrivalSection'

function Home() {
  const { products, setProducts, flashSalesProducts, setFlashSalesProducts, bestSellingProducts, setBestSellingProducts } = useContext(ProductsContext);
  const { setProductsInRoutes } = useContext(ProductsInRoutesContext);
  const [error, setError] = useState(null);
  console.log("homeeeeeeeee");


  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);


  useEffect(() => {
    if (products.length !== 0) {
      setFlashSalesProducts(products.filter((product) => product.flashSale));
      setBestSellingProducts(products.filter((product) => product.bestSelling));
    }
  }, [products]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);

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

      <CategorySection
        style={{ marginTop: "150px" }}
        categoryName={"Today's"}
        description={"Flash Sales"}
        products={flashSalesProducts}
        error={error} />

      <CategorySection
        style={{ marginTop: "100px" }}
        categoryName={"This Month"}
        description={"Best Selling Products"}
        products={bestSellingProducts}
        isBestSelling={true}
        error={error} />

      <ProductBanner />

      <CategorySection
        style={{ marginTop: "100px" }}
        isExplore={true}
        categoryName={"Our Products"}
        description={"Explore Our Products"}
        products={products}
        error={error} />

      <NewArrivalSection />


    </div>
  )
}

export default Home
import React, { useContext, useEffect, useState } from 'react'
import styles from './CategoryLabel.module.css'
import { Button } from 'react-bootstrap';
import { ProductsInRoutesContext } from '../../contexts/ProductsInRoutesContext';
import { useNavigate } from 'react-router-dom';
import semicolon from '../../assets/semicolon.png'
function CategoryLabel({ products = [] , isNewArrival = false , isFromProductDetails = false, categoryName, isExplore = false, description, isBestSelling = false }) {
  const { setProductsInRoutes } = useContext(ProductsInRoutesContext);
  const navigate = useNavigate();
  const dateNow = new Date();
  const salesExpiryDate = new Date("2025-03-01T08:15:00");
  const difference = salesExpiryDate - dateNow;
  const [remainingDate, setRemainingDate] = useState({
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  });
  const [inervalId , setInervalId] = useState(null);
  useEffect(() => {
    calculatedSalesDate();
  }, [])
  

  useEffect(() => {
    return () => {
      console.log("clearing interval");
      clearInterval(inervalId);
    }
  } , [])
  // useEffect(() => {
  //   console.log(remainingDate);
  // }, [remainingDate])
  const calculatedSalesDate = () => {
    const salesExpiryDate = new Date("2025-03-01T08:15:00");
    // console.log("salesExpiryDate", salesExpiryDate);

    const id = setInterval(() => {
      const dateNow = new Date();
      const difference = salesExpiryDate - dateNow;
      setRemainingDate({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })

    }, 3000);

    setInervalId(id);
  }
  return (
    <div>
      <div className={`${description ? styles.categoryLabel : styles.relatedItems} d-flex align-items-center`}>
        <div className={`${styles.redCard} rounded`}></div>
        <h6 className='ms-3 mb-0'> {categoryName} </h6>
      </div>
      {

        <div className='d-flex justify-content-between'>
          {
            (isBestSelling || isExplore || isNewArrival) &&
            <h4 className='mb-0 mt-3'>{description}</h4>
          }

          {
            (!isBestSelling && !isNewArrival && !isExplore && !isFromProductDetails) &&
            <div className='d-flex gap-5 align-items-center'>
              <h4 className='mb-0 mt-3'>{description}</h4>
              <div className='d-flex gap-3 align-items-center' style={{ marginLeft: "150px" }}>
                <div className='d-flex p-2 flex-column align-items-center'>
                  <p className='mb-0' style={{ fontSize: "13px" }}>Days</p>
                  <h4 className='mb-0'>{remainingDate.days}</h4>
                </div>
                <img src={semicolon} width={"4px"} height={"20px"} />
                <div className='d-flex p-2 flex-column align-items-center'>
                  <p className='mb-0' style={{ fontSize: "13px" }}>Hours</p>
                  <h4 className='mb-0'> {remainingDate.hours} </h4>
                </div>
                <img src={semicolon} width={"4px"} height={"20px"} />
                <div className='d-flex p-2 flex-column align-items-center'>
                  <p className='mb-0' style={{ fontSize: "13px" }}>Minutes</p>
                  <h4 className='mb-0'> {remainingDate.minutes} </h4>
                </div>
                <img src={semicolon} width={"4px"} height={"20px"} />
                <div className='d-flex p-2 flex-column align-items-center'>
                  <p className='mb-0' style={{ fontSize: "13px" }}>Seconds</p>
                  <h4 className='mb-0'> {remainingDate.seconds} </h4>
                </div>
              </div>
            </div>
          }

          {
            isBestSelling && <Button onClick={() => {
              setProductsInRoutes(products);
              return navigate("/products")
            }} variant="contained" className={` bg-danger text-white`} style={{ height: "50px" }}>View All Products</Button>
          }
        </div>
      }
    </div>
  );
}

export default CategoryLabel
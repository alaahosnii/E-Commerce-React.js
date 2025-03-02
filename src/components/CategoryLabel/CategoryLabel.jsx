import React, { useContext, useEffect, useState } from 'react'
import styles from '@/components/CategoryLabel/CategoryLabel.module.css'
import { Button } from 'react-bootstrap';
import { ProductsInRoutesContext } from '@/contexts/ProductsInRoutesContext';
import { useNavigate } from 'react-router-dom';
import semicolon from '@/assets/semicolon.png'
function CategoryLabel({ products = [], isNewArrival = false, isFromProductDetails = false, categoryName, isExplore = false, description, isBestSelling = false }) {
  const { setProductsInRoutes } = useContext(ProductsInRoutesContext);
  const navigate = useNavigate();



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

export default React.memo(CategoryLabel);
import React, { useContext, useEffect, useState } from 'react'
import CategoryLabel from '@/components/CategoryLabel/CategoryLabel.jsx'
import ProductComponent from '@/components/ProductComponent/ProductComponent.jsx'
import { useNavigate } from 'react-router-dom';
import { ProductsInRoutesContext } from '@/contexts/ProductsInRoutesContext';
import { Button } from 'react-bootstrap';
import FlashSaleLabel from '@/components/FlashSaleLabel/FlashSaleLabel';

function CategorySection({ products, error, isFlash, categoryName, description, style, isExplore = false, isBestSelling = false }) {
  const { setProductsInRoutes } = useContext(ProductsInRoutesContext);
  const navigate = useNavigate();


  return (
    <div style={style}>
      {
        isFlash ? <FlashSaleLabel />
          :
          <CategoryLabel products={products} isExplore={isExplore} isBestSelling={isBestSelling} categoryName={categoryName} description={description} />

      }
      <div className={`d-flex ${!isBestSelling && "overflow-auto gap-5"} ${(isBestSelling || isExplore) && "flex-wrap justify-content-between"} mt-4`}>
        {
          !isBestSelling ?
            isExplore ?
              products.length !== 0 ? products.map((product, index) => index < 8 && <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
                : error && <div>{error}</div>
              :
              products.length !== 0 ? products.map((product) => <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
                : error && <div>{error}</div>
            : products.length !== 0 ? products.map((product, index) => index < 4 && <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
              : error && <div>{error}</div>
        }
      </div>
      {
        !isBestSelling &&
        <div className='mt-5 d-flex justify-content-center'>
          <Button onClick={() => {
            setProductsInRoutes(products);
            return navigate("/products")
          }} variant="contained" className={` bg-danger text-white`} style={{ height: "50px", width: "20%" }}>View All Products</Button>

        </div>
      }
    </div>)
}

export default CategorySection
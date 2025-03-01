import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function NewArrivalProduct({ productImage, productType }) {
  const navigate = useNavigate();
  return (
    <div className={`${productType == "playstation" ? "col-6" : "col-5"} position-relative d-flex`}>
      <img src={productImage} height={"100%"} width={"100%"} />
      <div className='d-flex flex-column position-absolute text-white' style={{ width: `${productType == "playstation" && "35%"}`, bottom: `${productType == "playstation" ? "100px" : "10px"}`, left: "30px" }}>
        <h4>{productType == "playstation5" ? "Playstation 5" : productType == "smartspeakers" ? "Smart Speakers" : "Perfumes"}</h4>
        <p style={{ fontSize: "13px", marginBottom: "0px" }}>Black and White version of the PS5 coming out on sale.</p>
        <NavLink style={{ marginBottom: "10px", color: "white" }} state={
          {
            productType
          }
        } onClick={() => navigate(`/products`)}>Shop Now</NavLink>

      </div>
    </div>)
}

export default NewArrivalProduct;
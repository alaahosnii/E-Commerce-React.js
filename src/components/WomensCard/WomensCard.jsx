import React from 'react'
import womenImage from "../../assets/women_image.png";
import { NavLink, useNavigate } from 'react-router-dom';
function WomensCard() {
  const navigate = useNavigate();
  return (
    <div className='position-relative'>
      <img src={womenImage} width={"100%"} height={"250px"} />
      <div className='d-flex flex-column position-absolute text-white' style={{width: "35%", bottom: "30px", left: "30px" }}>
        <h4>Women’s Collections</h4>
        <p style={{ fontSize: "13px", marginBottom: "0px" }}>Featured woman collections that give you another vibe.</p>
        <NavLink style={{ marginTop: "10px", color: "white" }} state={
          {
            productType: "womenfashion"
          }
        } onClick={() => navigate(`/products`)}>Shop Now</NavLink>

      </div>
    </div>
  )
}

export default WomensCard
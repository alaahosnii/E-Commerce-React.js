import React from 'react'
import arrow from '../../assets/arrow.png'
function CategoryItem({ categoryName }) {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <h6 style={{fontSize: "13.5px"}}>{categoryName}</h6>
      <img src={arrow} height={"10px"} width={"10px"} />
    </div>
  );
}

export default CategoryItem
import React from 'react'

function ProductInCheckOut({ product }) {
  return (
    <div className='d-flex justify-content-between align-items-center mb-4'>
      <div className='d-flex gap-4 align-items-center'>
        <img src={product.imageUrl} width={"50px"} height={"50px"} />
        <p className='mb-0'>{product.name}</p>
      </div>
      <p className='mb-0'> ${product.price} </p>
    </div>
  )
}

export default ProductInCheckOut
import React from 'react'

function OurService({ service }) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <img src={service.ourServiceImage} width={"60px"} height={"60px"} />
      <h5 className='mt-3 mb-0'>{service.ourServiceName}</h5>
      <p style={{ fontSize: "13px" }} className='mb-0 mt-1'>{service.ourServiceDesc}</p>
    </div>
  )
}

export default OurService
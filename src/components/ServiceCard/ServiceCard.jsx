import React from 'react'
function ServiceCard({ serviceName, serviceImage, serviceDescription, index }) {
  return (
    <div style={{ width: "220px" }} className={` ${index == 1 ? "bg-danger border border-1 border-danger text-white" : "border border-1 border-black"} shadow p-3 mb-5 rounded d-flex flex-column align-items-center justify-content-center`}>
      <img src={serviceImage} width={"60px"} height={"60px"} />
      <h5 className='mt-3 mb-0'>{serviceName}</h5>
      <p style={{ fontSize: "13px" }} className={`${index == 1 ? "text-white" : "text-black"}  mb-0 mt-1`}> {serviceDescription}</p>
    </div>
  )
}

export default ServiceCard;
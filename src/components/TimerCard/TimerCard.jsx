import React from 'react'

function TimerCard({type , time}) {
  return (
    <div style={{ width: "65px", height: "65px"}} className=' bg-white d-flex flex-column align-items-center justify-content-center rounded-circle'>
      <p className='mb-0 fw-bold'>{time}</p>
      <p className='mb-0' style={{ fontSize: "12px"}}>{type}</p>
    </div>
  )
}

export default TimerCard
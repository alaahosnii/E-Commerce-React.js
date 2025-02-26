import React from 'react'
import jblImage from '@/assets/jbl_image.png'
import TimerCard from '@/components/TimerCard/TimerCard.jsx'
import { Button } from 'react-bootstrap'
function ProductBanner() {
  return (
    <div className='position-relative w-100' style={{ marginTop: "100px", height: "500px" }}>
      <img src={jblImage} height={"100%"} width={"100%"} />
      <div className='d-flex flex-column position-absolute h-100 justify-content-evenly' style={{ left: 50, width: "30%", top: 0, paddingTop: "40px" }}>
        <p className='mb-0' style={{ color: "#00FF66" }}>Categories</p>
        <div className='d-flex flex-column gap-4'>
          <h1 className='mb-0' style={{ color: "white", letterSpacing: "2px" }}>
            Enhance Your Music Experience
          </h1>
          <div className='d-flex gap-4'>
            <TimerCard type={"Hours"} time={"24"} />
            <TimerCard type={"Days"} time={"05"} />
            <TimerCard type={"Minute"} time={"59"} />
            <TimerCard type={"Seconds"} time={"35"} />
          </div>
        </div>

        <Button
          variant="contained"
          className={`mt-5 text-black`}
          style={{ height: "50px", width: "171px", backgroundColor: "#00FF66" }}>
          Buy Now!
        </Button>

      </div>
    </div>
  )
}

export default ProductBanner
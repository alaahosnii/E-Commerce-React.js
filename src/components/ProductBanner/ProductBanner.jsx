import React, { useEffect, useState } from 'react'
import jblImage from '@/assets/jbl_image.png'
import TimerCard from '@/components/TimerCard/TimerCard.jsx'
import { Button } from 'react-bootstrap'
import e from 'cors';
function ProductBanner() {
  const dateNow = new Date();
  const salesExpiryDate = new Date("2025-03-05T08:15:00");
  const difference = salesExpiryDate - dateNow;
  const [remainingDate, setRemainingDate] = useState({
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  });
  useEffect(() => {
    const salesExpiryDate = new Date("2025-03-05T08:15:00");

    const id = setInterval(() => {
      const dateNow = new Date();
      const difference = salesExpiryDate - dateNow;
      if (difference > 0) {
        setRemainingDate({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setRemainingDate({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        clearInterval(id);

      }
    }, 1000);

    return () => {
      console.log("clearing interval", id);
      clearInterval(id);
    }
  }, []);

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
            <TimerCard type={"Days"} time={remainingDate.days} />
            <TimerCard type={"Hours"} time={remainingDate.hours} />
            <TimerCard type={"Minute"} time={remainingDate.minutes} />
            <TimerCard type={"Seconds"} time={remainingDate.seconds} />
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
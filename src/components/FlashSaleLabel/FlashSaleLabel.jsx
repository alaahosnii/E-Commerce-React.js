import React, { useContext, useEffect, useState } from 'react'
import styles from '@/components/FlashSaleLabel/FlashSaleLabel.module.css'
import semicolon from '@/assets/semicolon.png'

function FlashSaleLabel() {
  const dateNow = new Date();
  const salesExpiryDate = new Date("2025-03-05T08:15:00");
  const difference = salesExpiryDate - dateNow;
  const [remainingDate, setRemainingDate] = useState({
    days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0,
    hours: difference > 0 ? Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0,
    minutes: difference > 0 ? Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) : 0,
    seconds: difference > 0 ? Math.floor((difference % (1000 * 60)) / 1000) : 0
  });

  useEffect(() => {
    console.log("flash");

    const salesExpiryDate = new Date("2025-03-05T08:15:00");
    const id = setInterval(() => {
      const dateNow = new Date();
      const difference = salesExpiryDate - dateNow;
      console.log(difference);

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
      console.log("clearing interval from flash", id);
      clearInterval(id);
    }
  }, [])


  return (
    <div>
      <div className={`${styles.categoryLabel} d-flex align-items-center`}>
        <div className={`${styles.redCard} rounded`}></div>
        <h6 className='ms-3 mb-0'> Today's </h6>
      </div>


      <div className='d-flex justify-content-between'>

        <div className='d-flex gap-5 align-items-center'>
          <h4 className='mb-0 mt-3'>Flash Sale</h4>
          <div className='d-flex gap-3 align-items-center' style={{ marginLeft: "150px" }}>
            <div className='d-flex p-2 flex-column align-items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Days</p>
              <h4 className='mb-0'>{remainingDate.days}</h4>
            </div>
            <img src={semicolon} width={"4px"} height={"20px"} />
            <div className='d-flex p-2 flex-column align-items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Hours</p>
              <h4 className='mb-0'> {remainingDate.hours} </h4>
            </div>
            <img src={semicolon} width={"4px"} height={"20px"} />
            <div className='d-flex p-2 flex-column align-items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Minutes</p>
              <h4 className='mb-0'> {remainingDate.minutes} </h4>
            </div>
            <img src={semicolon} width={"4px"} height={"20px"} />
            <div className='d-flex p-2 flex-column align-items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Seconds</p>
              <h4 className='mb-0'> {remainingDate.seconds} </h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default React.memo(FlashSaleLabel);
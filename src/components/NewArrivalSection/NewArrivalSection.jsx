import React from 'react'
import CategoryLabel from '@/CategoryLabel/CategoryLabel'
import { useNavigate } from 'react-router-dom';
import psImage from "@/assets/ps_image.png";
import womenImage from "@/assets/women_image.png";
import speakersImage from "@/assets/speakers_image.png";
import perfumesImage from "@/assets/perfumes_image.png";
import NewArrivalProduct from '@/NewArrivalProduct/NewArrivalProduct';
import WomensCard from '@/WomensCard/WomensCard';
function NewArrivalSection() {
  return (
    <div style={{ marginTop: "150px" }}>
      <CategoryLabel categoryName={"Featured"} description={"New Arrivals"} isNewArrival={true} />
      <div className={`d-flex mt-4 gap-3`} style={{ height: "600px" }}>
        <NewArrivalProduct productImage={psImage} productType={"playstation5"}/>
        <div className='col-6 d-flex flex-column gap-3'>
          <WomensCard />
          <div className='d-flex' style={{ flex: "1" }}>
            <NewArrivalProduct productImage={speakersImage} productType={"smartspeakers"} />

            <div className='col'></div>
            <NewArrivalProduct productImage={perfumesImage} productType={"Perfumes"} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default NewArrivalSection;
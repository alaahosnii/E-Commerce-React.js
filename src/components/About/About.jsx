import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "@/About.module.css"
import aboutImage from "@/assets/about_image.png"
import ServiceCard from '@/ServiceCard/ServiceCard';
import serviceImage1 from "@/assets/service1.png";
import serviceImage2 from "@/assets/service2.png";
import serviceImage3 from "@/assets/service3.png";
import serviceImage4 from "@/assets/service4.png";
import personImage1 from "@/assets/person1.png";
import personImage2 from "@/assets/person2.png";
import personImage3 from "@/assets/person3.png";
import ManagerCard from '@/ManagerCard/ManagerCard';
import ourService1 from "@/assets/our_service1.png";
import ourService2 from "@/assets/our_service2.png";
import ourService3 from "@/assets/our_service3.png";
import OurService from '@/OurService/OurService';
function About() {
  const navigate = useNavigate();
  const managers = [
    {
      managerImage: personImage1,
      managerName: "John Doe",
      managerPosition: "Founder & Chairman",
    },
    {
      managerImage: personImage2,
      managerName: "Emma Watson",
      managerPosition: "Managing Director",
    },
    {
      managerImage: personImage3,
      managerName: "Will Smith",
      managerPosition: "Product Designer",
    },
  ]
  const ourServices = [
    {
      ourServiceImage: ourService1,
      ourServiceName: "FREE AND FAST DELIVERY",
      ourServiceDesc: "Free delivery for all orders over $140"
    },
    {
      ourServiceImage: ourService2,
      ourServiceName: "24/7 CUSTOMER SERVICE",
      ourServiceDesc: "Friendly 24/7 customer support"
    },
    {
      ourServiceImage: ourService3,
      ourServiceName: "MONEY BACK GUARANTEE",
      ourServiceDesc: "We return money within 30 days"
    },
  ]
  const services = [
    {
      serviceName: "10.5k",
      serviceImage: serviceImage1,
      serviceDescription: "Sallers active our site"
    },
    {
      serviceName: "33k",
      serviceImage: serviceImage2,
      serviceDescription: "Monthly Produduct Sale"
    },
    {
      serviceName: "45.5k",
      serviceImage: serviceImage3,
      serviceDescription: "Customer active in our site"
    },
    {
      serviceName: "25k",
      serviceImage: serviceImage4,
      serviceDescription: "Anual gross sale in our site"
    },
  ]
  return (
    <div >
      <div className='d-flex container gap-2 mt-4'>
        <div onClick={() => navigate("/")} className='homeNav'>Home</div>
        <div style={{ color: "grey" }}>/</div>
        <div>About</div>
      </div>
      <div className='d-flex mt-3 align-items-center'>
        <div className={`${styles.container} col-6`}>
          <h1 className='mb-0'>Our Story</h1>
          <div className='mt-3'>
            <p className='mb-0'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
            <p className='mb-0 mt-3'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
          </div>
        </div>
        <div className='col-1'></div>
        <div className='col-5'>
          <img src={aboutImage} width={"100%"} />
        </div>
      </div>
      <div className='d-flex flex-wrap container gap-5 justify-content-evenly' style={{ marginTop: "150px" }}>
        {
          services.map((service, index) => <ServiceCard index={index} serviceName={service.serviceName} serviceImage={service.serviceImage} serviceDescription={service.serviceDescription} />)
        }
      </div>
      <div className='mt-5 d-flex flex-wrap container gap-5 justify-content-evenly'>
        {
          managers.map((manager) => <ManagerCard manager={manager} />)
        }
      </div>
      <div className='mt-5 d-flex flex-wrap container gap-5 justify-content-evenly'>
        {
          ourServices.map((service) => <OurService service={service} />)
        }
      </div>
    </div>
  )
}

export default About
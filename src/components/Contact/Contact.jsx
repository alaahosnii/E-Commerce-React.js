import React from 'react'
import { useNavigate } from 'react-router-dom';
import phoneIcon from "@/assets/phone_icon.png";
import emailIcon from "@/assets/mail_icon.png";
import Spacer from '@/components/Spacer/Spacer.jsx';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ContactForm from '../ContactForm/ContactForm';

function Contact() {
  const navigate = useNavigate();
  return (
    <div className='container mt-5'>
      <div className='d-flex gap-2 mt-4'>
        <div onClick={() => navigate("/")} className='homeNav'>Home</div>
        <div style={{ color: "grey" }}>/</div>
        <div>Contact</div>
      </div>
      <div className='mt-5 d-flex gap-5'>
        <div className='col-3 border border-1 p-4 border-white shadow rounded'>
          <div className='d-flex gap-3 align-items-center'>
            <img src={phoneIcon} width={"35px"} height={"35px"} />
            <p className='mb-0'>Call To Us</p>
          </div>
          <p className='mb-0 mt-3'>We are available 24/7, 7 days a week.</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Phone: +8801611112222</p>
          <Spacer direaction={"horizontal"} />
          <div className='d-flex gap-3 align-items-center mt-4'>
            <img src={emailIcon} width={"35px"} height={"35px"} />
            <p className='mb-0'>Write To Us</p>
          </div>
          <p className='mb-0 mt-3'>Fill out our form and we will contact you within 24 hours.</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Emails: customer@exclusive.com</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Emails: support@exclusive.com</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact;
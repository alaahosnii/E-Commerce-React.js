import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ProductInCheckOut from '@/components/ProductInCheckOut/ProductInCheckOut.jsx';
import Spacer from '@/components/Spacer/Spacer.jsx';
import { Button, Form } from 'react-bootstrap';
import styles from '@/components/CheckOut/CheckOut.module.css';
import creditsImage from "@/assets/credits.png";
import { getClientSecret } from '@/redux/slices/paymentSlice';
import { toast } from 'react-toastify';
function CheckOut() {
  const navigate = useNavigate();
  const cartState = useSelector(state => state.cart);
  const { clientSecret, getClientSecretError, getClientSecretLoading } = useSelector(state => state.payment);
  const dispatch = useDispatch();
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (getClientSecretLoading) {
      const id = toast.loading("You will be redirected to the payment page ...");
      setToastId(id);
    }
  }, [getClientSecretLoading]);

  useEffect(() => {
    if (getClientSecretError) {
      toast.update(toastId, {
        render: getClientSecretError,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [getClientSecretError]);

  useEffect(() => {
    if (clientSecret) {
      toast.dismiss(toastId);
      console.log(clientSecret);
      window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_BL3QVsbDLDfraKVEtrDhZtprz0HR7pHo&clientSecret=${clientSecret}`
    }
  }, [clientSecret]);


  return (
    <div className='container'>
      <div className='d-flex gap-2 mt-4'>
        <div onClick={() => navigate("/")} className='homeNav'>Home</div>
        <div style={{ color: "grey" }}>/</div>
        <div className='homeNav'>Cart</div>
        <div style={{ color: "grey" }}>/</div>
        <div>Checkout</div>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          streetAddress: "",
          apartment: "",
          state: "",
          phone: "",
          email: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(getClientSecret({
            ...values,
            amount: cartState.localCart.totalPrice
          }));
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='d-flex mt-5 justify-content-between'>
              <div className='col-4'>
                <h3 className='mb-0'>Billing Details</h3>
                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    onChange={handleChange}
                    value={values.streetAddress}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="apartment">Apartment No.</label>
                  <input
                    type="text"
                    name="apartment"
                    onChange={handleChange}
                    value={values.apartment}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="state">Town/City</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={values.state}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    style={{ width: "100%" }}
                  />
                </div>

                {errors.name && errors.name}
              </div>
              <div className='col-5'>
                {
                  cartState.localCart.products.map((product) => <ProductInCheckOut key={product.id} product={product} />)
                }
                <div className='d-flex align-items-center mt-5 mb-2 justify-content-between'>
                  <p className='mb-0'>Subtotal:</p>
                  <p className='mb-0'>${cartState.localCart.totalPrice}</p>
                </div>
                <Spacer direaction={"horizontal"} />
                <div className='d-flex align-items-center mt-4 mb-2 justify-content-between'>
                  <p className='mb-0'>Shipping:</p>
                  <p className='mb-0'>Free</p>
                </div>
                <Spacer direaction={"horizontal"} />
                <div className='d-flex align-items-center mt-3 mb-2 justify-content-between'>
                  <p className='mb-0'>Total:</p>
                  <p className='mb-0'>${cartState.localCart.totalPrice}</p>
                </div>
                <div className='d-flex justify-content-between mt-4'>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    id={`radio1`}
                    label={"Credit Card"}
                    className={`${styles.customRadio}`}
                  />
                  <img src={creditsImage} height={"30px"} />
                </div>
                <div className='mt-4'>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    id={`radio1`}
                    label={"Cash on Delivery"}
                    className={`${styles.customRadio}`}
                  />
                </div>
                <Button type='submit' variant="contained" className={`bg-danger text-white mt-5`} style={{ height: "50px", width: "100%" }}>Place Order</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CheckOut
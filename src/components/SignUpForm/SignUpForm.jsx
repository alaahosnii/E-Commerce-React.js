import React from 'react'
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import styles from '@/SignUpForm.module.css';
import "@/SignUpForm.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/redux/slices/AuthSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerError, isRegisterLoading, registerStatus } = useSelector(state => state.auth);

  useEffect(() => {
    if (registerStatus) {
      navigate("/Login");
    }
  }, [registerStatus]);
  return (
    <div>
      <Formik
        initialValues={{ name: "", email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length < 3) {
            errors.name = 'Name must be at least 3 characters long'
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required'
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long'
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(registerUser(values));
          resetForm();

        }}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className='d-flex flex-column' style={{ width: "70%" }} onSubmit={handleSubmit}>
            <div className='mt-3'>
              <div className="form-floating mb-3 " >
                <input
                  type="Name"
                  className={`form-control ${errors.name && `is-invalid`}`}
                  id="floatingInput"
                  placeholder="username"
                  value={values.name}
                  disabled={isSubmitting}
                  name="name"
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.name ? errors.name : "User Name"} </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="Name"
                  className={`form-control ${errors.email && `is-invalid`}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={values.email}
                  name="email"
                  disabled={isSubmitting}
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.email ? errors.email : "Email"} </label>
              </div>
              <div className="form-floating" >
                <input
                  type="password"
                  className={`form-control ${errors.password && `is-invalid`}`}
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  disabled={isSubmitting}

                  value={values.password}
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.password ? errors.password : "Password"} </label>
              </div>

            </div>

            {registerError && <p className='text-danger mb-3 mt-3'> {registerError} </p>}
            <Button type='submit' variant="contained" className={`bg-danger text-white ${!registerError && "mt-5"}`} style={{ height: "50px" }}>Create Account</Button>
            <div className='d-flex justify-content-center gap-2 align-items-center mt-4'>
              <p className='mb-0'>Already have an account?</p>
              <NavLink to="/login" className={styles.loginNav}>Login</NavLink>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm
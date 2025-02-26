import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import styles from '@/LoginForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/AuthSlice';
import { toast } from 'react-toastify';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginError, isLoginLoading, user } = useSelector(state => state.auth);
  const [id, setId] = useState(null);
  if (isLoginLoading) {
    console.log("loading");
  }

  useEffect(() => {
    if (isLoginLoading) {
      let idd;
      idd = toast.loading("Loading...");
      setId(idd);
    }
  }, [isLoginLoading]);

  useEffect(() => {
    if (loginError) {
      toast.update(
        id,
        {
          render: loginError,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      )
    }


  }, [loginError]);
  useEffect(() => {
    if (user) {
      toast.dismiss(id);
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};

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
          dispatch(loginUser(values));
          resetForm();
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
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

            {loginError && <p className='text-danger mb-3 mt-3'> {loginError} </p>}
            {/* {errors.password && touched.password && errors.password} */}
            <Button type='submit' variant="contained" className={`${!loginError && "mt-5"} bg-danger text-white`} style={{ height: "50px" }}>Log in</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm
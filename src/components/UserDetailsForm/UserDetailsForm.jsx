import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '@/redux/slices/AuthSlice';

function UserDetailsForm() {
  const authState = useSelector((state) => state.auth);
  const user = authState.user;
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  console.log(user && user.name);
  console.log(user && user);

  useEffect(() => {
    if (authState.updateUserLoading) {
      const idd = toast.loading("Updating...");
      setId(idd);
    }
  }, [authState.updateUserLoading]);

  useEffect(() => {
    if (authState.updateUserError) {

      toast.update(
        id,
        {
          render: authState.updateUserError.response ? authState.updateUserError.response.data.message : authState.updateUserError,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      )
    }
  }, [authState.updateUserError]);

  useEffect(() => {
    if (authState.updateUserSuccess) {
      toast.update(
        id,
        {
          render: "Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      );
    }
  }, [authState.updateUserSuccess]);
  return (
    <div className='col-7 border border-1 p-4 border-white shadow rounded' style={{ height: "fit-content" }}>
      <p className='fw-bold text-danger'>Edit Your Profile</p>
      <div >
        <Formik
          initialValues={{ name: "", email: '', address: "", password: '', newPass: '', confirmPass: '' }}
          enableReinitialize
          validate={values => {
            const errors = {};
            if ((values.password != user.password) && values.password) {
              errors.password = 'Password Is Incorrect';
            } else {
              if (!values.password) {
                setPasswordMatch(false);
              } else {
                setPasswordMatch(true);
              }
              // setPasswordMatch(true);
            }
            if (values.newPass != values.confirmPass) {
              errors.confirmPass = 'Password does not match';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            let updatedUser = {}
            for (const key in values) {
              if (values[key]) {
                updatedUser = {
                  ...updatedUser,
                  [key == "confirmPass" ? "password" : key == "newPass" ? "password" : key]: values[key]
                }

              }
            }
            if (values.name || values.email || values.address || values.password || values.newPass || values.confirmPass) {
              console.log(updatedUser);
              dispatch(updateUser(updatedUser));
              resetForm();
            }
          }}
        // validateOnChange={false}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form className='d-flex flex-row flex-wrap' style={{ width: "100%", height: "100%" }} onSubmit={handleSubmit}>
              <div className='mt-3 d-flex w-100 flex-column gap-3'>
                <div className='d-flex gap-3'>
                  <div className="form-floating mb-3 w-100" >
                    <input
                      type="Name"
                      className={`form-control ${errors.name && `is-invalid`}`}
                      id="floatingInput"
                      placeholder="Name"
                      value={values.name}
                      disabled={!editable}
                      name="name"
                      onChange={handleChange}
                      style={{ backgroundColor: "#F5F5F5" }}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.name ? errors.name : "Name"} </label>
                  </div>
                </div>

                <div className='d-flex gap-3'>
                  <div className="form-floating mb-3 w-50" >
                    <input
                      type="Name"
                      className={`form-control ${errors.name && `is-invalid`}`}
                      id="floatingInput"
                      placeholder="Email"
                      value={values.email}
                      disabled={!editable}
                      name="email"
                      onChange={handleChange}
                      style={{ backgroundColor: "#F5F5F5" }}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.email ? errors.email : "Email"} </label>
                  </div>
                  <div className="form-floating mb-3 w-50">
                    <input
                      type="Name"
                      className={`form-control ${errors.email && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Address'
                      value={values.address}
                      name="address"
                      disabled={!editable}
                      style={{ backgroundColor: "#F5F5F5" }}

                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.address ? errors.address : "Address"} </label>
                  </div>
                </div>
                <div><p className='mb-0'>Password Changes</p></div>
                <div className='d-flex flex-wrap w-100'>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.password && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Current Password'
                      value={values.password}
                      name="password"
                      disabled={!editable}
                      style={{ backgroundColor: "#F5F5F5" }}

                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.password ? errors.password : "Current Password"} </label>
                  </div>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.newPass && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='New Password'
                      value={values.newPass}
                      name="newPass"
                      disabled={!editable || !passwordMatch}
                      style={{ backgroundColor: "#F5F5F5" }}
                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.newPass ? errors.newPass : "New Password"} </label>
                  </div>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.confirmPass && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Confirm New Password'
                      value={values.confirmPass}
                      name="confirmPass"
                      disabled={!editable || !passwordMatch}
                      style={{ backgroundColor: "#F5F5F5" }}
                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.confirmPass ? errors.confirmPass : "Confirm New Password"} </label>
                  </div>
                </div>
                <div className='d-flex w-100 justify-content-end'>
                  <Button onClick={() => !(errors.password || errors.newPass || errors.confirmPass) && setEditable((prev) => !prev)} type='submit' variant="contained" className={`${!editable ? "bg-secondary" : "bg-danger"}  text-white mt-5`} style={{ height: "50px", width: "140px" }}>Edit</Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>)
}

export default UserDetailsForm
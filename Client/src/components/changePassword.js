import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ShowhidePassword from "./showhidePassword";
import { useSelector } from "react-redux";

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(6)
    .matches(passwordRule, { message: "Please create a stronger password" }),
  confirmPassword: Yup.string()
    .min(6)
    .when("newPassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "password didn't match")
    })
    .required('Required'),
});


const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const email = useSelector((state) => state.user.email);

  const changePassword = async (values) => {
    values.email = email;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch("http://localhost:5000/changepassword", requestOptions);
    const data = await response.json();
    if(data.msg){
      setSuccessMessage(data.msg)
    }else{
      setErrorMessage(data.errMsg)
    }
  };

  return (
    <section>
      <div className="container">
        <div className="form">
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={(values, { resetForm }) => {
              if (values) {
                setErrorMessage('')
                setSuccessMessage('')
                changePassword(values);
                resetForm();
              }
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur, handleSubmit, }) => (
              <Form onSubmit={handleSubmit}>
                <Field name="currentPassword" placeholder="Current Password" value={values.currentPassword} component={ShowhidePassword}
                  onChange={handleChange} onBlur={handleBlur} />
                {errors.currentPassword && touched.currentPassword ? (<div className="error">{errors.currentPassword}</div>) : null}

                <Field name="newPassword" placeholder="New Password" value={values.newPassword} component={ShowhidePassword}
                  onChange={handleChange} onBlur={handleBlur} />
                {errors.newPassword && touched.newPassword ? (<div className="error">{errors.newPassword}</div>) : null}

                <Field name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} component={ShowhidePassword}
                  onChange={handleChange} onBlur={handleBlur} />
                {errors.confirmPassword && touched.confirmPassword ? (<div className="error">{errors.confirmPassword}</div>) : null}

                <p style={{color:"red", fontSize:"14px"}}>{errorMessage}</p>
                <button type="submit">Change Password</button><br/>
                <p style={{color:"green", fontSize:"14px"}}>{successMessage}</p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

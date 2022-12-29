import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Must be 2 characters or more")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phoneNumber: Yup.number()
    .min(10, "Must be a 10 digit phone number")
    .required("Required"),

  password: Yup.string()
    .max(8, "Must be atleast 8 characters")
    .required("Required"),
  userRole: Yup.string().required("Required"),
  permanentAddress: Yup.string()
    .max(15, "Must be 2 characters or more")
    .required("Required"),
  temporaryAddress: Yup.string()
    .max(15, "Must be 2 charcters or more")
    .required("Required"),
  country: Yup.string()
    .max(15, "Must be 2 characters or more")
    .required("Required"),
  zipCode: Yup.number().min(5, "Must be a valid zip code").required("Required"),
});

const Register = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      <h3>Please sign up to get started</h3>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          userRole: "",
          permanentAddress: "",
          temporaryAddress: "",
          country: "",
          zipCode: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:5000/register", requestOptions)
            .then((res) => res.json())
            .then((data) => setMessage(data.msg));
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <div className="register">
            <Form className="row g-3">
              <div className="col-md-5">
                <label className="form-label" for="name">
                  Name
                </label>

                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </div>

              <div className="col-md-4">
                <label className="form-label" for="phoneNumber">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="+1(646)7879999"
                  className="form-control"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div>{errors.phoneNumber}</div>
                ) : null}
              </div>

              <div class="col-md-3">
                <label for="userRole" class="form-label">
                  User Role
                </label>
                <select id="userRole" class="form-select">
                  <option selected>select</option>
                  <option>User</option>
                  <option>Rider</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label" for="email">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className="col-md-4">
                <label className="form-label" for="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <div className="col-md-6">
                <label className="form-label" for="permanentAddress">
                  Permanent Address
                </label>
                <Field
                  name="permanentAddress"
                  id="permanentAddress"
                  placeholder="Enter your permanent address"
                  className="form-control"
                />
                {errors.permanentAddress && touched.permanentAddress ? (
                  <div>{errors.permanentAddress}</div>
                ) : null}
              </div>

              <div className="col-md-6">
                <label className="form-label" for="temporaryAddress">
                  Temporary Address
                </label>
                <Field
                  name="temporaryAddress"
                  id="temporaryAddress"
                  placeholder="Enter your temporary address"
                  className="form-control"
                />
                {errors.temporaryAddress && touched.temporaryAddress ? (
                  <div>{errors.temporaryAddress}</div>
                ) : null}
              </div>

              <div className="col-md-3">
                <label className="form-label" for="country">
                  Country
                </label>
                <Field
                  name="country"
                  id="country"
                  placeholder="Enter your country"
                  className="form-control"
                />
                {errors.country && touched.country ? (
                  <div>{errors.country}</div>
                ) : null}
              </div>

              <div className="col-md-2">
                <label type="number" className="form-label" for="zipCode">
                  Zip code
                </label>
                <Field
                  name="zipCode"
                  id="zipCode"
                  placeholder="zip code"
                  className="form-control"
                />
                {errors.zipCode && touched.zipCode ? (
                  <div>{errors.zipCode}</div>
                ) : null}
              </div>

              <div className="col=md-12">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>

              <h6>{message}</h6>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;

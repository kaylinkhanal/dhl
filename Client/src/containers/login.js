import React, { useState } from "react";
import { Formik, Form, Field, withFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(8, "Must be atleast 8 characters")
    .required("Required"),
});

const Login = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      {/* <h6>Please sign up to get started</h6> */}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onsubmit={(values, { resetForm }) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:5000/login", requestOptions)
            .then((res) => res.json())
            .then((data) => setMessage(data.msg));
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <div className="login">
            <Form className="row g-3">
              <div className="col-md-12">
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

              <div className="col-md-12">
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

              <div className="col=md-12">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;

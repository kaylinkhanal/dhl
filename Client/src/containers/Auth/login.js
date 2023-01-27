import React, { useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import ShowhidePassword from "../../components/showhidePassword";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../reducers/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const focusRef = useRef(null);

  const loginUser = async (values, resetForm) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/login`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (data.msg === "login success") {
      data.userDetails.token = data.token;
      dispatch(setUserDetails(data.userDetails));
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }
  };
  useEffect(() => {
    console.log(focusRef.current);
    focusRef.current.focus();
  });

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <section>
      <div className="container">
        <div className="form">
          <h1>Login</h1>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              loginUser(values);
              // resetForm()
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  innerRef={focusRef}
                />

                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}

                <Field
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  component={ShowhidePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

                <button type="submit">Login</button>
              </Form>
            )}
          </Formik>
          <p style={{ marginTop: "10px" }}>
            Dont have an account? <Link to="/register">Signup</Link> here
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "./Register.css";

YupPassword(Yup); // extend yup

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("please enter your name"),

  email: Yup.string().email("Invalid email").required("Required"),

  phoneNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),

  password: Yup.string()
    .min(8, "Minimum 8 words")
    .minLowercase(1, "Required lower case")
    .minUppercase(1, "Required upper case")
    .minNumbers(1, " At least 1 number")
    .minSymbols(1, " At least 1 special character"),

  country: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),

  zipCode: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),

  permanentAddress: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("please enter your permanent address"),

  temporaryAddress: Yup.string().min(2, "Too Short!").max(20, "Too Long!"),

  userRole: Yup.string().required("Required"),
});

const Register = () => (
  <div className="box">
    <h1>Register Form</h1>
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        country: "",
        zipCode: "",
        permanentAddress: "",
        temporaryAddress: "",
        userRole: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="inputField">
          <Form>
            <Field placeholder="Full Name" name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <br></br>

            <Field placeholder="E-mail" name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br></br>

            <Field placeholder="Phone Number" name="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br></br>

            <Field placeholder="Password" name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br></br>

            <Field placeholder="Country Name" name="country" />
            {errors.country && touched.country ? (
              <div>{errors.country}</div>
            ) : null}
            <br></br>

            <Field placeholder="Zip Code" name="zipCode" />
            {errors.zipCode && touched.zipCode ? (
              <div>{errors.zipCode}</div>
            ) : null}
            <br></br>

            <Field placeholder="Permanent Address" name="permanentAddress" />
            {errors.permanentAddress && touched.permanentAddress ? (
              <div>{errors.permanentAddress}</div>
            ) : null}
            <br></br>

            <Field placeholder="Temporary Address" name="temporaryAddress" />
            {errors.temporaryAddress && touched.temporaryAddress ? (
              <div>{errors.temporaryAddress}</div>
            ) : null}
            <br></br>

            <Field as="select" name="userRole">
              <option value="">select </option>
              <option value="User">User</option>
              <option value="Rider">Rider</option>
              <option value="Admin">Admin</option>
            </Field>

            <br></br>

            <button type="submit">Submit</button>
          </Form>
        </div>
      )}
    </Formik>
  </div>
);

export default Register;

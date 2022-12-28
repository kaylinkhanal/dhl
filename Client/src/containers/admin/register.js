



// import {useState} from 'react'
// const Register =()=> {
// const [name,setName] = useState('')
// const [ticket,setTicket] = useState('')
// const register = () => {
// //    fetch('http://localhost:3000/register')
//     const requestOptions = {
//         method: "POST",
//         headers: {
//         'Content-type': 'application/json'
//         },
//         body: JSON.stringify({name})
//     }
//    fetch('http://localhost:5000/sagar' , requestOptions)
// }
//     return (
//     <>
//       <input onKeyUp={(e)=> setName(e.target.value)} placeholder="enter full name"/>
//       <input onKeyUp={(e)=> setTicket(e.target.value)} placeholder="enter selected ticket"/>
//       <button onClick={()=>register()}>Register</button>
//      </>
//     );
//   }
  
//   export default Register;





import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
// import "./App.css";

YupPassword(Yup); // extend yup

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
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
  zipCode: Yup.number()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
    permanentAddress: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
    temporaryAddress: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
});

const register= () => (
  <div className="App">
    <h1>Signup</h1>
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
        <Form>
          <Field placeholder="Full Name" name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field placeholder="E-mail" name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field placeholder="Phone Number" name="phoneNumber" />
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <Field placeholder="Password" name="password" type="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <Field placeholder="Country Name" name="country" type="country" />
          {errors.country && touched.country ? (
            <div>{errors.country}</div>
          ) : null}
          <Field placeholder="TemporaryAddress" name="TemporaryAddress" type="TemporaryAddress" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field placeholder="PermanentAddress" name="PermanentAddress" type="PermanentAddress" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field placeholder="ZipCode" name="ZipCode" type="ZipCode" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field placeholder="userRole" name="userRole" type="userRole" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default register;

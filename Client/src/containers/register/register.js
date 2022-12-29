import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import '../style.css'
import { Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
      .email("Invalid name format"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .password("Password must be at least 8 characters"),
    // UserRole: Yup.string()
    //   .required("UserRole is a required field")
    //   .password("Password must be at least 8 characters"),
    permanentAddress : Yup.string()
      .required("Permanent is a required field"),
    temporaryAddress: Yup.string()
      .required("Temporary is a required field"),
    PhoneNumber: Yup.string()
      .required("Country field a required field")
      .min(10,"Phone Number be at least 10 characters"),
    Country: Yup.string()
      .required("Country field a required field"),
    zipCode: Yup.string()
      .required("Country field a required field")
    
    
    
  });
  
//   const handleSubmit=()=>{
//     <Navigate to="/home" replace={true} />
//   }

const Register=()=> {
    const [message, setMessage] = useState('')

    return (
        <div className='App'>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    permanentAddress:'',
                    temporaryAddress:'',
                    // userRole:'',
                    PhoneNumber:'',
                    Country:'',
                    zipCode:''
    }}
                validationSchema={loginSchema}

                onSubmit={(values, { resetForm }) => {
                    // console.log(values)

                    const requestOptions = {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }
                    fetch('http://localhost:5000/register', requestOptions)
                        .then(res => res.json())
                        .then(data => setMessage(data.msg))
                    resetForm()
                }}
            >
                {({ errors, touched }) => (
                    <div className='register'>
                        <Form>
                            <Field name="email" type="email" placeholder="Enter your email" />
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                            
                            <Field name="password" type="password" placeholder="Enter your password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                         <Field name="permanentAddress" type="text" placeholder="Enter your permanent address" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        <Field name="temporaryAddress" type="text" placeholder="Enter your temporary address" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        <Field name="PhoneNumber" type="number" placeholder="Enter your Phone Number" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                         <Field name="zipCode" type="number" placeholder="Enter your Zip code" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        
                        
                            {/* {errors.userRole && touched.userRole ? (
                                <div>{errors.userRole}</div>
                            ) : null} <br /> */}
                            
                           
                            <button className='btn btn-success' type="submit" >Login</button>
                            <h6> {message} </h6>

                        </Form>
                        <div>Not Register?</div>
            <Link to="/register" relative="">
      Register here!
    </Link>
                    </div>

                )}
                
                
            </Formik>
            
           
            </div>
    );
}

module.exports=Register
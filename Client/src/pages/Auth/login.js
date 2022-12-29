import { LoginSchema } from "../../schema/schema";
import React from 'react'
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom'
import classNames from "classnames";
import './auth.css'

const Login = () =>{
    return(
        <div className="main">
            <h1>Login Page</h1>
            <div className='login-div'>
            <div className='imageUpload'></div>   
            <Formik
                className='forms'
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
                >
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <Form className="forms">
                    <input
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classNames({
                        "form-control": true,
                        "is-valid": touched.email && !errors.email,
                        "is-invalid": touched.email && errors.email
                        })}
                        type="email"
                        name="email"
                        placeholder="Enter your Email address"
                    />
                    {touched.email && errors.email && (
                        <div className='error'>{errors.email}</div>
                    )}
                    <input
                        id="password"
                        className={classNames({
                          "form-control": true,
                          "is-valid": touched.password && !errors.password,
                          "is-invalid": touched.password && errors.password
                        })}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.password && (
                        <div className='error'>{errors.password}</div>
                      )}
                      
                    <button type="submit">Submit</button>
                    <p style={{ color: '#fff', marginTop: '10px' }}>Don't have an account? <Link to="/register" style={{ color: 'yellow'}}>SignUp</Link> here</p>
                    </Form>
                )}
                </Formik>

            </div>
        </div>
    )
}
export default Login
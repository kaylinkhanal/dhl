import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import '../style.css'


const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phoneNumber: Yup.number()
        // .min(10, 'Too Short!')
        // .max(15, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    userRole: Yup.string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    permanentAddress: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    temporaryAddress: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    country: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    zipCode: Yup.number()
        // .min(4, 'Too Short!')
        // .max(50, 'Too Long!')
        .required('Required'),

});

function Register() {
    const [message, setMessage] = useState('')

    return (
        <div className='App'>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    userRole: '',
                    permanentAddress: '',
                    temporaryAddress: '',
                    country: '',
                    zipCode: '',
                }}
                validationSchema={registerSchema}

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
                            <Field name="name" type="name" placeholder="Enter your name" />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <Field name="email" type="email" placeholder="Enter your email" />
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                            <Field name="phoneNumber" type="number" placeholder="Enter your phoneNumber" />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <div>{errors.phoneNumber}</div>
                            ) : null}
                            <Field name="password" type="password" placeholder="Enter your password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <Field as="select" name="userRole">
                                <option value="">select </option>
                                <option value="User">User</option>
                                <option value="Rider">Rider</option>
                                <option value="Admin">Admin</option>
                            </Field>
                            {/* {errors.userRole && touched.userRole ? (
                                <div>{errors.userRole}</div>
                            ) : null} <br /> */}
                            <Field name="permanentAddress" placeholder="Enter your permanentAddress" />
                            {errors.permanentAddress && touched.permanentAddress ? (
                                <div>{errors.permanentAddress}</div>
                            ) : null}
                            <Field name="temporaryAddress" placeholder="Enter your temporaryAddress" />
                            {errors.temporaryAddress && touched.temporaryAddress ? (
                                <div>{errors.temporaryAddress}</div>
                            ) : null}
                            <Field name="country" placeholder="Enter your country" />
                            {errors.country && touched.country ? (
                                <div>{errors.country}</div>
                            ) : null}
                            <Field name="zipCode" placeholder="Enter your zipCode" />
                            {errors.zipCode && touched.zipCode ? (
                                <div>{errors.zipCode}</div>
                            ) : null}
                            <button className='btn btn-success' type="submit">Register</button>
                            <h6> {message} </h6>
                        </Form>
                    </div>

                )}
            </Formik>
        </div>
    );
}

export default Register;

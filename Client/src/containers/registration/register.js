import React, { useState } from "react";
import '../../App.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
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
        <div className="App">
            <h1> Register Form</h1>
            <Formik
                initialValues={{
                    name: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    country: '',
                    zipCode: '',
                    permanentAddress: '',
                    temporaryAddress: '',
                    userRole: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values)
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }
                    fetch('http://localhost:5000/register', requestOptions).then(res => res.json())
                        .then(data => setMessage(data.msg))
                }}
            >
                {({ errors, touched }) => (
                    <div class ="form">
                    <Form>
                        <Field className="fields" name="name" placeholder="Name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <br></br> <br></br>
                        <Field className="fields" name="email" type="email" placeholder="Email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="password" type="password" placeholder="Password" />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="country" type="country" placeholder="Country" />
                        {errors.country && touched.country ? <div>{errors.country}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="phoneNumber" type="phoneNumber" placeholder="phoneNumber" />
                        {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="zipCode" type="zipCode" placeholder="ZipCode" />
                        {errors.zipCode && touched.zipCode ? <div>{errors.zipCode}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="permanentAddress" type="permanentAddress" placeholder="PermanentAddress" />
                        {errors.permanentAddress && touched.permanentAddress ? <div>{errors.permanentAddress}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="temporaryAddress" type="temporaryAddress" placeholder="TemporaryAddress" />
                        {errors.temporaryAddress && touched.temporaryAddress ? <div>{errors.temporaryAddress}</div> : null}
                        <br></br> <br></br>
                        <Field className="fields" name="userRole" type="userRole" placeholder="UserRole" />
                        {errors.userRole && touched.userRole ? <div>{errors.userRole}</div> : null}
                        <br></br> <br></br>
                        <button type="submit">Register</button>
                        <h1>{message}</h1>
                    </Form>
                    </div>
                )}
                
            </Formik>


        </div>
    );
}

export default Register;
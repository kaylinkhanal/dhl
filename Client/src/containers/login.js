import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import './style.css'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),

});

const Login=()=> {
    const [message, setMessage] = useState('')

    return (
        <div className='App'>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}

                onSubmit={(values, { resetForm }) => {
                    // console.log(values)

                    const requestOptions = {
                        method: "GET",
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
                    <div className='Login'>
                        <Form>
                            <Field name="email" type="email" placeholder="Enter your email" />
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                            <br/>
                            <Field name="password" type="password" placeholder="Enter your password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <br/>
                            <button className='btn btn-success' type="submit">Login</button>
                            <h6> {message} </h6>
                        </Form>
                    </div>

                )}
            </Formik>
        </div>
    );
}

export default Login;
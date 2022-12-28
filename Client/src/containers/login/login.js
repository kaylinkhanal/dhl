import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import '../style.css'

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

});

const Login= () =>{
    const [message, setMessage] = useState('')

    return (
        <div className='App'>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
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
                    fetch('http://localhost:5000/login', requestOptions)
                        .then(res => res.json())
                        .then(data => setMessage(data.msg))
                    resetForm()
                }}
            >
                {({ values, errors, touched, isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    dirty, }) => (
                                    <div className='register'>
                        <Form>
                        <input
                            id="email"
                            placeholder="Enter your email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                            errors.email && touched.email ? (
                                'text-input error'
                            ) : (
                                'text-input'
                            )
                            }
                        />
                        {errors.email &&
                        touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                            
                            <Field name="password" type="password" placeholder="Enter your password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            
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

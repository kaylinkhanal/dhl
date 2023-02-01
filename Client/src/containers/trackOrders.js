import React, { useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { message } from "antd";
import TrackOrderStatus from "./trackOrderStatus";

const TrackOrder = () => {
    const navigate = useNavigate();
    const trackOrder = async (fieldValues) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fieldValues),
        };

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/trackorders`, requestOptions);
        const data = await response.json();
        console.log(data);
        if (data) {
            message.success(data.msg)
            navigate('/trackOrderStatus')
        }
    }
    const SignupSchema = Yup.object().shape({
        orderId: Yup.string().required('Required'),
        receipentNumber: Yup.number().required('Required'),
    });

    return (
        <section>
            <div className='container'>
                <div className='form'>
                    <h1>Track Your Order</h1>
                    <Formik
                        initialValues={{
                            orderId: '',
                            receipentNumber: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { resetForm }) => {
                            trackOrder(values)
                            // resetForm()
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="orderId" placeholder="Enter orderId" value={values.orderId} onChange={handleChange} onBlur={handleBlur} />
                                {errors.orderId && touched.orderId ? (<div className="error">{errors.orderId}</div>) : null}

                                <Field
                                    name="receipentNumber"
                                    placeholder="Enter Your Number"
                                    value={values.receipentNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.receipentNumber && touched.receipentNumber ? (
                                    <div className="error">{errors.receipentNumber}</div>
                                ) : null}

                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};
export default TrackOrder

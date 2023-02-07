import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Steps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { message } from "antd";
import statusMapping from "../configs/statusMapping.json"
import { BiRun } from "react-icons/bi";
import { GiCardPickup } from "react-icons/gi";
import { TbTruckDelivery, TbClipboardCheck } from "react-icons/tb";
import { MdOutlineFactCheck } from "react-icons/md";

const TrackOrder = () => {

    const navigate = useNavigate();
    const [deliveryStatus, setDeliveryStatus] = useState('')
    console.log(statusMapping[deliveryStatus])
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
            setDeliveryStatus(data.deliveryDetails)
            // navigate('/trackOrderStatus')
        }
    }
    const SignupSchema = Yup.object().shape({
        orderId: Yup.string().required('Required'),
        phoneNumber: Yup.number().required('Required'),
    });

    return (
        <section>
            <div className='container'>
                <div className='form'>
                    <h1>Track Your Order</h1>
                    <Formik
                        initialValues={{
                            orderId: '',
                            phoneNumber: ''
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
                                    name="phoneNumber"
                                    placeholder="Enter Your Number"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className="error">{errors.phoneNumber}</div>
                                ) : null}

                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>

                {deliveryStatus ? (<Steps
                    size="small"
                    current={statusMapping[deliveryStatus]}
                    items={[
                        {
                            title: "Approved / pending",
                            description: (deliveryStatus == 'pending') ? 'Your order is not yet approved' : 'item has been approved',
                            icon: <TbClipboardCheck />
                        },
                        {
                            title: "riderOnHisWay",
                            description: (deliveryStatus == 'riderOnHisWay') ? 'Rider id oh his way' : '',
                            icon: <BiRun />
                        },
                        {
                            title: "riderPickedUp",
                            description: (deliveryStatus == 'riderPickedUp') ? 'Rider has picked up your order' : '',
                            icon: <GiCardPickup />
                        },
                        {
                            title: "productDispatched",
                            description: (deliveryStatus == 'productDispatched') ? 'Order has been dispatched to deliver' : '',
                            icon: <TbTruckDelivery />
                        },
                        {
                            title: "productDelivered",
                            description: (deliveryStatus == 'productDelivered') ? 'Order Delivered' : '',
                            icon: <MdOutlineFactCheck />
                        },
                    ]}
                />) : ''}
            </div>
        </section>
    );
};
export default TrackOrder

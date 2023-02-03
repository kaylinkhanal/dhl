import React, { useRef, useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import { message, Steps } from 'antd';
import { Link } from 'react-router-dom';
import statusMapping from "../../configs/statusMapping.json"
import { BiRun } from "react-icons/bi";
import { GiCardPickup } from "react-icons/gi";
import { TbTruckDelivery, TbClipboardCheck } from "react-icons/tb";
import { MdOutlineFactCheck } from "react-icons/md";

const TrackDelivery = () => {
    const inputRef = useRef();

    const [deliveryStatus, setDeliveryStatus] = useState('')
    const searchDelivery = async (values, resetForm) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        console.log(values);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/searchdelivery`, requestOptions);
        const data = await response.json();

        console.log(data, values);
        if (data) {
            setDeliveryStatus(data.deliveryDetails)
            message.success(data.msg);
        }
    }

    useEffect(() => {
        console.log(inputRef.current);
        inputRef.current.focus();
    }, [])

    return (
        <>
            <section>
                <div className='container'>
                    <div className='form'>
                        <h1>Track Your Delivery</h1>
                        <Formik
                            initialValues={{
                                trackID: '',
                                phone: ''
                            }}
                            onSubmit={(values, { resetForm }) => {
                                searchDelivery(values)
                                // resetForm()
                            }}
                        >

                            {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field name="trackID" placeholder="Enter track ID" innerRef={inputRef} value={values.trackID} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.trackID && touched.trackID ? (<div className="error">{errors.trackID}</div>) : null}

                                    <Field name="phone" placeholder="Enter phone number" value={values.phone} onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {errors.phone && touched.phone ? (<div className="error">{errors.phone}</div>) : null}
                                    <button type="submit">Search</button>
                                </Form>
                            )}
                        </Formik>
                        <p style={{ marginTop: "10px" }}><Link to="/">login</Link> here </p>
                    </div>
                </div>
            </section>

            <div className="container">
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

        </>

    )
}
export default TrackDelivery;
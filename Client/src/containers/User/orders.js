import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { message, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { FileUploader } from "react-drag-drop-files";
import Map from '../../components/map'

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const position = [51.505, -0.09]

const Orders = (props) => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    const { name, _id } = useSelector(state => state.user)
    const {currentDistace} = useSelector(state => state.location)

    const [deliveryPrice, setDeliveryPrice] = useState()
    const [productWeight, setProductWeight] = useState()
    const [productSize, setProductSize] = useState()

    const orderItem = async (formFields) => {
        const formData = new FormData()
        formData.append("orders", file);
        formData.append("userID", _id);
        formData.append("senderName", name);
        Object.keys(formFields).map((item, id) => {
            formData.append(item, Object.values(formFields)[id]);
        })
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
            method: "POST",
            body: formData,
        })
        const data = await res.json()

        if (data) {
            message.success(data.msg)
            props.isEdit ? props.onOk() : navigate('/orderslist')
        }
    }


    const saveFile = (file) => {
        setFile(file);
        console.log(file)
    };
    const OrderSchema = Yup.object().shape({
        productType: Yup.string().required('Required'),
        productWeight: Yup.string().required('Required'),
        maxSize: Yup.number().required('Required'),
        senderLocation: Yup.string().required('Required'),
        receipentLocation: Yup.string().required('Required'),
        receipentName: Yup.string().required('Required'),
        receipentNumber: Yup.number().required('Required'),
        expectedDeliveryDate: Yup.date().required('Required'),
        expectedDeliveryTime: Yup.string().required('Required'),
    });

    const price = (values) => {
        // program using switch statement
        let price
        const productType = values

        switch (productType) {
            case "electronics":
                if (productSize && productWeight) {
                    let newPrice = productSize * productWeight * currentDistace * 20
                    setDeliveryPrice(newPrice)
                }
                else {
                    price = 80
                    setDeliveryPrice(price)
                }
                break;
            case stationary:
                price = 40
                setDeliveryPrice(price)
                break;
            case jewelleries:
                price = 70
                setDeliveryPrice(price)
                break;
            case clothing:
                price = 50
                setDeliveryPrice(price)
                break;
            case documents:
                price = 70
                setDeliveryPrice(price)
                break;
            default:
                price = NaN
                setDeliveryPrice(price)
                break;
        }
    }

    return (
        <section className='form_section'>
            <div className='container'>
                <Map />
                <div className='form'>
                    <h1>{!props.isEdit ? 'Make your' : 'Edit'} order</h1>


                    <Formik
                        initialValues={props.item ? {
                            _id: props.item._id,
                            productType: props.item.productType,
                            productWeight: props.item.productWeight,
                            maxSize: props.item.maxSize,
                            senderLocation: props.item.senderLocation,
                            receipentLocation: props.item.receipentLocation,
                            receipentName: props.item.receipentName,
                            receipentNumber: props.item.receipentNumber,
                            expectedDeliveryDate: dayjs(props.item.expectedDeliveryDate),
                            expectedDeliveryTime: props.item.expectedDeliveryTime
                        } : {
                            productType: '',
                            productWeight: '',
                            maxSize: '',
                            deliveryPrice: deliveryPrice,
                            senderLocation: '',
                            receipentLocation: '',
                            receipentName: '',
                            receipentNumber: '',
                            expectedDeliveryDate: '',
                            expectedDeliveryTime: ''
                        }}
                        validationSchema={OrderSchema}
                        enableReinitialize={true}
                        onSubmit={values => {
                            orderItem(values)
                        }}
                    >

                        {({ errors, touched, values, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <select name="productType" value={values.productType} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Product Type"></option>
                                    <option value="documents" label="Documents">Documents</option>
                                    <option value="clothing" label="Clothing">Clothing</option>
                                    <option value="jewelleries" label="Jewelleries">Jewelleries</option>
                                    <option value="stationary" label="Stationary">Stationary</option>
                                    <option value="electronics" label="Electronics">Electronics</option>
                                    <option value="furniture" label="Furniture">Furniture</option>
                                    <option value="other" label="Other">Other</option>
                                </select>
                                {errors.productType && touched.productType ? (<div className="error">{errors.productType}</div>) : null}

                                <Field name="productWeight" placeholder="Product Weight" onKeyUp={(e) => setProductWeight(e.target.values)}
                                    value={values.productWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.productWeight && touched.productWeight ? (<div className="error">{errors.productWeight}</div>) : null}

                                <Field name="maxSize" placeholder="Max Size (in meters)" onKeyUp={(e) => setProductSize(e.target.values)}
                                value={values.maxSize} onChange={handleChange} onBlur={handleBlur} />
                                {errors.maxSize && touched.maxSize ? (<div className="error">{errors.maxSize}</div>) : null}

                                <Field name="senderLocation" placeholder="Sender Location" value={values.senderLocation} onChange={handleChange} onBlur={handleBlur} />
                                {errors.senderLocation && touched.senderLocation ? (<div className="error">{errors.senderLocation}</div>) : null}

                                <Field name="deliveryPrice" placeholder="Delivery Price" value={values.deliveryPrice} onChange={handleChange} onBlur={handleBlur} />
                                {errors.deliveryPrice && touched.deliveryPrice ? (<div className="error">{errors.deliveryPrice}</div>) : null}


                                <Field name="receipentLocation" placeholder="Receipent Location" value={values.receipentLocation} onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipentLocation && touched.receipentLocation ? (<div className="error">{errors.receipentLocation}</div>) : null}

                                <Field name="receipentName" placeholder="Receipent Name" value={values.receipentName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipentName && touched.receipentName ? (<div className="error">{errors.receipentName}</div>) : null}

                                <Field name="receipentNumber" placeholder="Receipent Number" value={values.receipentNumber} onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipentNumber && touched.receipentNumber ? (<div className="error">{errors.receipentNumber}</div>) : null}

                                <DatePicker onChange={(date) => setFieldValue('expectedDeliveryDate', date)} name="expectedDeliveryDate" placeholder="Expected Delivery Date" value={values.expectedDeliveryDate} />
                                {errors.expectedDeliveryDate && touched.expectedDeliveryDate ? (<div className="error">{errors.expectedDeliveryDate}</div>) : null}

                                <select name="expectedDeliveryTime" value={values.expectedDeliveryTime} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Expected Delivery Time"></option>
                                    <option label="12pm-3pm">12pm-3pm</option>
                                    <option label="3pm-6pm">3pm-6pm</option>
                                    <option label="6pm-9pm">6pm-9pm</option>
                                    <option label="9pm-12am">9pm-12am</option>
                                    <option label="12am-3am">3pm-6pm</option>
                                    <option label="3am-6am">3am-6am</option>
                                    <option label="6am-9am">6am-9am</option>
                                    <option label="9am-12pm">9am-12pm</option>
                                </select>
                                <FileUploader handleChange={saveFile} type="file" types={fileTypes} />

                                {errors.expectedDeliveryTime && touched.expectedDeliveryTime ? (<div className="error">{errors.expectedDeliveryTime}</div>) : null}
                                <button type="submit">{!props.isEdit ? 'Send' : 'Edit'} order</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
export default Orders
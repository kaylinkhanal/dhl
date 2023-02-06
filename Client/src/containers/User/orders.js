import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { json, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { message, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { FileUploader } from "react-drag-drop-files";
import Map from '../../components/Map/map';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Orders = (props) => {
    const [file, setFile] = useState(null);
    const [selectedCat, setSelectedCat] = useState({})
    const [categories, setCategories] = useState([])
    
    const fetchCategories = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`);
        const data = await response.json()
        if (data) {
            setCategories(data.categoryList)
        }
    }

    useEffect(() => {
       fetchCategories()
    }, [])

    const navigate = useNavigate()
    const { name, _id } = useSelector(state => state.user)
    const { currentDistance,
        senderLocationDetails,
        recepientLocationDetails,
        senderAddress,
        receipentAddress,
    } = useSelector(state => state.location)

    const orderItem = async (formFields) => {
        if(props.isEdit){
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formFields),
            })
            const data = await res.json()
            if (data) {
                message.success("success")
            }
        }else{
            const formData = new FormData();
            formData.append("orders", file);
            formData.append("userID", _id);
            formData.append("senderName", name);
            formData.append("currentDistance", currentDistance);
            formData.append("senderLocationDetails", JSON.stringify(senderLocationDetails));
            formData.append("recepientLocationDetails", JSON.stringify(recepientLocationDetails));
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
                props.isEdit ? props.onOk() : navigate('/userOrderslist')
            }
        }

    }


    const saveFile = (file) => {
        setFile(file);
        console.log(file)
    };
    const OrderSchema = Yup.object().shape({
        productType: Yup.string().required('Required'),
        productWeight: Yup.number()
        .typeError("Must be a number")
        .required("Required")
        .test("maxLength", "mininum weight should be " + selectedCat.minWeight, (val,allFormFields) => {
            const selectedFieldMinWeight = categories.find((item)=> item.categoryName===allFormFields.parent.productType ).minWeight 
            if(selectedFieldMinWeight<=val){
                return true
            }
            return false
        }),
        // maxSize: Yup.number().required('Required'),
        senderLocation: Yup.string().required('Required'),
        receipentLocation: Yup.string().required('Required'),
        receipentName: Yup.string().required('Required'),
        receipentNumber: Yup.number().required('Required'),
        expectedDeliveryDate: Yup.date().required('Required'),
        expectedDeliveryTime: Yup.string().required('Required'),
    });

    return (
        <section className='form_section'>
            <div className='container'>
                {!props.isEdit  && <Map />}
                <div className='form'>
                    <h1>{!props.isEdit ? 'Make your' : 'Edit'} order</h1>

                    <Formik
                        initialValues={props.item ? {
                            _id: props.item._id,
                            productType: props.item.productType,
                            productWeight: props.item.productWeight,
                            // maxSize: props.item.maxSize,
                            senderLocation: props.item.senderLocation,
                            receipentLocation: props.item.receipentLocation,
                            receipentName: props.item.receipentName,
                            receipentNumber: props.item.receipentNumber,
                            expectedDeliveryDate: dayjs(props.item.expectedDeliveryDate),
                            expectedDeliveryTime: props.item.expectedDeliveryTime
                        } : {
                            productType: '',
                            productWeight: '',
                            // maxSize: '',
                            senderLocation: senderAddress,
                            receipentLocation: receipentAddress,
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
                                    {categories.length > 0 ? categories.map((category) => {
                                        return <option  onClick={()=> setSelectedCat(category)}value={category.categoryName} label={category.categoryName}>{category.categoryName}</option>
                                    }) : null}
                                </select>
                                {errors.productType && touched.productType ? (<div className="error">{errors.productType}</div>) : null}

                                <Field name="productWeight" placeholder="Product Weight" value={values.productWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.productWeight && touched.productWeight ? (<div className="error">{errors.productWeight}</div>) : null}

                                {/* <Field name="maxSize" placeholder="Max Size (in meters)" value={values.maxSize} onChange={handleChange} onBlur={handleBlur} />
                                {errors.maxSize && touched.maxSize ? (<div className="error">{errors.maxSize}</div>) : null} */}

                                <Field name="senderLocation" placeholder="Sender Location" onChange={handleChange} onBlur={handleBlur} />
                                {errors.senderLocation && touched.senderLocation ? (<div className="error">{errors.senderLocation}</div>) : null}

                                <Field name="receipentLocation" placeholder="Receipent Location" onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipentLocation && touched.receipentLocation ? (<div className="error">{errors.receipentLocation}</div>) : null}
                                {currentDistance ? <h5>The distance is {currentDistance} KM</h5> : ''}
                                {currentDistance ? <h5>The estimated price is Rs. {selectedCat.unitPrice * values?.productWeight * currentDistance} </h5> : ''}
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
                                {!props.isEdit &&  <FileUploader handleChange={saveFile} type="file" types={fileTypes} />}
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
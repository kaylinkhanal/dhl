import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const Order = ()=>{
    // const navigate = useNavigate()

    const orderItem = async(values)=>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch('http://localhost:5000/order', requestOptions);
        const data = await response.json()

        if(data){
            alert(data.msg)
            // navigate('/Order')
        }
    }
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

return(
    <section className='form_section'>
        <div className='container'>
            <div className='form'>
                <h1>Make your order</h1>

                <Formik
                    initialValues={{
                        productType: '',
                        productWeight: '',
                        maxSize: '',
                        senderLocation: '',
                        receipentLocation: '',
                        receipentName: '',
                        receipentNumber: '',
                        expectedDeliveryDate: '',
                        expectedDeliveryTime: ''
                    }}
                    validationSchema={OrderSchema}
                    onSubmit={values=>{
                        orderItem(values)
                    }}
                >

                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                        <Form  onSubmit={handleSubmit}>
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

                            <Field name="productWeight" placeholder="Product Weight" value={values.productWeight} onChange={handleChange} onBlur={handleBlur} />
                            {errors.productWeight && touched.productWeight ? (<div className="error">{errors.productWeight}</div>) : null}

                            <Field name="maxSize" placeholder="Max Size (in meters)" value={values.maxSize} onChange={handleChange} onBlur={handleBlur} />
                            {errors.maxSize && touched.maxSize ? (<div className="error">{errors.maxSize}</div>) : null}

                            <Field name="senderLocation" placeholder="Sender Location" value={values.senderLocation} onChange={handleChange} onBlur={handleBlur} />
                            {errors.senderLocation && touched.senderLocation ? (<div className="error">{errors.senderLocation}</div>) : null}

                            <Field name="receipentLocation" placeholder="Receipent Location" value={values.receipentLocation} onChange={handleChange} onBlur={handleBlur} />
                            {errors.receipentLocation && touched.receipentLocation ? (<div className="error">{errors.receipentLocation}</div>) : null}

                            <Field name="receipentName" placeholder="Receipent Name" value={values.receipentName} onChange={handleChange} onBlur={handleBlur} />
                            {errors.receipentName && touched.receipentName ? (<div className="error">{errors.receipentName}</div>) : null}

                            <Field name="receipentNumber" placeholder="Receipent Number" value={values.receipentNumber} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.receipentNumber && touched.receipentNumber ? (<div className="error">{errors.receipentNumber}</div>) : null}

                            <Field name="expectedDeliveryDate" placeholder="Expected Delivery Date" value={values.expectedDeliveryDate} onChange={handleChange} onBlur={handleBlur} />
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
                            
                            {errors.expectedDeliveryTime && touched.expectedDeliveryTime ? (<div className="error">{errors.expectedDeliveryTime}</div>) : null}

                            <button type="submit">Send order</button>
                        </Form>
                    )} 
                </Formik>
            </div>
        </div>
    </section>
)
}

export default Order;
import React from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';

const WeightPriceForm = (props)=>{
    const addWeightPrice = async(values)=>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch('http://localhost:5000/weight', requestOptions);
        const data = await response.json()
        console.log(data)
        if(data){
            message.success(data.msg)
        }else{
            message.error(data.errmsg)
        }
    }
    const PriceSchema = Yup.object().shape({
		productWeight: Yup.number().required('Required'),
		productType: Yup.string().required('Required'),
        unitPrice: Yup.number().required('Required'),
	});
    return(
        <section>
            <div className='container'>
                <div className='form'>
                <h3>Add Weight Price per unit</h3>
                     
                    <Formik
                        initialValues={{
                            productWeight: '',
                            productType: '',
                            unitPrice: ''
                        }}
                        validationSchema={PriceSchema}
                        onSubmit={(values, { resetForm })=>{
                            addWeightPrice(values)
                            // resetForm()
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="productWeight" placeholder="Enter Weight(in kg)" value={values.productWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.productWeight && touched.productWeight ? (<div className="error">{errors.productWeight}</div>) : null}

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

                                <Field name="unitPrice" placeholder="Enter Price per unit" value={values.unitPrice} onChange={handleChange} onBlur={handleBlur} />
                                {errors.unitPrice && touched.unitPrice ? <div className="error">{errors.unitPrice}</div> : null}

                                <button type="submit">Add Price</button>
                            </Form>
                        )}
                    </Formik>
                    
                </div>
            </div>
        </section>
    )
}
export default WeightPriceForm
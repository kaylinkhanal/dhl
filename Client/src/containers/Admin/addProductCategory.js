import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import {  useNavigate } from 'react-router-dom';


const AddProductCategory = (props) => {
debugger
    const navigate = useNavigate()

    const addCategory = async (values) => {
        const requestOptions = {
            method:props.isEdit?"PUT": "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`, requestOptions);
        const data = await response.json()
        console.log(data)
        if (data.msg === 'Added new category') {
            message.success(data.msg)
            props.submitForm()
        } else if (data){
            message.success(data.msg)
            props.isEdit ? props.onOk() : navigate('/category')
        } else{
            message.error(data.msg)
        }
        props.fetchCategory()
        
    }

    const categorySchema = Yup.object().shape({
        categoryName: Yup.string().required('Required'),
        minWeight: Yup.number().required('Required'),
        unitPrice: Yup.number().required('Required'),
    });


    return (
        <section>
            <div className='container'>
                <div className='form'>
                    {/* <h3>Add Product Categories</h3> */}
                    <h1>{!props.isEdit ? 'Add Product Categories' : 'Edit'} Categories</h1>

                    <Formik
                        initialValues={props.item ||{
                            categoryName: '',
                            minWeight: '',
                            unitPrice: '', 
                        }}
                        validationSchema={categorySchema}
                        onSubmit={(values) => {
                            addCategory(values)
                        
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="categoryName" placeholder="Category Name" value={values.categoryName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.categoryName && touched.categoryName ? (<div className="error">{errors.categoryName}</div>) : null}

                                <Field name="minWeight" type="number" placeholder="Min. Product Weight (kg)" value={values.minWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.minWeight && touched.minWeight ? <div className="error">{errors.minWeight}</div> : null}


                                <Field name="unitPrice" type="number" placeholder="Unit Price" value={values.unitPrice} onChange={handleChange} onBlur={handleBlur} />
                                {errors.unitPrice && touched.unitPrice ? <div className="error">{errors.unitPrice}</div> : null}

                                <button type="submit">{!props.isEdit ? 'Add' : 'Edit'} Category</button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
export default AddProductCategory
import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';

const AddProductCategory = (props)=>{
    const addCategory = async(FieldValues)=>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FieldValues)
        };

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`, requestOptions);
        const data = await response.json()
        console.log(data)
        if(data.msg === 'Added new category'){
            message.success(data.msg)
            props.submitForm()
        }else{
            message.error(data.msg)
        }
    }

    const categorySchema = Yup.object().shape({
        categoryName: Yup.string().required('Required'),
        minWeight: Yup.number().required('Required'),
        minSize: Yup.number().required('Required'),
        minPrice: Yup.number().required('Required'),
    });


    return(
        <section>
            <div className='container'>
                <div className='form'>
                    <h3>Add Product Categories</h3>
                    <Formik
                        initialValues={{
                            categoryName: '',
                            minWeight: '',
                            minSize: '',
                            minPrice: '',
                        }}
                        validationSchema={categorySchema}
                        onSubmit={(values, { resetForm })=>{
                            addCategory(values)
                            // resetForm()
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="categoryName" placeholder="Category Name" value={values.categoryName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.categoryName && touched.categoryName ? (<div className="error">{errors.categoryName}</div>) : null}

                                <Field name="minWeight" type="number" placeholder="Min. Product Weight (kg)" value={values.minWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.minWeight && touched.minWeight ? <div className="error">{errors.minWeight}</div> : null}

                                <Field name="minSize" type="number" placeholder="Min. Product Size (in meter)" value={values.minSize} onChange={handleChange} onBlur={handleBlur} />
                                {errors.minSize && touched.minSize ? <div className="error">{errors.minSize}</div> : null}

                                <Field name="minPrice" type="number" placeholder="Min. Product Price" value={values.minPrice} onChange={handleChange} onBlur={handleBlur} />
                                {errors.minPrice && touched.minPrice ? <div className="error">{errors.minPrice}</div> : null}

                                <button type="submit">Add Category</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
export default AddProductCategory
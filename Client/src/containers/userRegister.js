import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().phoneNumber('Invalid phoneNumber').required('Required'),
  password: Yup.string().password('Invalid password').required('Required'),
  permanentAddress: Yup.string().permanentAddress('Invalid  permanentAddress').required('Required'),
  temporaryAddress: Yup.string().temporaryAddress('Invalid temporaryAddress'),
  country: Yup.string().country('Invalid country').required('Required'),
  zipCode: Yup.string().zipCode('Invalid zipCode').required('Required'),
});

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        userName: '',
        email: '',
        phoneNumber:'',
        password:'',
        permanentAddress:'',
        temporaryAddress:'',
        country:'',
        zipCode:''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="userName"/>
          {errors.userName && touched.userName ? (
            <div>{errors.userName}</div>
          ) : null}
          <Field name="email" type="email"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="phoneNumber"/>
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
           <Field name="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
           <Field name="permanentAddress"/>
          {errors.permanentAddress && touched.permanentAddress ? (
            <div>{errors.permanentAddress}</div>
          ) : null}
           <Field name="temporaryAddress"/>
          {errors.temporaryAddress && touched.temporaryAddress ? (
            <div>{errors.temporaryAddress}</div>
          ) : null}

           <Field name="country"/>
          {errors.country && touched.country ? (
            <div>{errors.country}</div>
          ) : null}
           <Field name="zipCode"/>
          {errors.zipCode && touched.zipCode ? (
            <div>{errors.zipCode}</div>
          ) : null}
          
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)


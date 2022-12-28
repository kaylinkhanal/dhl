import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.number()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    password: Yup.string()
     .required('No password provided.') 
     .min(8, 'Password is too short - should be 8 chars minimum.')
     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    country: Yup.string()
     .required('required'),
    zipcode: Yup.number()
     .max(4,'Invalid!')
     .required('required'),
    permanentAddress: Yup.string()
     .required('required'),
    temporaryAddress: Yup.string()
     .required('required'),
    userRole: Yup.string()
     .required('required')
 });
 
 const Register = () => (
   <div>
     <h1>Signup</h1>
     <Formik
       initialValues={{
         name: '',
         email: '',
         phoneNumber:'',
         password:'',
         country:'',
         zipcode:'',
         permanentAddress:'',
         temporaryAddress:'',
         userRole:''
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="name" placeholder="Enter Name"/>
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : null}
           <br/>
           <Field name="email" placeholder="Enter your Email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <br/>
           <Field name="phoneNumber" placeholder="Enter Phone number"/>
           {errors.phoneNumber && touched.phoneNumber ? (
             <div>{errors.phoneNumber}</div>
           ) : null}
           <br/>
           <Field name="password" placeholder="Enter password"/>
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
           <br/>
           <Field name="country" placeholder="Enter country"/>
           {errors.country && touched.country ? (
             <div>{errors.country}</div>
           ) : null}
           <br/>
           <Field name="zipcode" placeholder="Enter zipcode"/>
           {errors.zipcode && touched.zipcode ? (
             <div>{errors.zipcode}</div>
           ) : null}
           <br/>
           <Field name="permanentAddress" placeholder="Enter permanentAddress"/>
           {errors.permanentAddress && touched.permanentAddress ? (
             <div>{errors.permanentAddress}</div>
           ) : null}
           <br/>
           <Field name="temporaryAddress" placeholder="Enter temporaryAddress"/>
           {errors.temporaryAddress && touched.temporaryAddress ? (
             <div>{errors.temporaryAddress}</div>
           ) : null}
           <br/>
           <Field name="userRole" placeholder="Enter userRole"/>
           {errors.userRole && touched.userRole ? (
             <div>{errors.userRole}</div>
           ) : null}
           <br/>
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );

 export default Register;
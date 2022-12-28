import React from 'react'
import { Formik, Form } from 'formik';
import { RegisterSchema } from '../../schema/schema';
import classNames from "classnames";
import './auth.css'
import { Link } from 'react-router-dom'
import { Country } from '../../countryJson/country';

const Register = () =>{
    
  const registerUsers = async(values)=>{
    

    return(
        <div>
          <div className='main-div'>
            <h1>Register Page</h1>            
            <Formik
                className='forms'
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword:'',
                    userRole: '',
                    permanentAddress: '',
                    temporaryAddress: '',
                    country: '',
                    zipCode: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={values => {
                    // same shape as initial values
                    registerUsers(values);
                }}
                >
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <Form>
                    <input name="name" 
                    type="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {errors.name && touched.name ? (
                        <div className='error'>{errors.name}</div>
                    ) : null}
                    <input name="phoneNumber"
                      placeholder="Enter Phone No." 
                      value={values.phoneNumber} 
                      onChange={handleChange} 
                      onBlur={handleBlur}/>
                    {errors.phoneNumber && touched.phoneNumber ? (
                        <div className='error'>{errors.phoneNumber}</div>
                    ) : null}
                    <input
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classNames({
                        "form-control": true,
                        "is-valid": touched.email && !errors.email,
                        "is-invalid": touched.email && errors.email
                        })}
                        type="email"
                        name="email"
                        placeholder="Enter your Email address"
                    />
                    {touched.email && errors.email && (
                        <div className='error'>{errors.email}</div>
                    )}
                    <input
                        id="password"
                        className={classNames({
                          "form-control": true,
                          "is-valid": touched.password && !errors.password,
                          "is-invalid": touched.password && errors.password
                        })}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.password && (
                        <div className='error'>{errors.password}</div>
                      )}
                      <input
                        id="confirmPassword"
                        // className={classNames({
                        //   "form-control": true,
                        //   "is-valid": touched.confirmPassword && !errors.confirmPassword,
                        //   "is-invalid": touched.confirmPassword && errors.confirmPassword
                        // })}
                        type="password"
                        name="confirmPassword"
                        placeholder="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className='error'>{errors.confirmPassword}</div>
                      )}
                      <select
                        name="userRole"
                        type="userRole"
                        style={{ display: 'block' }}
                        value={values.userRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" label="Select role" />
                        <option value="user" label="User" />
                        <option value="rider" label="Rider" />
                      </select>
                      {errors.userRole &&
                        touched.userRole &&
                        <div className='error'>
                          {errors.userRole}
                        </div>}
                      <input
                        type="permanentAddress"
                        name="permanentAddress"
                        placeholder="Enter your permanent address"
                        value={values.permanentAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className='error'>
                        {errors.permanentAddress}
                      </span>
                      <input
                        type="temporaryAddress"
                        name="temporaryAddress"
                        placeholder="Enter your temporary address"
                        value={values.temporaryAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className='error'>
                        {errors.temporaryAddress}
                      </span>
                      <select
                        name="country"
                        type="country"
                        style={{ display: 'block' }}
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {Country.map((item, id)=>{
                          return( <>
                          <option item={item.name} label="Select Country" />
                          </>)
                        })}
                        
                      </select>
                      {errors.country &&
                        touched.country &&
                        <div className='error'>
                          {errors.country}
                        </div>}
                      <div className='zipCode'>
                        <input
                          type="zipCode"
                          name="zipCode"
                          placeholder="Enter zip code"
                          value={values.zipCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className='error'>
                          {errors.zipCode}
                        </div>
                      </div>
                      
                    <button type="submit">Submit</button>
                    <p style={{ color: '#fff', marginTop: '10px' }}>Already have an account? <Link to="/login" style={{ color: 'yellow'}}>SignIn</Link> here</p>
                    </Form>
                )}
                </Formik>

            </div>
            
            </div>
        
    )
}

export default Register
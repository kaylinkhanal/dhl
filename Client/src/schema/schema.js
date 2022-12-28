import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
    phoneNumber: Yup.number()
    //   .min(2, 'Too Short!')
    //   .max(10, 'Too Long!')
      .required('Phone Number is required'),
    password: Yup.string()
      .min(6,"Password must be at least 8 characters")
      .required("Please enter your password"),
    confirmpassword: Yup.string()
    .required('Confirm Password is required')
    .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )}),
    userRole: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    permanentAddress: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Permanent Address is required'),
    temporaryAddress: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Temporary Address is required'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    zipCode: Yup.number()
    //   .min(2, 'Too Short!')
    //   .max(6, 'Too Long!')
      .required('Zip Code is required'),
  });


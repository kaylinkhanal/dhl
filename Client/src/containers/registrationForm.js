import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Must be 5 characters or more")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phoneNumber: Yup.number()
    .min(10, "Must be at least 10 digits")
    .required("Required"),
  password: Yup.string()
    .max(8, "Must be minimum 8 characters")
    .required("Required"),
  userRole: Yup.string().required("Required"),
  permanentAddress: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  temporaryAddress: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  country: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  zipCode: Yup.number().min(5, "Must be a valid zip code").required("Required"),
});

const RegistrationForm = () => {
  return (
    <div>
      <h4>Please sign up to get started</h4>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          userRole: "",
          permanentAddress: "",
          temporaryAddress: "",
          country: "",
          zipCode: "",
        }}
        validationSchema={SignupSchema}
        onsubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:5000/register", requestOptions)
            .then((res) => res.json())
            .then((data) => alert(data.msg));
        }}
      >
        {({ errors, touched }) => (
          <Form class="row g-3">
            <div class="col-md-4">
              <label for="inputName" class="form-label">
                <i className="zmdi zmdi-account material-icons-name"></i>
              </label>

              <Field
                name="name"
                class="form-control"
                id="inputName"
                placeholder="Name"
              />
              {errors.name && touched.name ? <div>{errors.name} </div> : null}
            </div>

            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                <i className="zmdi zmdi-email material-icons-email"></i>
              </label>

              <Field
                name="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div>{errors.email} </div>
              ) : null}
            </div>

            <div class="col-md-3">
              <label for="inputPhoneNumber" class="form-label">
                <i className="zmdi zmdi-phone-in-talk material-icons-phone"></i>
              </label>

              <Field
                name="phoneNumber"
                class="form-control"
                id="inputPhoneNumber"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber} </div>
              ) : null}
            </div>

            <div class="col-md-3">
              <label for="inputPassword4" class="form-label">
                <i className="zmdi zmdi-lock material-icons-name"></i>
              </label>

              <Field
                name="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password} </div>
              ) : null}
            </div>

            <div class="col-md-2">
              <label for="inputUserRole" class="form-label">
                <i className="zmdi zmdi-slideshow material-icons-name"></i>
              </label>

              <Field
                name="userRole"
                class="form-control"
                id="inputUserRole"
                placeholder="User role"
              />
              {errors.userRole && touched.userRole ? (
                <div>{errors.userRole} </div>
              ) : null}
            </div>

            <div class="col-5">
              <label for="inputPermanentAddress" class="form-label">
                <i className="zmdi zmdi-home material-icons-name"></i>
              </label>

              <Field
                name="permanentAddress"
                class="form-control"
                id="inputPermanentAddress"
                placeholder="Permanent Address"
              />
              {errors.permanentAddress && touched.permanentAddress ? (
                <div>{errors.permanentAddress} </div>
              ) : null}
            </div>

            <div class="col-5">
              <label for="inputTemporaryAddress" class="form-label">
                <i className="zmdi zmdi-home material-icons-name"></i>
              </label>

              <Field
                name="temporaryAddress"
                class="form-control"
                id="inputTemporaryAddress"
                placeholder="Temporary Address"
              />
              {errors.temporaryAddress && touched.temporaryAddress ? (
                <div>{errors.temporaryAddress} </div>
              ) : null}
            </div>

            <div class="col-md-3">
              <label for="inputCountry" class="form-label">
                <i className="zmdi zmdi-globe material-icons-name"></i>
              </label>

              <Field
                name="country"
                class="form-control"
                id="inputCountry"
                placeholder="Country"
              />
              {errors.country && touched.country ? (
                <div>{errors.country} </div>
              ) : null}
            </div>

            <div class="col-md-2">
              <label for="inputZipCode" class="form-label">
                <i className="zmdi zmdi-pin material-icons-name"></i>
              </label>

              <Field
                name="zipCode"
                class="form-control"
                id="inputZipCode"
                placeholder="Zip code"
              />
              {errors.zipCode && touched.zipCode ? (
                <div>{errors.zipCode} </div>
              ) : null}
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;

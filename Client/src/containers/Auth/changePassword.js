import { Formik, Field, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ShowhidePassword from "../../components/showhidePassword";
import { useSelector } from "react-redux";
import {responseHandler} from "../../utils/responseHandler"
const ChangePassword = () => {
  const [isPasswordMatched, setIsPasswordMatched] = useState("");
  const email = useSelector((state) => state.user.email);
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(6)
      .matches(passwordRule, { message: "Please create a stronger password" }),
    confirmPassword: Yup.string().required("Required"),
  });


  const changingPassword = async (values) => {
    try{
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
  
      const response = await fetch(
        "http://localhost:5000/changepassword",
        requestOptions
      );
      const statusMessage = responseHandler(response)
      alert(JSON.stringify(statusMessage))

    }catch(err){
      console.log(err)
    }
  };

  return (
    <section>
      <div className="container">
        <div className="form">
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={(values, { resetForm }) => {
              values.email = email;
              if (values.newPassword === values.confirmPassword) {
                changingPassword(values);
                resetForm();
              } else {
                setIsPasswordMatched("Password doesn't match");
              }
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={values.currentPassword}
                  component={ShowhidePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.currentPassword && touched.currentPassword ? (
                  <div className="error">{errors.currentPassword}</div>
                ) : null}

                <Field
                  name="newPassword"
                  placeholder="Enter new passoword"
                  value={values.newPassword}
                  component={ShowhidePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.newPassword && touched.newPassword ? (
                  <div className="error">{errors.newPassword}</div>
                ) : null}
                <Field
                  name="confirmPassword"  
                  placeholder="Enter confirm password"
                  value={values.confirmPassword}
                  component={ShowhidePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="error">{errors.confirmPassword}</div>
                ) : null}

                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  {isPasswordMatched}
                  <br></br>
                </div>
                <button type="submit">confirm</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

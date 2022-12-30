import React from "react";
import { Formik, Form, Field } from "formik";
import "bootstrap/dist/css/bootstrap.css";
  
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Formik initialValues={{ email: "", password: "" }}>
              {(props) => (
                <div>
                  {console.log(props)}
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">Login Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="off"
                      />
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="password" className="mt-3">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                      />
                    </div>
  
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Submit
                    </button>
                    
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
  
export default App;



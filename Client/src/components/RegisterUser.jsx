import React from "react";
import "../style/registerUser.css";
import logo from "../img/userIcon.png";

const RegisterUser = () => {

  return (
    <>
    <div className="main-registration">
        <div className="registration-card">
            <div className="registration-card-image">
                <img src={logo} alt="logo" />
            </div>
            <div className="registration-header">
                <h2>Sign In</h2>
                <h5>Register the form to use the app</h5>
            </div>


            <form method="POST" className="registration-card-form">
                <div className="form-item">
                    <span className="form-item">Name:</span>
                    <input type="text" placeholder="Enter Your Name" autoFocus required/>
                </div>
                <div className="form-item">
                    <span className="form-item">Email:</span>
                    <input type="email" placeholder="Enter Your Email" required />
                </div>
                <div className="form-item">
                    <span className="form-item">Phone Number:</span>
                    <input type="number" placeholder="Enter Your Phone Number" required />
                </div>
                <div className="form-item">
                    <span className="form-item">Permanent Address:</span>
                    <input type="text" placeholder="Enter Your Permanent Address" required />
                </div>
                <div className="form-item">
                    <span className="form-item">Temporary Address:</span>
                    <input type="text" placeholder="Enter Your Temporary Address" required />
                </div>
                <div className="form-item">
                    <span className="form-item">Zip Code:</span>
                    <input type="number" placeholder="Enter Your Zip Code" required />
                </div>
                <div className="form-item">
                    <span className="form-item">Password:</span>
                    <input type="password" placeholder="Enter Your Password" required />
                </div>
                <div className="submit-btn">
                <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default RegisterUser;

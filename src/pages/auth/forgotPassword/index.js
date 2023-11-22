import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FORGOT_PASSWORD } from "../../../redux/actions/authentication";
import Images from "../../../constants/images";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  BiErrorCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function ForgotPassword() {
  // FORM DATA
  const [credidentials, setCredidentials] = useState({
    email: "",
  });
  console.log(credidentials, "LoginData")
  localStorage.setItem("email", credidentials.email)
  const navigate = useNavigate();
  // IS LOADING
  const [isLoading, setLoading] = useState(false);
  
  const [error, setError] = useState(null); // State to store the error message
  const [modalShow, setModalShow] = React.useState(false);
   const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // SETTING STATE WITH INPUT
  const onchange = (e) => {
    setCredidentials({ ...credidentials, [e.target.name]: e.target.value });
  };


  // ...

  // FORM SUBMISSION
  const onsubmit =  (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(FORGOT_PASSWORD(credidentials, setLoading, navigate))
      navigate('/reset-password', { state: { credidentials } })
    } catch (error) {
      setError(error); // Set the error message if there's an error
      setModalShow(true); // Show the modal
      console.log("Error from Forgot Password", error);
    }
 
  };

  return (
    <>

      <div
        className="container-fluid auth-back d-flex justify-content-center py-5"
        style={{
          textAlign: "left",
          position: "relative",
        }}
      >
        <img
          src={Images.Pictures.brownLeftLeaf}
          style={{
            position: "absolute",
            bottom: "-15rem",
            left: "3rem",
            width: "55rem",
          }}
          alt="BACKGROUND LEFT LEAF"
        />
        <div
          className="col-lg-6 col-md-8 col-sm-12 dark-card auth-card d-flex my-5 "
          style={{ height: "62rem" }}
        >
          <div className="row g-4 mt-md-1 p-5">
            <div className="col-12 text-center">
              <h2 className="fs-2">Forgot Password</h2>
            </div>
            <form onSubmit={onsubmit}>
              <div className="col-md-12">
                <label htmlFor="email" className="form-label">
                  Email or Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={credidentials.email}
                  onChange={onchange}
                  name="email"
                  placeholder="Enter your Email"
                  required
                />
              </div>
         
              <div className="col-md-12 my-5 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#14a384" }}>
                    Sign up
                  </Link>
                </p>
              </div>
              <div className="col-md-12 mt-3 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-block btn-solid btn-solid-primary-rounded my-3"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

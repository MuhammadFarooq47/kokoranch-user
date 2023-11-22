import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { OTP_VERIFY } from "../../../redux/actions/authentication";
import Images from "../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiErrorCircle } from "react-icons/bi";
import OtpInput from "react-otp-input";


export default function ResetPassword() {

  const {user} = useSelector((state) => state.authReducer);

  // console.log("user khugy", user)
  const location = useLocation();
  const forgotPasswordScreencredidentials = location?.state?.credidentials;
  console.log("Screen A credintials", forgotPasswordScreencredidentials?.email);
  // FORM DATA
  // const [credidentials, setCredidentials] = useState({
  //   email: forgotPasswordScreencredidentials.email,
  //   otpCode:""
  // });

  // console.log("Credentials ...............", credidentials)

  const [email, setEmail] = useState(localStorage.getItem("email"));
  console.log("useState Email", email);
  const [otpCode, setOtpCode] = useState();
  // console.log("use State Otp", otpCode)

  const navigate = useNavigate();
  // IS LOADING
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // SETTING STATE WITH INPUT
  // const onchange = (e) => {
  //   setCredidentials({ ...credidentials, [e.target.name]: e.target.value });
  // };

  const [error, setError] = useState(null); // State to store the error message
  const [modalShow, setModalShow] = React.useState(false);
  // ...

  // FORM SUBMISSION
  // const onsubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     dispatch(OTP_VERIFY(...credidentials, setLoading, navigate));
  //   } catch (error) {
  //     setError(error); // Set the error message if there's an error
  //     setModalShow(true); // Show the modal
  //     console.log("Reset Password Error", error);
  //   }
  // };

    // FORM SUBMISSION
    const onsubmit =  (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // const email = localStorage.getItem("email")
        const credentials = { otpCode, email }; // Create the object
        dispatch(OTP_VERIFY(credentials,  setLoading, navigate));
        if (error.message === "500 Internal Server Error") {
          // Handle the server error without navigating
          // toast.error(error.message); 
          console.log("Testing error")
        }
        // navigate('/create-new-password', { state: { credidentials } })
      } catch (error) {
        setError(error); // Set the error message if there's an error
        setModalShow(true); // Show the modal
        console.log("Reset Password Error", error)
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
          className="col-lg-5 col-md-8 col-sm-12 dark-card auth-card d-flex my-5 "
          style={{ height: "62rem", }}
        >
          <div className="row g-4 mt-md-1 p-5">
            <div className="col-12 text-center">
              <h2 className="fs-2">Reset Password</h2>
            </div>

            <div className="col-md-12 my-5 text-center">
              <p>
                Please enter the 6 digits code sent to you registered <br />{" "}
                email address {email}
              </p>
            </div>
            <form onSubmit={onsubmit}>
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                 {/* <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={credidentials.otpCode}
                  onChange={onchange}
                  name="otpCode"
                  placeholder="Enter your OTP"
                  required
                /> */}
                <OtpInput
                  value={otpCode}
                  onChange={setOtpCode}
                  numInputs={6}
                  placeholder="******"
                  required
                  inputStyle={{
                    width: "40px",
                    height: "60px",
                    marginLeft: "10px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
              </div>

              <div
                className="col-8  mt-5" style={{marginLeft: 100}}>
                <button
                  type="submit"
                  // disabled={isLoading}
                  className="btn btn-block btn-solid btn-solid-primary-rounded"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CREATE_NEW_PASSWORD } from "../../../redux/actions/authentication";
import Images from "../../../constants/images";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiErrorCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="new-password-success-model-wrapper">
        <img
          src={Images.Pictures.successCheck}
          className="new-password-success-model-wrapper_image"
          alt="signup"
        ></img>
        <p className="new-password-success-model-wrapper_text">
          Password Updated Successfully
        </p>
        <Link
          to={"/login"}
          className="btn btn-solid btn-solid-primary-rounded w-25 "
        >
          Login
        </Link>
      </div>
    </Modal>
  );
}

export default function CreateNewPassword() {
  const location = useLocation();
  // const resetPasswordScreencredidentials = location.state.credidentials;
  // console.log(
  //   "Reset Password Screen Credentials",
  //   resetPasswordScreencredidentials
  // );
  // FORM DATA
  const [credidentials, setCredidentials] = useState({
    email: localStorage.getItem("email"),
    password: "",
    passwordConfirm: "",
  });
  console.log(credidentials, "create Password data");
  const navigate = useNavigate();
  // IS LOADING
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store the error message
  const [modalShow, setModalShow] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirm, setShowpasswordConfirm] = useState(false);
  const dispatch = useDispatch();

  // SETTING STATE WITH INPUT
  const onchange = (e) => {
    setCredidentials({ ...credidentials, [e.target.name]: e.target.value });
  };

  // ...

  // FORM SUBMISSION
  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (credidentials.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return; // Stop form submission
    }

    // Password match validation
    if (credidentials.password !== credidentials.passwordConfirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return; // Stop form submission
    }
    try {
      dispatch(CREATE_NEW_PASSWORD(credidentials, setLoading, navigate));
      setLoading(false);
      setModalShow(true); // Show the modal
    } catch (error) {
      setError(error);
      toast.error(error, "chgfhgfhgfhgfhg");
      console.log(error); // Set the error message if there's an error
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        errorMessage={error} // Pass the error message to the modal
      />
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
              <h2 className="fs-2">Create Password</h2>
            </div>
            <form onSubmit={onsubmit}>
              <div className="col-md-11 mt-3">
                <label htmlFor="password" className="form-label">
                  Create New Password
                </label>
                <div className="input-group input-group-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={credidentials.password}
                    onChange={onchange}
                    name="password"
                    placeholder="Enter Password"
                    required
                  />
                  <span
                    className="input-group-text password-toggle"
                    style={{ backgroundColor: "#383838", border: "none" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="#fff" />
                    ) : (
                      <FaEye color="#fff" />
                    )}
                  </span>
                </div>
              </div>

              <div className="col-md-11 mt-3">
                <label htmlFor="password" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group input-group-password">
                  <input
                    type={showpasswordConfirm ? "text" : "password"}
                    className="form-control"
                    id="passwordConfirm"
                    value={credidentials.passwordConfirm}
                    onChange={onchange}
                    name="passwordConfirm"
                    placeholder="Enter New Password"
                    required
                  />
                  <span
                    className="input-group-text password-toggle"
                    style={{ backgroundColor: "#383838", border: "none" }}
                    onClick={() => setShowpasswordConfirm(!showpasswordConfirm)}
                  >
                    {showpasswordConfirm ? (
                      <FaEyeSlash color="#fff" />
                    ) : (
                      <FaEye color="#fff" />
                    )}
                  </span>
                </div>
              </div>

              <div
                className="col-md-11 mt-5 ml-5 text-center"
                style={{ marginLeft: 10 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-block btn-solid btn-solid-primary-rounded my-3"
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

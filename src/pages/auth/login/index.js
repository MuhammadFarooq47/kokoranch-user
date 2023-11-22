import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../../redux/actions/authentication";
import Images from "../../../constants/images";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiErrorCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  // FORM DATA
  const [credidentials, setCredidentials] = useState({
    email: "",
    password: "",
  });
  console.log(credidentials, "LoginData");
  const navigate = useNavigate();
  // IS LOADING
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // SETTING STATE WITH INPUT
  const onchange = (e) => {
    setCredidentials({ ...credidentials, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null); // State to store the error message
  const [modalShow, setModalShow] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // ...

  // FORM SUBMISSION
  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(LOGIN(credidentials, setLoading, navigate)).catch((error) => {
      setError(error); // Set the error message if there's an error
      setModalShow(true); // Show the modal
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="brand-logo" style={{display: "flex", flexDirection: "row", justifySelf: "center", alignItems: "center"}}>
          <Link to="/">
            <img
              src={Images.Pictures.logo}
              className="img-fluid lazyload"
              width={80}
              height={80}
              alt="logo"
            />
          </Link>
            <h2 style={{ marginLeft: "1rem" }}>KOKO Ranch</h2>
        </div>
      </div>
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
              <h2 className="fs-2">Login</h2>
            </div>
            <form onSubmit={onsubmit}>
              <div className="col-md-12">
                <label htmlFor="email" className="form-label">
                  Email or Phone
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={credidentials.email}
                  onChange={onchange}
                  name="email"
                  placeholder="Email or Phone"
                  required
                />
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="password" className="form-label">
                  Password
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
              <div
                className="col-md-12 my-3"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <p>
                  <Link to="/forgot-password" style={{ color: "#fff" }}>
                    Forgot Password?
                  </Link>
                </p>
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
                  // disabled={isLoading}
                  className="btn btn-block btn-solid btn-solid-primary-rounded my-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

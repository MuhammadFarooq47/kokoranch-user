import React from "react";
import { Link } from "react-router-dom";
import Images from "../../../constants/images";

export default function Login() {
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
            bottom: "-20rem",
            left: "-3rem",
            width: "70rem",
          }}
          alt="signup"
        ></img>
        <div className="signup-success-model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="signup-success-model-wrapper_image"
            alt="signup"
          ></img>
          <p className="signup-success-model-wrapper_text">
            Thank you for signing up. Confirmation Link Sent, Kindly Check Email
          </p>
          <Link
            to={"/login"}
            className="btn btn-solid btn-solid-primary-rounded w-25 "
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}

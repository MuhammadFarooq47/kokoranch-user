import React from "react";
import { Link } from "react-router-dom";
import Images from "../../../constants/images";

export default function VendorSignupSuccess() {
  return (
    <>
      <div
        className="container auth-back d-flex justify-content-center vendor-signup-success-wrapper"
        style={{ marginTop: "10rem" }}
      >
        <img
          src={Images.Pictures.brownRightLeaf}
          className="vendor-signup-success-wrapper_bg-image-1"
          alt="signup"
        ></img>
        <img
          src={Images.Pictures.curvePathGradient}
          className="vendor-signup-success-wrapper_bg-image-2"
          alt="signup"
        ></img>
        <div className="vendor-signup-success-wrapper_inner-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="vendor-signup-success-wrapper_inner-wrapper_image"
            alt="signup"
          ></img>
          <p className="vendor-signup-success-wrapper_inner-wrapper_text">
            Thank you for creating an account. Confirmation Link Sent, Kindly
            Check Email
          </p>
          <Link
            to={"/login"}
            className="btn btn-solid btn-solid-primary-rounded vendor-signup-success-wrapper_inner-wrapper_button"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}

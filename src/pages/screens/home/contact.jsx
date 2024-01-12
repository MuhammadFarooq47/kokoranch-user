import React, { useState } from "react";
import Images from "../../../constants/images";
import Popup from "../../../components/popUp/popUp";
import { ReactComponent as IconMenu } from "../../../assets/images/green-right-down-leaf.svg";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false); //eslint-disable-line
  const [isCheck, setCheck] = useState(false);
  return (
    <>
      <div className="contact-section container mt-5">
        <div className="row">
          <div className="col-lg-6 text-left">
            <h2 className="fs-2">
              Contact <span className="border-title">Us For More!</span>
            </h2>
            <p
              className="mt-4"
              style={{ lineHeight: 1.5, fontSize: "1.7rem", letterSpacing: 1 }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing.
            </p>
            <div className="d-flex  align-items-center mt-4">
              <h2 className="fs-2">
                <FaPhoneAlt />
              </h2>
              <span className="mx-3" style={{ fontSize: "1.5rem" }}>
                Contact : <br /> (123) 456-7890
              </span>
            </div>
            <div className="d-flex  align-items-center mt-4">
              <h2 className="fs-2">
                <FaEnvelope />
              </h2>
              <span className="mx-3" style={{ fontSize: "1.5rem" }}>
                Email :<br />
                www.kokoranch.com
              </span>
            </div>
            <div className="mt-4">
              <span className="mx-3" style={{ fontSize: "1.5rem" }}>
                Follow :<br />
                <span className="light-icon" style={{ fontSize: "4rem" }}>
                  <FaFacebook /> <FaTwitterSquare /> <FaInstagramSquare />{" "}
                  <FaLinkedin />
                </span>
              </span>
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div
              className="materialContainer dark-card"
              style={{
                padding: 70,
                borderRadius: 10,
                textAlign: "left",
                position: "relative",
              }}
            >
              <IconMenu
                style={{
                  position: "absolute",
                  top: "-4rem",
                  right: "0rem",
                  width: "15rem",
                  zIndex:"-1"
                }}
              ></IconMenu>
              <div className="material-details">
                <div className="title title1 title-effect mb-1 title-left">
                  <h2 className="fs-2">Contact Us</h2>
                </div>
              </div>
              <div className="row g-4 mt-md-1 mt-2">
                <div className="col-md-12">
                  <label htmlFor="first" className="form-label">
                    Name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first"
                    placeholder="Enter Your First Name"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="email" className="form-label">
                    Email*
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label">
                    Message*
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="col-12 form-agreement-wrapper">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={() => setCheck(!isCheck)}
                        className="checkbox_animated_2 check-it me-4"
                      />
                      <p>
                        I agree with the
                        <Link to={"/policy"} style={{ color: "#14a384" }}>
                          {" "}
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link to={"/terms"} style={{ color: "#14a384" }}>
                          Terms & Conditions
                        </Link>
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <button
                        onClick={() => {
                          setPopupOpen(true);
                        }}
                        className="btn btn-solid btn-solid-primary-rounded px-5 py-3"
                        type="submit"
                        disabled={isLoading || !isCheck}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="success"
          />
          <p className="model-wrapper_text">Your message has been sent</p>
          <button
          
            className="btn btn-solid btn-solid-primary-rounded  model-wrapper_button"
            onClick={() => setPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  );
}

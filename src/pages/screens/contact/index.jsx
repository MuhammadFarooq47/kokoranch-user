import React, { useState } from "react";
import Images from "../../../constants/images";
import Popup from "../../../components/popUp/popUp";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactUs() {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <>
      <div className="container mt-5 contact-page-wrapper">
        <div
          className="row dark-card px-5  contact-page-wrapper_inner-wrapper"
          style={{
            zindex: "-1rem ",
            textAlign: "left",
            position: "relative",
          }}
        >
          <img
            src={Images.Pictures.brownLeftLeaf}
            style={{
              position: "absolute",
              bottom: "-17rem",
              left: "-5rem",
              width: "70rem",
              zIndex: 1,
            }}
            alt="brownLEFTLeaf"
          ></img>
          <div className="col-lg-6 contact-page-wrapper_inner-wrapper_left-wrapper">
            <div
              className="materialContainer dark-card"
              style={{
                textAlign: "left",
                padding: "7rem",
                borderRadius: "1rem",
                // background: `url(${Images.Pictures.homeBanner[1]})`,
              }}
            >
              <div className="material-details">
                <div className="title title1 title-effect mb-1 title-left">
                  <h2 className="fs-2">Contact Us</h2>
                </div>
              </div>
              <div className="row g-4 mt-md-1 mt-2">
                <div className="col-md-12">
                  <label htmlFor="first" className="form-label">
                    Name
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
                    Email
                  </label>
                  <input
                    style={{ zIndex: 2 }}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    style={{ zIndex: 2 }}
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Enter Subject"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    style={{ zIndex: 2 }}
                    className="form-control"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    onClick={() => {
                      setPopupOpen(true);
                    }}
                    className="btn btn-solid btn-solid-primary-rounded w-50 "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-left">
            <div className="px-5">
              <h2 style={{ fontWeight: 100, fontSize: "4.5rem" }}>
                Contact Info
              </h2>
              <p
                className="mt-4 font-dark"
                style={{
                  lineHeight: 1.8,
                  fontSize: "1.7rem",
                  letterSpacing: 1,
                }}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              </p>
              <div className="d-flex">
                <h2 className="fs-2">
                  <FaPhoneAlt />
                </h2>
                <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                  Contact Number
                  <br />
                  (123) 456-7890
                </span>
              </div>
              <div className="d-flex mt-4">
                <h2 className="fs-2">
                  <FaEnvelope />
                </h2>
                <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                  Email Address
                  <br />
                  www.kokoranch.com
                </span>
              </div>
              <div className="d-flex mt-4">
                <h2 className="fs-2">
                  <FaMapMarkerAlt />
                </h2>
                <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                  Address
                  <br />
                  123 street ABC State USA
                </span>
              </div>
              <div className="mt-4">
                <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                  Follow Us
                  <br />
                  <span className="light-icon" style={{ fontSize: "4rem" }}>
                    <FaFacebook /> <FaTwitterSquare /> <FaInstagramSquare />{" "}
                    <FaLinkedin />
                  </span>
                </span>
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
            alt="successCheck"
          ></img>
          <p className="model-wrapper_text">Your Message Sent</p>
          <button
            onClick={() => {
              setPopupOpen(false);
            }}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  );
}

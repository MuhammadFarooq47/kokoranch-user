import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";

import { useNavigate, useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import Images from "../../../constants/images";
import NavBar from "./NavBar";
import Popup from "../../../components/popUp/popUp";
import { PUT, PATCH } from "../../../apis/requests";

function Payment({ sidebar, setSidebar }) {
  let navigate = useNavigate();
  let location = useLocation();
  const token = localStorage.getItem("token");
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [successfulServicePopup, setSuccessfulServicePopup] = useState(false);
  const [data, setData] = useState({
    location:
      "Your post will appear on featured post section for the number of weeks you will select below",
    shippingTo: "shdfkjhs",
    Delivery: "skjdhfkjsdhfkjhdsjkhf",
    Return: "skjdhfkjsdhf",
    ShippingAndHandling: "sjdhfjksh",
  });

  const makeItFeatured = async () => {
    try {
      if (location?.state?.service == true) {
        const res = await PATCH(
          "/services/make-service-featured",
          token,
          location?.state?.featuredItem,
          { duration: location?.state?.plan }
        );
        // console.log("featured response", res);
        if (res.status == true) {
          setSuccessfulServicePopup(true);
          setPopupOpen(false);
        }
      } else {
        const res = await PATCH(
          "/products",
          token,
          location?.state?.featuredItem,
          {isFeatured: true},
          { duration: location?.state?.plan },
          { amount: location?.state?.amount }
        );
        // isFeatures: true
        //duration 1 week
        // amount: 
        console.log("featured response", res);
        if (res.status == true) {
          setSuccessfulPopup(true);
          setPopupOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  

  return (
    <>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h3>
              Are You Sure You
              <br />
              Want To Pay?
            </h3>
          </div>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-cancel btn-outline-primary soi-popup-btn"
              onClick={() => {
                setPopupOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-solid btn-solid-primary  soi-popup-btn"
              onClick={() => {
                makeItFeatured();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>
      <Popup open={successfulPopup} setOpen={setSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h3>
            Payment Successful
            <br />
            Your Product Is Featured For {location?.state?.plan} Week.
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setSuccessfulPopup(false);
              console.log("state check", location.state);
              navigate("/vendor-my-products");
            }}
          >
            Close
          </button>
        </div>
      </Popup>
      <Popup open={successfulServicePopup} setOpen={setSuccessfulServicePopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h3>
            Payment Successful Your Featured
            <br />
            Service Duration Is Extended Till 05-11-2022.
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setSuccessfulPopup(false);
              navigate("/vendor-agricultural-services");
            }}
          >
            Close
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Make It Featured"
      />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "30px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
        }}
        elevation={20}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1 d-flex justify-content-end align-items-center">
            <h3
              className="mx-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="vtext-primary mx-2">&#10229;</span>Back
            </h3>
          </div>
        </div>
        <div style={{ marginBottom: "50px" }}>
          <p className="paragraph-text">{data.location}</p>
        </div>
        {/* <div style={{ marginBottom: "50px" }}>
          <h4>Select Your Package</h4>
          <div className="row d-flex justify-content-between mt-5">
            <div className="col-6">
              <div className="row">
                <div className="col-4">
                  <p className="paragraph-text">1 Week</p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <p className="paragraph-text">$ 50</p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <p
                    className="paragraph-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCheckBox({
                        week1: checkbox.week1 ? false : true,
                        week2: false,
                        week3: false,
                        week4: false,
                      });
                    }}
                  >
                    <span className="checkbox-primary">
                      {checkbox.week1 && (
                        <>
                          <div>
                            <TiTick
                              style={{
                                marginTop: "-15px",
                                marginLeft: "-7px",
                              }}
                              size={40}
                              fill="#0f866c"
                            />
                          </div>
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="hr-rule1" />
              <div className="row">
                <div className="col-4">
                  <p className="paragraph-text">2 Week</p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <p className="paragraph-text">$ 50</p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <p
                    className="paragraph-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCheckBox({
                        week1: false,
                        week2: checkbox.week2 ? false : true,
                        week3: false,
                        week4: false,
                      });
                    }}
                  >
                    <span className="checkbox-primary">
                      {checkbox.week2 && (
                        <div>
                          <TiTick
                            style={{ marginTop: "-15px", marginLeft: "-7px" }}
                            size={40}
                            fill="#0f866c"
                          />
                        </div>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="hr-rule1" />
              <div className="row">
                <div className="col-4">
                  <p className="paragraph-text">3 Week</p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <p className="paragraph-text">$ 50</p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <p
                    className="paragraph-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCheckBox({
                        week1: false,
                        week2: false,
                        week3: checkbox.week3 ? false : true,
                        week4: false,
                      });
                    }}
                  >
                    <span className="checkbox-primary">
                      {checkbox.week3 && (
                        <div>
                          <TiTick
                            style={{ marginTop: "-15px", marginLeft: "-7px" }}
                            size={40}
                            fill="#0f866c"
                          />
                        </div>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="hr-rule1" />
              <div className="row">
                <div className="col-4">
                  <p className="paragraph-text">4 Week</p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <p className="paragraph-text">$ 50</p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <p
                    className="paragraph-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCheckBox({
                        week1: false,
                        week2: false,
                        week3: false,
                        week4: checkbox.week4 ? false : true,
                      });
                    }}
                  >
                    <span className="checkbox-primary">
                      {checkbox.week4 && (
                        <div>
                          <TiTick
                            style={{ marginTop: "-15px", marginLeft: "-7px" }}
                            size={40}
                            fill="#0f866c"
                          />
                        </div>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <ul className="payment-images">
          {Images.Pictures.payments.map((element, index) => {
            return (
              <li key={index} style={{ margin: "0 2.5px" }}>
                <Link to="/make-it-featured/payment">
                  <img
                    src={element}
                    className="img-fluid  lazyload"
                    alt="payment icon"
                    width={31}
                    height={30}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-5">
          <h5 style={{ fontWeight: "bold" }}>Enter Card Detail</h5>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
              CARD NUMBER
            </label>

            <input
              type="number"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="1234-4567-654"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
              NAME OF CARD
            </label>

            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="local 14 days and Global 30 days"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
              EXPIRY DATE
            </label>

            <input
              type="date"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="local 14 days and Global 30 days"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
              CVV
            </label>

            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="local 14 days and Global 30 days"
              required
            />
          </div>
        </div>
        <button
          onClick={() => {
            setPopupOpen(true);
          }}
          className="btn btn-solid btn-solid-primary table-btn"
          style={{
            marginRight: "20px",
            paddingLeft: "20px",
            paddingRight: "20PX",
            width: "120px",
          }}
        >
          <div
            style={{
              // backgroundColor: "white",
              margin: "5px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          ></div>
          Pay Now
        </button>
      </Paper>
    </>
  );
}

export default Payment;

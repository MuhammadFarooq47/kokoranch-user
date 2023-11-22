import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import Popup from "../../../components/popUp/popUp";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
function ViewFeaturedDetail({ sidebar, setSidebar }) {
  let navigate = useNavigate();
  let location = useLocation();
  // console.log(location.state.data)
  // const [data, setData] = useState({
  //   location: "karta hisdfhjkh",
  //   shippingTo: "shdfkjhs",
  //   Delivery: "skjdhfkjsdhfkjhdsjkhf",
  //   Return: "skjdhfkjsdhf",
  //   ShippingAndHandling: "sjdhfjksh",
  // });
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  return (
    <>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h3>
              Are You Sure You Want To Remove
              <br />
              This From Featured Products?
            </h3>
            <p style={{ color: "red" }}>
              Note: Paid amount will not be refunded
            </p>
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
                setPopupOpen(false);
                setSuccessfulPopup(true);
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
            Successfully Removed From
            <br />
            Featured Products
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setSuccessfulPopup(false);
              // navigate("/vendor-my-products");
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Featured Products & services"
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
          <label>{location?.state?.data.name ? "Product Name" : "Service Name"}</label>
          <h3
            style={{
              fontWeight: "lighter",
              color: "#979797",
              marginTop: "20px",
            }}
          >
            {location?.state?.data?.serviceName ? location?.state?.data?.name:location.state.data?.serviceName}
          </h3>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-10">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                <div className="d-flex justify-content-start">
                  <label>{location?.state?.data?.name ? "Product Code:":"Service Code:"}</label>

                  <label> static data 12454</label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-sm-12 d-flex justify-content-end">
                <button
                  onClick={() => {
                    location.state.data.name?
                    navigate("/vendor-my-products/details", {
                      state: { data: location.state.data },
                    }):
                    navigate("/vendor-agricultural-services/details", {
                      state: { data: location.state.data },
                    })
                    
                  }}
                  className="btn btn-solid btn-solid-primary table-btn "
                  style={{
                    width: "fit-content",
                  }}
                >
                  {location.state.data.name ? "View product Info":"View Service Info"}
                </button>
                <button
                  className="btn btn-solid btn-outline-primary table-btn"
                  style={{
                    marginLeft: "10px",
                    width: "fit-content",
                  }}
                >
                  {location.state.data.name ? "View product Page":"View Service Page"}
                </button>
              </div>
            </div>
            <hr className="hr-rule" />
          </div>
        </div>

        <div style={{ marginBottom: "50px" }}>
          <h2>Featured Details</h2>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <label>Subscription Date</label>
          <p
            style={{
              fontWeight: "lighter",
              color: "#979797",
              marginTop: "10px",
            }}
          >
            {moment(location?.state?.data?.featuredDate).format('l')}
          </p>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <label>Featured Duration</label>
          <p
            style={{
              fontWeight: "lighter",
              color: "#979797",
              marginTop: "10px",
            }}
          >
            3 weeks static data
          </p>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <label>Expiry Date:</label>
          <p
            style={{
              fontWeight: "lighter",
              color: "#979797",
              marginTop: "10px",
            }}
          >
           {moment(location?.state?.data?.featuredExpiryDate).format('l')}
          </p>
        </div>
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 col-sm-6 mt-3 d-flex ">
            <button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="btn btn-solid btn-outline-primary table-btn"
              style={{
                padding: "20px 20px",
                width: "fit-content",
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                navigate("/vendor-make-it-featured");
              }}
              className="btn btn-solid btn-solid-primary table-btn"
              style={{
                marginLeft: "20px",
                padding: "20px 20px",
                width: "fit-content",
              }}
            >
              Extend
            </button>
          </div>
          {/* <div className="col-12 col-md-3 col-lg-2 col-sm-6 mt-3">
            <button
              onClick={() => {
                navigate("/vendor-productshippingdetails/edit");
              }}
              className="btn btn-solid btn-solid-primary table-btn"
              style={{
                padding: "20px 20px",
                width: "fit-content",
              }}
            >
              Extend
            </button>
          </div> */}
        </div>
      </Paper>
    </>
  );
}

export default ViewFeaturedDetail;

import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { Paper } from "@mui/material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { PUT, PATCH } from "../../../apis/requests";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductOrderDetails = ({ setSidebar, sidebar }) => {
  const { user, token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState(location?.state?.data?.status);

  const updateStatusHandler = async () => {
    const formData = new FormData();
    formData.append("status", orderStatus);
    try {
      const res = await axios.patch(
        `https://kokoranch-backend.vercel.app/api/v1/product-orders/${location?.state?.data?._id}`,
        {
         status: orderStatus
        },
       { headers : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
      );
      toast.success("Status Updated Successfully");
      navigate('/vendor-productorders')
      setSuccessfulPopup(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <h3 className="mb-4">Update Status</h3>

          <div>
            <div className="soi-checkbox my-4">
              {orderStatus === "cancelled" ? (
                <input
                  type="radio"
                  id="Cancelled"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("cancelled")}
                />
              ) : (
                <input
                  type="radio"
                  id="Cancelled"
                  name="order-status"
                  onClick={() => setOrderStatus("cancelled")}
                />
              )}
              <label
                htmlFor="Cancelled"
                onClick={() => setOrderStatus("cancelled")}
              >
                Cancelled
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === "pending" ? (
                <input
                  type="radio"
                  id="Pending"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("pending")}
                />
              ) : (
                <input
                  type="radio"
                  id="Pending"
                  name="order-status"
                  onClick={() => setOrderStatus("pending")}
                />
              )}
              <label
                htmlFor="Pending"
                onClick={() => setOrderStatus("pending")}
              >
                Pending
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === "on-the-way" ? (
                <input
                  type="radio"
                  id="On the way"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("on-the-way")}
                />
              ) : (
                <input
                  type="radio"
                  id="On the way"
                  name="order-status"
                  onClick={() => setOrderStatus("on-the-way")}
                />
              )}
              <label
                htmlFor="On the way"
                onClick={() => setOrderStatus("on-the-way")}
              >
                On The Way
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === "delivered" ? (
                <input
                  type="radio"
                  id="Delivered"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("delivered")}
                />
              ) : (
                <input
                  type="radio"
                  id="Delivered"
                  name="order-status"
                  onClick={() => setOrderStatus("delivered")}
                />
              )}
              <label
                htmlFor="Delivered"
                onClick={() => setOrderStatus("delivered")}
              >
                Delivered
              </label>
            </div>
          </div>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-cancel btn-outline-primary soi-popup-btn"
              onClick={() => setPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-solid btn-solid-primary  soi-popup-btn"
              onClick={() => {
                setPopupOpen(false);
                updateStatusHandler();
                // setSuccessfulPopup(true);
              }}
            >
              Update
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
            Status Updated <br />
            Successfully
          </h3>
          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => setSuccessfulPopup(false)}
          >
            Continue
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Service Order Details"
      />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "30px",
          borderRadius: "20px",
          height: "85vh",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
        }}
        elevation={20}
        className={"my-5"}
      >
        <div>
          <div className="soi-top">
            <div className="row">
              {/* {location?.state?.data?.items?.map((orderNumber) => {
                <div className="col-4 col-sm-12 col-md-4 col-lg-4 soi-orderNo">
                  <h2>Order No. {orderNumber?.productId?._id?.substr(orderNumber?.productId?._id.length - 4).toUpperCase()}</h2>
                </div>;
              })} */}
              <div className="col-4 col-sm-12 col-md-4 col-lg-4 soi-orderNo">
                <h2>Order No. {location?.state?.data?.orderNumber} </h2>
              </div>
              <div className="col-2 col-sm-12 col-md-2 col-lg-2 soi-orderNo"></div>
              <div className="col-6 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-solid btn-solid-secondary soi-btn mx-5"
                  style={{ width: "fit-content" }}
                >
                  Send Message to Client
                </button>
                <button
                  className="btn btn-solid btn-solid-primary soi-btn "
                  onClick={() => setPopupOpen(true)}
                  style={{ width: "fit-content" }}
                >
                  Update Status
                </button>
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
          </div>
          <div className="soi-main bg-black-pad">
            <div className="soi-main-sd">
              <p>
                Order Date:{" "}
                {moment(location?.state?.data?.createdAt).format("L")}
              </p>
            </div>
            <hr className="hr-rule" />
            <div className="row soi-main-services">
              <div className="col-6">
                <h3 className="mb-4">Product</h3>
              </div>
              <div className="col-4">
                <h3 className="mb-4">Qty</h3>
              </div>
              <div className="col-2"></div>

              {location?.state?.data?.items.map((item, index) => {
                return (
                  <>
                    <div className="col-6 my-5" key={index}>
                      <p>{item?.productId?.productName}</p>
                    </div>
                    <div className="col-4 my-5">
                      <p>{item?.quantity}</p>
                    </div>
                    <div className="col-2 d-flex justify-content-end my-5">
                      <p>${item?.price * item?.quantity}</p>
                    </div>

                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Shipping Charges: </h4>
                      <p>
                        $
                        {Number(
                          item?.productId?.shippingDetails?.shippingAndHandling
                        )}
                      </p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Card Used </h4>
                      <p>{location?.state?.data?.cardNumber}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Total Amount Paid </h4>
                      <p>
                        $
                        {item?.price +
                          Number(
                            item?.productId?.shippingDetails
                              ?.shippingAndHandling
                          )}
                      </p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Order Status </h4>
                      <p className="vtext-primary ">
                        {location?.state?.data?.status}
                      </p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-main-services">
                      <h3 className="mb-4">Shipping Details</h3>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Street </h4>
                      <p>{location?.state?.data?.orderAddress}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Country </h4>
                      <p>{location?.state?.data?.country}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>City </h4>
                      <p>{location?.state?.data?.city}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>State</h4>
                      <p>{location?.state?.data?.state}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Contact Number</h4>
                      <p>{location?.state?.data?.phone}</p>
                    </div>
                    <hr className="hr-rule" />
                    <div className="soi-row d-flex justify-content-between">
                      <h4>Zip Code</h4>
                      <p>{location?.state?.data?.zipCode}</p>
                    </div>
                    <hr className="hr-rule" />
                  </>
                );
              })}
              {/* <div className="col-6 my-5">
                <p>product1</p>
              </div>
              <div className="col-4 my-5">
                <p>1</p>
              </div>
              <div className="col-2 d-flex justify-content-end my-5">
                <p>$67</p>
              </div> */}
              {/* <div className="col-6">
                <p>product2</p>
              </div>
              <div className="col-4">
                <p>1</p>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <p>$67</p>
              </div> */}
            </div>
            {/* <div className="">
            <div className="d-flex justify-content-between my-5">
              <p>product1</p>
              <p>1</p>
              <p>$67</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>product2</p>
              <p>1</p>
              <p>$67</p>
            </div>
          </div> */}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ProductOrderDetails;

import { Paper } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { toast } from "react-toastify";
import { POST, PUT } from "../../../apis/requests";
import axios from "axios";

function ProductShippingDetailEdit({ sidebar, setSidebar }) {
  const { user, token } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();
  const location = useLocation();

  // console.log(location?.state?.edit);
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState("completed");
  // IS LOADING
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    itemLocation: location?.state?.data?.itemLocation,
    shippingTo: location?.state?.data?.shippingTo,
    delivery: location?.state?.data?.delivery,
    return: location?.state?.data?.return,
    shippingAndHandling: location?.state?.data?.shippingAndHandling,
  });

  // SETTING STATE WITH INPUT
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // FORM SUBMISSION
  const onsubmit = async (e) => {
    e.preventDefault();
    // console.log("onsubmit", data);
    if (location?.state?.edit == "create") {
      try {
        const res = await POST(`/shipping-details/`, token, {
          ...data,
          user: user?._id,
        });
        if (res.success == false) {
          toast.error(res.message);
        } else {
          toast.success("Shipping Detail Saved Successfully");
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else if (location?.state?.edit == "edit") {
      try {
        const res = await axios.patch(`https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/shipping-details/${user?._id}`, data);
        if (res.success == false) {
          toast.error(res.message);
        } else {
          toast.success("Shipping Detail Updated Successfully");
          navigate("/vendor-productshippingdetails")
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    // setLoading(true);
    // dispatch(LOGIN(credidentials, setLoading, navigate));
  };
  return (
    <>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <h3 className="mb-4">Update Status</h3>
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h3>
              Are You Sure You Want To
              <br />
              Update Shipping Details?
            </h3>
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
            Shipping Details <br />
            Updated Successfully
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
        title="Product Shipping Details"
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
        <form onSubmit={onsubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Item location
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="itemLocation"
                  value={data.itemLocation}
                  onChange={onchange}
                  placeholder="item location"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Shipping to
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="shippingTo"
                  name="shippingTo"
                  value={data.shippingTo}
                  onChange={onchange}
                  placeholder="shipping to"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Delivery
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="delivery"
                  name="delivery"
                  value={data.delivery}
                  onChange={onchange}
                  placeholder="local 14 days and Global 30 days"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Return
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="Return"
                  name="return"
                  value={data?.return}
                  onChange={onchange}
                  placeholder="30 days Return, Buyers will pay Return shipping fee "
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Shipping and Handling
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="shippingAndHandling"
                  name="shippingAndHandling"
                  value={data.shippingAndHandling}
                  onChange={onchange}
                  placeholder="Free Shipping"
                  required
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                type="submit"
                // onClick={() => {
                //   onsubmit();
                //   // setPopupOpen(true);
                // }}
                disabled={isLoading}
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
                {location?.state?.edit == "create" ? "Save" : "Update"}
              </button>
              <button
                type="reset"
                onClick={() => {
                  navigate(-1);
                }}
                className="btn btn-solid btn-outline-primary table-btn"
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
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Paper>
    </>
  );
}

export default ProductShippingDetailEdit;

import React, { useState } from "react";
import NavBar from "./NavBar";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_SERVICE_STATUS,
  DELETE_SERVICE_BY_ID,
} from "../../../redux/actions/services";
import { DELETE } from "../../../apis/requests";

const ServiceDetails = ({ setSidebar, sidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location.state.data.status", location.state.data)
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);

  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteSuccessfulPopup, setDeleteSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState(location.state.data);
  // console.log("orderStatus ====================", orderStatus.category)
  return (
    <div>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <h3 className="mb-4">Update Status</h3>
          <div>
            <div className="soi-checkbox my-4">
              {orderStatus === "Active" ? (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  checked
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onClick={() => setOrderStatus("Active")}
                />
              ) : (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  onClick={() => setOrderStatus("Active")}
                />
              )}
              <label htmlFor="active" onClick={() => setOrderStatus("Active")}>
                Active
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === "Inactive" ? (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  checked
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onClick={() => setOrderStatus("Inactive")}
                />
              ) : (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  onClick={() => setOrderStatus("Inactive")}
                />
              )}
              <label
                htmlFor="inactive"
                onClick={() => setOrderStatus("Inactive")}
              >
                Inactive
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
                dispatch(
                  UPDATE_SERVICE_STATUS(
                    location.state.data._id,
                    orderStatus,
                    token,
                    setSuccessfulPopup
                  )
                );
                // setSuccessfulPopup(true);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </Popup>
      <Popup open={deletePopup} setOpen={setDeletePopup}>
        <div className="soi-update-status">
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h3>
              Are You Sure You Want To
              <br />
              Delete This Service?
            </h3>DELETE
          </div>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-cancel btn-outline-primary soi-popup-btn"
              onClick={() => {
                setDeletePopup(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-solid btn-solid-primary  soi-popup-btn"
              onClick={() => {
                setDeletePopup(false);
                // setDeleteSuccessfulPopup(true);
                dispatch(
                  DELETE_SERVICE_BY_ID(
                    location.state.data._id,
                    token,
                    setDeleteSuccessfulPopup
                  )
                );
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
            Status Updated <br />
            Successfully
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setSuccessfulPopup(false);
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <Popup open={deleteSuccessfulPopup} setOpen={setDeleteSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h3>
            Service Deleted <br />
            Successfully
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setDeleteSuccessfulPopup(false);
              navigate(-1);
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Service Details"
      />
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 d-flex justify-content-end align-items-center">
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
      <div className="bg-black-pad my-5 " style={{ height: "82vh" }}>
        <div className="soi-top ">
          <div className="row">
            <div className="col-4 col-sm-12 col-md-4 col-lg-4 soi-orderNo">
              <h2>Service Code. 21385</h2>
            </div>
            <div className="col-2 col-sm-12 col-md-2 col-lg-2 soi-orderNo"></div>
            <div className="col-6 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end align-items-center">
              <button
                onClick={() => {
                  navigate("/vendor-agricultural-services/details/edit");
                }}
                className="btn btn-solid btn-solid-primary soi-btn mx-2"
                style={{ width: "fit-content" }}
              >
                Edit
              </button>
              <button
                className="btn btn-solid btn-solid-danger soi-btn mx-3"
                onClick={() => setDeletePopup(true)}
                style={{ width: "fit-content" }}
              >
                Delete
              </button>
              <button
                className="btn btn-solid btn-solid-process soi-btn "
                onClick={() =>
                  navigate("/vendor-make-it-featured", {
                    state: { data: location?.state?.data, service: true },
                  })
                }
                style={{ width: "fit-content" }}
              >
                Make it Featured
              </button>
            </div>
          </div>
        </div>
        <div className="soi-main">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5
                style={{
                  letterSpacing: "1px",
                  textAlign: "end",
                }}
              >
                Status:
                <span className="active-color">{orderStatus}</span>
              </h5>
            </div>
            <button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="btn btn-solid btn-solid-primary soi-btn mx-2"
              style={{ width: "fit-content" }}
            >
              Update Status
            </button>
          </div>
          <hr className="hr-rule" />
          <div className="row ">
            <div className="col-4 ">
              <h3 className="mb-4">Service Name:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 "> {location.state.data.serviceName}</h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Category:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {" "}
                {location.state.data.category.categoryName}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Price:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">${location.state.data.price}</h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-3 ">
              <h3 className="mb-4">Pricing Details:</h3>
            </div>
            <div className="col-9 d-flex ">
              <p className="mb-4 ">{location.state.data.priceDetails}</p>
            </div>
            <hr className="hr-rule" />
            <div className="col-3 ">
              <h3 className="mb-4">Service Description:</h3>
            </div>
            <div className="col-9 d-flex ">
              <p className="mb-4 ">{location.state.data.serviceDescription}</p>
            </div>
            <hr className="hr-rule" />
            <div className="col-3 ">
              <h3 className="mb-4">Service Area:</h3>
            </div>
            <div className="col-9 d-flex">
              <p className="mb-4 ">{location.state.data.serviceArea}</p>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Upload Image:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <Grid container alignItems={"center"} spacing={2}>
                {location?.state?.data?.images?.map((item, i) => {
                  return (
                    <Grid key={item?.url} item lg={3} md={4} sm={4} xs={12}>
                      <div
                        style={{
                          height: "100px",
                          width: "100px",
                          // position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item?.url}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            <hr className="hr-rule" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

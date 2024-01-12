import React from "react";
import { useSelector } from "react-redux";
// components
export default function AddressDetails({ setFormChange }) {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <h4 className="fs-4 title-color mb-2">Address</h4>
        <h3 className="fs-3">{user?.address || "-"}</h3>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <h4 className="fs-4 title-color mb-2">City</h4>
        <h3 className="fs-3">{user?.city || "-"}</h3>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <h4 className="fs-4 title-color mb-2">State</h4>
        <h3 className="fs-3">{user?.state || "-"}</h3>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <h4 className="fs-4 title-color mb-2">Country</h4>
        <h3 className="fs-3">{user?.country || "-"}</h3>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <h4 className="fs-4 title-color mb-2">Zip Code</h4>
        <h3 className="fs-3">{user?.zipCode || "-"}</h3>
      </div>
      <div className="row" style={{ paddingTop: "6rem" }}>
        <div className="col-lg-6 col-md-12 col-sm-12"></div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <button
            className="btn btn-solid btn-solid-primary btn-full"
            style={{ float: "right" }}
            onClick={() => {
              setFormChange("password-form");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CHECK_TOKEN } from "../../../../redux/actions/authentication";

import {GET} from "../../../../apis/requests";

export default function InfoDetails({ setFormChange }) {
  // USER DATA
  const { user } = useSelector((state) => state.authReducer);

  console.log("My profile user data", user)

  const [userData, setUserData] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await GET("/users/me", token);
      console.log("CHECK_TOKEN", response);
      // Update the state with the user data
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);
//   console.log("My profile user token", token)

//   const dispatch = useDispatch()

// useEffect(() => {
//   userData()
//   // Your code to handle updates when user data changes
// }, []);

// useEffect(() => {
// dispatch(CHECK_TOKEN(token))
// }, [])

  return (
    <>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <h4 className="fs-4">First Name</h4>
        <h3 className="fs-3">{userData?.firstName || "Undefined"}</h3>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <h4 className="fs-4">Last Name</h4>
        <h3 className="fs-3">{userData?.lastName || "Undefined"}</h3>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <h4 className="fs-4">Email Address</h4>
        <h3 className="fs-3">{userData?.email || "Undefined"}</h3>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <h4 className="fs-4">Contact No.</h4>
        <h3 className="fs-3">+{userData?.phoneNumber || "Undefined"}</h3>
      </div>
      <div className="row" style={{ paddingTop: "6rem" }}>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <button
            className="btn btn-solid btn-solid-primary btn-full"
            onClick={() => {
              setFormChange("info-form");
            }}
          >
            Edit
          </button>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <button
            className="btn btn-solid btn-solid-primary btn-full"
            onClick={() => {
              setFormChange("password-form");
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
}

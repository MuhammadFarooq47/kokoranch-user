import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../../../redux/actions/authentication";
import Popup from "../../../../components/popUp/popUp";
import Images from "../../../../constants/images";
import axios from "axios";
import { toast } from "react-toastify";
import { GET } from "../../../../apis/requests";

export default function InfoForm({ setFormChange }) {

  // const onsubmit2 = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.patch(
  //       "http://192.168.100.245:3030/api/v1/users/updateMe",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setPopupOpen(false);
  //     console.log(response.data, "Data updated successfully");
  //     toast.success("User Info Updated Successfully");
  //   } catch (error) {
  //     console.log(error.message, "Error while updating user info");
  //     toast.error("Error updating user info");
  //   }
  // };


  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true)
    try {
      const response = await GET("/users/me", token);
      console.log("CHECK_TOKEN", response);
      setUserData(response.data);
      // Initialize formData here with user data
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      });
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        ...formData,
        // image: selectedImage, // Assuming you have a selectedImage state
      };

      dispatch(UPDATE_USER(updatedUserData));
      toast.success("User Info Updated Successfully");
      // setFormChange(false);
    } catch (error) {
      console.log(error.message, "Error while updating user info");
      toast.error("Error updating user info");
    }
  };

  return (
    <>
      <form id="info-form" className="row info-change-form" onSubmit={onsubmit}>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control form-control-white"
            placeholder="JOHN"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control form-control-white"
            placeholder="SMITH"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control form-control-white"
            placeholder="abc@xyz.com"
            name="email"
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="contact" className="form-label">
            Contact No.
          </label>
          <input
            type="tel"
            className="form-control form-control-white"
            placeholder="+123456789"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onInputChange}
          />
        </div>
        <div className="info-change-form_button-wrapper">
          <button
            className="btn btn-solid-light"
            onClick={() => setFormChange(false)}
          >
            Cancel
          </button>
          <button className="btn btn-solid btn-solid-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

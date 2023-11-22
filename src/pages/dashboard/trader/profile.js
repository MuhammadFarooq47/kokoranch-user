import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaRegEdit } from "react-icons/fa";
import Images from "../../../constants/images";
import NavBar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  UPDATE_TRADER,
} from "../../../redux/actions/authentication";
import { useEffect } from "react";
import { GET } from "../../../apis/requests";



export default function Profile({ setSidebar, sidebar }) {
  const dispatch = useDispatch();
  const { user, userUpdated } = useSelector((state) => state.authReducer);
  
  console.log("user from Trader profile", user, userUpdated);

  

  const [editAble, setEditAble] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName ? user.firstName : "",
    lastName: user?.lastName ? user.lastName : "",
    image: user?.image?.url ? user.image.url : Images.Pictures.profile,
    email: user?.email ? user.email : "",
    phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
    fileContent: null,
  });



  const changeProfileImage = (e) => {
    console.log("target", e.target.files[0]);
    // setProfileImage(URL.createObjectURL(e.target.files[0]));
    setProfileData({
      ...profileData,
      image: URL.createObjectURL(e.target.files[0]),
      fileContent: e.target.files[0],
    });
    // let reader = new FileReader();
    // reader.onload = (e) => {};
    // reader.readAsDataURL(e.target.files[0]);
    // console.log("reader", reader.result);
  };


  // Farooq code start

  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    photo: null, 
    storeName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  console.log("Trader Form Data ????????????", formData)

  // const dispatch = useDispatch();
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
        photo: response?.data?.photo,
        storeName: response?.data?.storeName,
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
    
        await dispatch(UPDATE_TRADER(updatedUserData))
          toast.success("User Info Updated Successfully.........");
      // setEditAble(false);
      // setFormChange(false);
   
    } catch (error) {
      console.log(error.response, "Error while updating user info");
      toast.error("Error updating user info");
    }
   };
   
  // Farooq Code end

  const submitHandler = async (e) => {
    e.preventDefault()
  
    // console.log("jksahdjk: ", myformData);

  
    try {
      var myformData = new FormData();
      if (profileData.fileContent) {
        myformData.append("image", profileData.fileContent);
      }
    myformData.append("firstName", e.target.firstName.value);
    myformData.append("lastName",e.target.lastName.value);
    myformData.append("email", e.target.email.value);
    myformData.append("phoneNumber", e.target.phoneNumber.value);
    dispatch(UPDATE_TRADER(myformData));
    // setEditAble(false);
    // toast.success("User Info Updated Successfully");
    } catch (e) {
      toast.error(e.message);
      console.log(e.message)
    }
  };

  return (
    <>
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title="My Profile" />
      <form onSubmit={submitHandler}>
      <article className="vendor-profile-main">
        <div className="vendor-profile-main_form">
          <div className="row mb-5">
            <div className="col-3 col-sm-2 col-md-2 col-lg-2">
              <div className="vendor-profile-main_form_image-input-wrapper">
                <img
                  src={
                    user?.photo
                      ? `https://kokoranch-development.s3.ap-south-1.amazonaws.com/${formData.photo}`
                      : Images.Pictures.profile
                  }
                  className="vendor-profile-main_form_image-input-wrapper_preview"
                  alt="vendor-preview"
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                />

                {editAble ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => {
                        changeProfileImage(e);
                      }}
                      className="vendor-profile-main_form_image-input-wrapper_input"
                    />
                    <div className="vendor-profile-main_form_image-input-wrapper_icon-wrapper">
                      <FaRegEdit className="vendor-profile-main_form_image-input-wrapper_icon-wrapper_icon" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-6 col-sm-7 col-md-7 col-lg-7 d-flex flex-column justify-content-center vendor-profile-info">
              <label htmlFor="firstName" className="form-label">
                Public Profile Name
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="profileName"
                  name="storeName"
                  placeholder={
                   formData?.storeName
                  }
                  value={formData?.storeName}
                  onChange={onInputChange}
                  required
                />
              ) : (
                <p className="preview">{formData?.storeName === undefined ? formData?.firstName + " " +  formData?.lastName : formData?.storeName}</p>
              )}
            </div>
            <div className="col-3 col-lg-3 col-md-3 col-sm-3 d-flex flex-column justify-content-center vendor-system-id">
              <p className="vendor-id">User Id : {user?.id.substr(user?.id.length - 7).toUpperCase()}</p>
              <p className="vendor-text">(System Generated)</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 mb-4">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  value={formData?.firstName}
                  onChange={onInputChange}
                  required
                />
              ) : (
                <p className="vendor-preview">{formData?.firstName}</p>
              )}
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  value={formData?.lastName}
                  onChange={onInputChange}
                  required
                />
              ) : (
                <p className="vendor-preview">{formData?.lastName}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              {editAble ? (
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  value={formData?.email}
                  onChange={onInputChange}
                  required
                />
              ) : (
                <p className="vendor-preview">{formData?.email}</p>
              )}
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="phoneNumber" className="form-label">
                {editAble ? "Phone Number" : "Contact No."}
              </label>
              {editAble ? (
                <input
                type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+123456789"
                  value={formData?.phoneNumber}
                  onChange={onInputChange}
                  required
                />
              ) : (
                <p className="vendor-preview">{formData?.phoneNumber}</p>
              )}
            </div>
          </div>
          {editAble ? (
            <div className="row mt-5">
              <div className="col-12 col-md-6 col-lg-4">
                <button
                type="submit"
                  className="btn btn-solid btn-solid-primary w-100 py-3"
                >
                  Save
                </button>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <button
                  className="btn btn-outline-primary w-100 py-3"
                  onClick={() => {
                    setEditAble(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="row mt-5">
              <div className="col-12 col-md-6 col-lg-4">
                <button
                  className="btn btn-solid btn-solid-primary w-100 py-3"
                  onClick={() => {
                    setEditAble(true);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="col-12 col-md-6 col-lg-6"></div>
            </div>
          )}
        </div>
        {/* ******************************************************* */}
      </article>
      </form>
    </>
  );
}

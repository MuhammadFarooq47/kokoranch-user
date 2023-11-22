import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaRegEdit } from "react-icons/fa";
import Images from "../../../constants/images";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  UPDATE_USER,
  UPDATE_VENDOR,
  UPDATE_ACCOUNT_DETAIL,
} from "../../../redux/actions/authentication";
import { useEffect } from "react";
import { GET } from "../../../apis/requests";
import Settings from "./Settings";



export default function Profile({ setSidebar, sidebar }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  
  console.log("user from vendor profile", user);

  

  const [editAble, setEditAble] = useState(false);
  const [bankEditable, setBankEditable] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName ? user.firstName : "",
    lastName: user?.lastName ? user.lastName : "",
    image: user?.image?.url ? user.image.url : Images.Pictures.profile,
    email: user?.email ? user.email : "",
    phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
    fileContent: null,
  });

  const [bankDetail, setBankDetail] = useState({
    bankName: user?.bankName ? user.bankName : "",
    bankAccountNo: user?.bankAccountNo ? user.bankAccountNo : "",
    routingNo: user?.routingNo ? user.routingNo : "",
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
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    photo: null, 
    storeName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  console.log("vendor Form Data ????????????", formData)

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

      dispatch(UPDATE_VENDOR(updatedUserData));
      // setTimeout(() => {
      //   setEditAble(false);
      // }, 4000);
      // setFormChange(false);
    } catch (error) {
      console.log(error.response, "Error while updating user info");
      // toast.error("Error updating user info");
    }
  };

  // Farooq Code end

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log("first", profileData.fileContent);
    var myformData = new FormData();
    myformData.append("firstName", profileData.firstName);
    myformData.append("lastName", profileData.lastName);
    myformData.append("email", profileData.email);
    myformData.append("phoneNumber", profileData.phoneNumber);
    console.log("jksahdjk: ", myformData);

    if (profileData.fileContent) {
      myformData.append("image", profileData.fileContent);
    }
    try {
      console.log("after: ", myformData);
      dispatch(UPDATE_VENDOR(myformData));
      // setEditAble(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const submitAccountDetailHandler = () => {
    dispatch(UPDATE_ACCOUNT_DETAIL(bankDetail, token, user._id));
  };
  useEffect(() => {
    console.log("prfile data", profileData);
    setProfileData({
      ...profileData,
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      image: user?.image?.url ? user.image?.url : Images.Pictures.profile,
      email: user?.email ? user.email : "",
      phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
      fileContent: null,
    });
  }, [user]);
  return (
    <>
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title="My Profile" />
      <form onSubmit={onsubmit}>
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
                  id="email"
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
            <> 
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
            {/* <Settings /> */}
            </>
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

          {/* {editAble ? (
            <Settings />
          ) } */}
        </div>
        {/* ******************************************************* */}
        <hr className="hr-rule" />
        <div className="vendor-profile-main_form">
          <div className="bank-details">
            <h4 className="bank-details-heading">
              {bankEditable && "Edit "}Bank Account Details :
            </h4>
            {!bankEditable && (
              <div>
                <p className="bank-detail mb-4">
                  Bank Name :
                  <span className="bank-detail-light">
                    &nbsp; {bankDetail?.bankName}
                  </span>
                </p>
                <p className="bank-detail mb-4">
                  Bank Account Number:
                  <span className="bank-detail-light">
                    &nbsp; {bankDetail?.bankAccountNo}
                  </span>
                </p>
                <p className="bank-detail">
                  Routing No:
                  <span className="bank-detail-light">
                    &nbsp; {bankDetail?.routingNo}
                  </span>
                </p>
              </div>
            )}
            {bankEditable && (
              <div className="row">
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="firstName" className="form-label">
                    Bank Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="bank-name"
                    name="bank-name"
                    placeholder="Enter Your Bank Name"
                    value={bankDetail.bankName}
                    onChange={(e) => {
                      setBankDetail({
                        ...bankDetail,
                        bankName: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <label htmlFor="firstName" className="form-label">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bank-name"
                    name="bank-name"
                    placeholder="Enter Your Bank Account Number"
                    value={bankDetail.bankAccountNo}
                    onChange={(e) => {
                      setBankDetail({
                        ...bankDetail,
                        bankAccountNo: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6 mt-4">
                  <label htmlFor="firstName" className="form-label">
                    Routing No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bank-name"
                    name="bank-name"
                    placeholder="Enter Your Routing Number"
                    value={bankDetail.routingNo}
                    onChange={(e) => {
                      setBankDetail({
                        ...bankDetail,
                        routingNo: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
            )}
            {!bankEditable && (
              <div className="row mt-5">
                <div className="col-12 col-md-6 col-lg-4">
                  <button
                    className="btn btn-solid btn-solid-primary w-100 py-3"
                    onClick={() => {
                      setBankEditable(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
            {bankEditable && (
              <div className="row mt-5">
                <div className="col-12 col-md-6 col-lg-4">
                  <button
                    onClick={() => {
                      submitAccountDetailHandler();
                      setBankEditable(false);
                    }}
                    className="btn btn-solid btn-solid-primary w-100 py-3"
                  >
                    Save
                  </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <button
                    className="btn btn-outline-primary w-100 py-3"
                    onClick={() => {
                      setBankEditable(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
      </form>
    </>
  );
}

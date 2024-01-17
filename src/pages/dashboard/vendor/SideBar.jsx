import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as WineBottle } from "../../../assets/images/icons/wine-bottle.svg";
import { ReactComponent as AgriService } from "../../../assets/images/icons/agri-service.svg";
import { ReactComponent as FeatherList } from "../../../assets/images/icons/feather-list.svg";
import { ReactComponent as Inbox } from "../../../assets/images/icons/inbox.svg";
import { ReactComponent as Marijuana } from "../../../assets/images/icons/marijuana.svg";
import { ReactComponent as Medal } from "../../../assets/images/icons/medal.svg";
import { ReactComponent as Ratings } from "../../../assets/images/icons/ratings.svg";
import { ReactComponent as Settings } from "../../../assets/images/icons/settings.svg";
import { ReactComponent as Shipping } from "../../../assets/images/icons/shipping.svg";
import { ReactComponent as UserProfile } from "../../../assets/images/icons/user-20.svg";
import Images from "../../../constants/images";
import { LOGOUT } from "../../../redux/actions/authentication";
import Popup from "../../../components/popUp/popUp";

import {BiSolidUser} from "react-icons/bi"
import {FaShippingFast, FaRegUser, FaSignOutAlt} from "react-icons/fa";
import {BsChatLeft} from "react-icons/bs";
import {MdRateReview} from "react-icons/md";
import {SiGumtree} from "react-icons/si";
import {IoSettingsSharp} from "react-icons/io5";
import { io } from "socket.io-client";
import { Get } from "../../../Axios/AxiosFunctions";
import { BaseURL } from "../../../config/apiUrl";

const socket = io.connect("https://kokoranch-backend-45665121adb2.herokuapp.com");

export default function VendorSideBar({ children }) {
  const {user} = useSelector((state) => state.authReducer)
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setSidebar, sidebar });
    }
    return child;
  });

  const [vendor] = useState("Vendor")
const [trader] = useState("Trader")
const [popupOpenLogin, setPopupOpenLogin] = useState(false);
const [popupOpen, setPopupOpen] = useState(false);
const [roomsLength, setRoomsLength] = useState();
// console.log("🚀 ~ roomsLength:", roomsLength)


  const storageToken = localStorage.getItem("token");

  const logoutAndSwitch = (e) => {
    e.preventDefault();
    dispatch(LOGOUT(storageToken, navigate))

  }
  const token = localStorage.getItem("token")

  const getRooms = async () => {
    // const apiUrl = BaseURL("chat/rooms");
    const apiUrl = BaseURL("chats/rooms"
    );
    const response = await Get(apiUrl, token);
    // console.log("🚀 ~ file: index.js:67 ~ Sidebar getRooms ~ response:", response?.data?.data?.length)
    if (response !== undefined) {
      setRoomsLength(response?.data?.data?.length);
    }
  };

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <> 
     {/* Popup start*/}
     <Popup open={popupOpenLogin} setOpen={setPopupOpenLogin}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.userIcon}
            className="model-wrapper_image"
            alt="user-icon"
          />
          <p className="model-wrapper_text">Are you sure to switch your Account!</p>
         
          <Link
            to="/login"
            onClick={(e) => {
              setPopupOpen(false);
              logoutAndSwitch(e);
            }}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
           Switch
          </Link>
        </div>
      </Popup>
      {/* Popup End */}
  
    <div className="vendor-board-wrapper">
      <div id="vendor-board-container">
        <aside className={`side-navbar ${sidebar && "active-nav"}`}>
          <div className="logo-div">
            <img
              src={Images.Pictures.logo}
              style={{ margin: "0 auto", width: "7rem" }}
              alt="sunset"
            />
            <span style={{ fontSize: "2rem", marginLeft: "1rem" }}>
              KOKO Ranch
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4 className="fs-4 title-color">Vendor Dashboard</h4>
            <div>
              <h4 className="fs-5 text-bold">
                <Link
                  to={"/login"}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(LOGOUT(storageToken, navigate));
                  }}
                >
                  <FaSignOutAlt />
                  {/* <Logout width={20} fill="white" /> */}
                  &nbsp;Logout
                </Link>
              </h4>
            </div>
          </div>
          {/* <h4 className="fs-5">
            <NavLink to="/vendor-profile" className="vendor-link" end>
              <div className="vendor-inbox-link">
                <FaRegUser width={20} />
                &nbsp; My Profile
              </div>
            </NavLink>
          </h4> */}
          <h4 className="fs-5">
            <NavLink to="/vendor-profile" className="vendor-link">
              <div className="vendor-inbox-link">
                {/* <UserProfile width={20} /> */}
                <FaRegUser size={15} />
                &nbsp; Profile
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-my-products" className="vendor-link">
              <div className="vendor-inbox-link">
                <WineBottle width={20} />
                &nbsp; My Products
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-agricultural-services" className="vendor-link">
              <div className="vendor-inbox-link">
                <AgriService width={20} />
                &nbsp; My Agricultural Services
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink
              to="/vendor-productshippingdetails"
              className="vendor-link"
            >
              <div className="vendor-inbox-link">
                {/* <img src={shipping} style={{ width: "8%", marginRight: "5px" }} /> */}
                <FaShippingFast size={20} />
                &nbsp; Product Shipping Details
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink
              to="/vendor-featured-products-services"
              className="vendor-link"
            >
              <div className="vendor-inbox-link">
                <Medal width={20} />
                &nbsp; Featured Agricultural Services
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink
              to="/vendor-featured-products"
              className="vendor-link"
            >
              <div className="vendor-inbox-link">
                <Medal width={20} />
                &nbsp; Featured Products
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-productorders" className="vendor-link">
              <div className="vendor-inbox-link">
                <FeatherList width={20} />
                &nbsp; Product Orders
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-serviceorders" className="vendor-link">
              <div className="vendor-inbox-link">
                <FeatherList width={20} />
                &nbsp; Service Orders
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-inbox" className="vendor-link" 
>
              <div className="vendor-inbox-link">
                {/* <img src={inbox} style={{ width: "8%", marginRight: "5px" }} /> */}
                <BsChatLeft size={20} />
                &nbsp; Inbox
                <span className="count"> {roomsLength} </span>
              </div>
            </NavLink>
          </h4>
          {/* <h4 className="fs-5">
            <NavLink to="/vendor-rating-and-review" className="vendor-link">
              <div className="vendor-inbox-link">
              <MdRateReview size={20} />
                &nbsp; Ratings & Reviews
                <span className="count">2</span>
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-5">
            <NavLink to="/vendor-medical-merijuana" className="vendor-link">
              <div className="vendor-inbox-link">
              <SiGumtree size={20} />
                &nbsp; Medical Marijuana
              </div>
            </NavLink>
          </h4> */}
          <h4 className="fs-5">
            <NavLink to="/vendor-settings" className="vendor-link">
              <div className="vendor-inbox-link">
              <IoSettingsSharp size={20} />
                &nbsp; Settings
              </div>
            </NavLink>
          </h4>

          {/* <h4>
            <NavLink to="/vendor-settings" className="vendor-link">
              <div>
                <FaRegSun />
                &nbsp; Settings
              </div>
            </NavLink>
          </h4> */}
          {/* <div style={{ marginTop: "4rem" }}>
            <h4 className="fs-5 text-bold"> */}
          {/* <Link
                to={"/"}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(LOGOUT(navigate));
                }} */}
          {/* > */}
          {/* <FaSignOutAlt />
              &nbsp;Logout
              {/* </Link> */}
          {/* </h4>
          </div> */}

<div>
              <button
                onClick={() => {
                  setPopupOpen(true);
                  setPopupOpenLogin(true);
              }}
                className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
              >
                <h4 className="fs-4 title-color" style={{marginLeft: 0}}>Switch To {vendor} </h4>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setPopupOpen(true);
                  setPopupOpenLogin(true);}}
                className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
              >
                <h4 className="fs-4 title-color" style={{marginLeft: 0}}>Switch To {trader} </h4>
              </button>
            </div>
          {/* <h4 className="fs-5 ">
            Switch To <span className="title-color">Buyer</span>
          </h4> */}
        </aside>
        <main>{childrenWithProps}</main>
      </div>
    </div>
    </>
  );
}

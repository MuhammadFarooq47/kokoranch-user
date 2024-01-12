import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { LOGOUT } from "../../redux/actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import Popup from "../popUp/popUp";
import Images from "../../constants/images";
import { FaAngleRight } from "react-icons/fa";

export default function UserSideMenu({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [popupOpenLogin, setPopupOpenLogin] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
const [vendor] = useState("Vendor")
const [trader] = useState("Trader")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GETTING DATA FROM REDUX STORE
  const { user } = useSelector((state) => state.authReducer);
  const storageToken = localStorage.getItem("token");

  const logoutAndSwitch = (e) => {
    e.preventDefault();
    dispatch(LOGOUT(storageToken, navigate))

  }

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
      <div className="container">
        <div className="user-side-menu-wrapper">
          <div
            className={`user-side-menu-wrapper_side-bar ${
              showSidebar ? "side-bar-show" : null
            }`}
          >
            <FaRegWindowClose
              style={{ fontSize: "2rem", cursor: "pointer", float: "right" }}
              onClick={() => {
                setShowSidebar(false);
              }}
            />
            <div>
              <h3 className="fs-3">HELLO, {user.firstName}</h3>
              <h4 className="fs-4 title-color">(Buyer Dashboard)</h4>
            </div>
            <div>
              <h3 className="fs-3 title-color">Manage My Account</h3>
              <h4 className="fs-4">
                <NavLink to="/my-profile" className="user-link">
                  My Profile
                </NavLink>
              </h4>
              <h4 className="fs-4">
                <NavLink to="/address-book" className="user-link">
                  Address Book
                </NavLink>
              </h4>
              <h4 className="fs-4">
                <NavLink to="/inbox" className="user-link">
                  Inbox
                </NavLink>
              </h4>
            </div>
            <div>
              <h3 className="fs-3  title-color">My Orders</h3>
              <h4 className="fs-4">
                <NavLink to="/orders-info" className="user-link">
                  Orders Information
                </NavLink>
              </h4>
              {/* <h4 className="fs-4">
                <NavLink to="/trade-request" className="user-link">
                  Trade Request
                </NavLink>
              </h4> */}
              <h4 className="fs-4">
                <NavLink to="/cart" className="user-link">
                  My Cart
                </NavLink>
              </h4>
            </div>
            <div>
              <h3 className="fs-3 title-color">My Wishlist</h3>
              <h4 className="fs-4">
                <NavLink to="/wishlist" className="user-link">
                  Wishlist
                </NavLink>
              </h4>
            </div>
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
          </div>
          <FaBars
            className="bars-icon"
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          />
          {children}
        </div>
      </div>

     
    </>
  );
}

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaTradeFederation,
  FaRegFile,
  FaRegCommentAlt,
  FaRegSun,
  FaSignOutAlt,
} from "react-icons/fa";
import Images from "../../constants/images";
import { LOGOUT } from '../../redux/actions/authentication';
import Popup from "../popUp/popUp"

export default function TraderSideBar({ children }) {
  const { user } = useSelector((state) => state.authReducer);
console.log(user)
  const [sidebar, setSidebar] = useState(true);
  const [vendor] = useState("Vendor")
  const [trader] = useState("Trader")
  const [popupOpenLogin, setPopupOpenLogin] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storageToken = localStorage.getItem("token");

  const logoutAndSwitch = (e) => {
    e.preventDefault();
    dispatch(LOGOUT(storageToken, navigate))

  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setSidebar, sidebar });
    }
    return child;
  });
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

      <div className="trader-board-wrapper">
      <div id="trader-board-container">
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
         <h4 className="fs-4 title-color">(Trader Dashboard)</h4>
          <h4 className="fs-4">
            <NavLink to="/trader-profile" className="trader-link">
              <div>
                <FaRegUser />
                &nbsp; My Profile
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-4">
            <NavLink to="/trader-trades" className="trader-link">
              <div>
                <FaTradeFederation />
                &nbsp; My Trades
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-4">
            <NavLink to="/trader-trade-request" className="trader-link">
              <div>
                <FaRegFile />
                &nbsp; Trade Request(Comments)
              </div>
            </NavLink>
          </h4>
          <h4 className="fs-4">
            <NavLink to="/trader-inbox" className="trader-link">
              <div className="trader-inbox-link">
                <FaRegCommentAlt />
                &nbsp; inbox
                <span className="count">3</span>
              </div>
            </NavLink>
          </h4>

          <h4>
            <NavLink to="/trader-settings" className="trader-link">
              <div>
                <FaRegSun />
                &nbsp; Settings
              </div>
            </NavLink>
          </h4>
          <div style={{ marginTop: "5rem" }}>
            <h4 className="fs-4 text-bold">
              <Link
                to={"/"}
                onClick={(e) => {
                  e.preventDefault();
                  logoutAndSwitch(e);
                }}
              >
                <FaSignOutAlt />
                &nbsp;Logout
              </Link>
            </h4>
          </div>

          <button
                onClick={() => {
                  setPopupOpen(true);
                  setPopupOpenLogin(true);
              }}
                className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
              >
                <h4 className="fs-4 title-color" style={{marginLeft: 0}}>Switch To {vendor} </h4>
              </button>
              <button
                onClick={() => {
                  setPopupOpen(true);
                  setPopupOpenLogin(true);}}
                className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
              >
                <h4 className="fs-4 title-color" style={{marginLeft: 0}}>Switch To {trader} </h4>
              </button>
        </aside>
        <main>{childrenWithProps}</main>
      </div>
    </div>
    </>
    
  );
}

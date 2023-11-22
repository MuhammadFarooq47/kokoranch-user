import React, { useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import Images from "../../../constants/images";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LOGOUT } from "../../../redux/actions/authentication";
import {FaSignOutAlt} from "react-icons/fa";

export default function NavBar({ setSidebar, sidebar, title }) {
  const { user } = useSelector((state) => state.authReducer);
  console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("user changed");
  }, [user]);

  const dispatch = useDispatch()

  const storageToken = localStorage.getItem("token")
  
  return (
    <nav className="trader-profile-navbar">
      <div className="trader-profile-navbar_left">
        <div
          className="border-0 "
          id="menu-btn"
          onClick={() => {
            setSidebar(!sidebar);
          }}
        >
          <FaBars />
        </div>
        <h3>{title}</h3>
      </div>
      <div className="trader-profile-navbar_right">
        <div
          className="trader-profile-navbar_right_notification-wrapper cursor-pointer"
          onClick={() => {
            navigate("/vendor-notifications", {
              params: { id: "12345797564" },
            });
          }}
        >
          <FaBell className="trader-profile-navbar_right_notification-wrapper_icon" />
          <span className="trader-profile-navbar_right_notification-wrapper_count">
            3
          </span>
        </div>
        <div className="trader-profile-navbar_right_user-wrapper">
          <img
            src={user?.photo ? `https://kokoranch-development.s3.ap-south-1.amazonaws.com/${user.photo}` : Images.Pictures.profile}
            className="trader-profile-navbar_right_user-wrapper_image"
            alt="trader"
          />
          <div>
              <h4 className="fs-5 text-bold">
                {`${user?.firstName} ${user?.lastName}`}
                {/* <Link
                  to={"/login"}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(LOGOUT(storageToken, navigate));
                  }}
                >
                  <FaSignOutAlt />
                  &nbsp;Logout
                </Link> */}
              </h4>
            </div>
        </div>
      </div>
    </nav>
  );
}

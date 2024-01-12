import React from 'react'
import { FaBars, FaBell } from 'react-icons/fa'
import Images from '../../../constants/images'
import { useSelector } from 'react-redux'

export default function Profile({ setSidebar, sidebar, title }) {
  const { user } = useSelector((state) => state.authReducer)

  return (
    <nav className="trader-profile-navbar">
      <div className="trader-profile-navbar_left">
        <div
          className="border-0 "
          id="menu-btn"
          onClick={() => {
            setSidebar(!sidebar)
          }}
        >
          <FaBars />
        </div>
        <h3>{title}</h3>
      </div>
      <div className="trader-profile-navbar_right">
        <div className="trader-profile-navbar_right_notification-wrapper">
          <FaBell className="trader-profile-navbar_right_notification-wrapper_icon" />
          <span className="trader-profile-navbar_right_notification-wrapper_count">
            3
          </span>
        </div>
        <div className="trader-profile-navbar_right_user-wrapper">
          <img
             src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${user?.photo}`  && Images?.Pictures?.profile}
            className="trader-profile-navbar_right_user-wrapper_image"
            alt="trader"
          />
          <span className="trader-profile-navbar_right_user-wrapper_name">
            {user?.firstName + ' ' + user?.lastName}
          </span>
        </div>
      </div>
    </nav>
  )
}

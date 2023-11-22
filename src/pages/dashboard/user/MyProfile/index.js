import React, { useState, useEffect } from "react";
import UserSideMenu from "../../../../components/userSideMenu";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_TOKEN } from "../../../../redux/actions/authentication";
import Cookies from "js-cookie";
import { GET_USER_CHECKOUT_DATA } from "../../../../redux/actions/checkout";

// components
import InfoForm from "./InfoForm";
import PasswordChangeForm from "./PasswordChangeForm";
import InfoDetails from "./InfoDetails";
import {
  GET_USER_WISHLIST,
  WISHLIST_REMOVE_ITEM,
} from '../../../../redux/actions/wishlist';

export default function MyProfile() {
  const [formChange, setFormChange] = useState({});
  // console.log("Form Change", formChange.data);

  const {user, isAuthenticated} = useSelector((state) => state.authReducer);

  const token = localStorage.getItem("token");

  // const { user } = useSelector((state) => state.authReducer);

  // console.log("My profile user data", user);
  // console.log("My profile user token", token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CHECK_TOKEN(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(GET_USER_CHECKOUT_DATA());
  }, []);

  useEffect(() => {
    if (isAuthenticated || user) {
      dispatch(GET_USER_WISHLIST(token))
    }
  }, []);


  // console.log(formChange);
  return (
    <UserSideMenu>
      <div className="my-profile-wrapper">
        <h2 className="fs-2 mb-5">
          <span
            style={
              formChange === "password-form"
                ? { cursor: "pointer" }
                : { cursor: "initial" }
            }
            onClick={
              formChange === "password-form"
                ? () => {
                    setFormChange(false);
                  }
                : null
            }
          >
            My Profile
          </span>
          {formChange === "password-form" ? " > Change Password" : null}
        </h2>
        <div className="row my-profile-wrapper_inner-wrapper">
          {formChange === "info-form" ? (
            <InfoForm setFormChange={setFormChange} />
          ) : formChange === "password-form" ? (
            <PasswordChangeForm setFormChange={setFormChange} />
          ) : (
            <InfoDetails setFormChange={setFormChange} />
          )}
        </div>
      </div>
    </UserSideMenu>
  );
}

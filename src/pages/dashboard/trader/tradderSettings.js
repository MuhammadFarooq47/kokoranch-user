import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { PUT } from "../../../apis/requests";

export default function Profile({ setSidebar, sidebar }) {
  // const [isLoading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.authReducer);
  const [isLoading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordChanges] = useState({
    currentPawword: "1234567890",
    password: "1234567890",
    confirm: "1234567890",
  });

  const [value, setValue] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [tradeNotify, setTradeNotify] = useState({
    InApp: true,
    email: true,
  });
  const [inboxNotify, setInboxNotify] = useState({
    InApp: true,
    email: true,
  });

  const onsubmit = () => {
    if (value.newPassword !== value.confirmPassword) {
      toast.error("Password does not match");
    } else {
      PUT("/users/update_password", token, "", value)
        .then((response) => {
          if (response.success === false) {
            toast.error(response.message);
            setLoading(false);
          } else {
            // debugger
            toast.success(response.message);
            setLoading(false);
            setPopupOpen(true);
            // CLEARING VALUES
            setValue({
              password: "",
              newPassword: "",
              confirmPassword: "",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
          console.log(error.message);
        });
    }
  };
  const onchange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} title="Settings" />
      <article className="trader-trade-settings-wrapper">
        <div className="trader-trade-settings-wrapper_left">
          <div className="trader-trade-settings-wrapper_password-form-wrappper">
            <h2 className="fs-2">Update Password</h2>
            <form className="trader-trade-settings-wrapper_password-form-wrappper_form">
              <input
                type="password"
                className="form-control "
                id="firstName"
                name="password"
                value={value.password}
                onChange={onchange}
                placeholder="Current Password"
                required
              />

              <input
                type="password"
                className="form-control"
                id="firstName"
                name="newPassword"
                value={value.newPassword}
                onChange={onchange}
                placeholder="New Password"
                required
              />

              <input
                type="password"
                className="form-control"
                id="firstName"
                name="confirmPassword"
                value={value.confirmPassword}
                onChange={onchange}
                placeholder="Confirm Password"
                required
              />
              <button
                onClick={() => {
                  onsubmit();
                }}
                className="btn btn-solid btn-solid-primary"
                style={{ overflow: "hidden" }}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
        <div className="trader-trade-settings-wrapper_right">
          <div className="trader-trade-settings-wrapper_notification-div-wrappper trader-trade-settings-wrapper_notification-div-wrappper_top">
            <h2 className="fs-2">New Trade Requests (Comments)</h2>
            <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div">
              <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper">
                <h2 className="fs-2">In App Notification</h2>
                <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper_check-box-wrapper">
                  <label
                    className={`form-check-label ${
                      !tradeNotify.InApp && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    off
                  </label>{" "}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={() =>
                        setTradeNotify({
                          ...tradeNotify,
                          InApp: !tradeNotify.InApp,
                        })
                      }
                      checked={tradeNotify.InApp ? true : false}
                    />
                  </div>
                  <label
                    className={`form-check-label ${
                      tradeNotify.InApp && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    on
                  </label>
                </div>
              </div>
              <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper">
                <h2 className="fs-2">Email Notification</h2>
                <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper_check-box-wrapper">
                  <label
                    className={`form-check-label ${
                      !tradeNotify.email && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    off
                  </label>{" "}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={() =>
                        setTradeNotify({
                          ...tradeNotify,
                          email: !tradeNotify.email,
                        })
                      }
                      checked={tradeNotify.email ? true : false}
                    />
                  </div>
                  <label
                    className={`form-check-label ${
                      tradeNotify.email && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    on
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="trader-trade-settings-wrapper_notification-div-wrappper trader-trade-settings-wrapper_notification-div-wrappper_bottom">
            <h2 className="fs-2">New Inbox Message</h2>
            <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div">
              <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper">
                <h2 className="fs-2">In App Notification</h2>
                <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper_check-box-wrapper">
                  <label
                    className={`form-check-label ${
                      !inboxNotify.InApp && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    off
                  </label>{" "}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={() =>
                        setInboxNotify({
                          ...tradeNotify,
                          InApp: !inboxNotify.InApp,
                        })
                      }
                      checked={inboxNotify.InApp ? true : false}
                    />
                  </div>
                  <label
                    className={`form-check-label ${
                      inboxNotify.InApp && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    on
                  </label>
                </div>
              </div>
              <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper">
                <h2 className="fs-2">Email Notification</h2>
                <div className="trader-trade-settings-wrapper_notification-div-wrappper_notification-div_inner-wrapper_check-box-wrapper">
                  <label
                    className={`form-check-label ${
                      !inboxNotify.email && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    off
                  </label>{" "}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={() =>
                        setInboxNotify({
                          ...tradeNotify,
                          email: !inboxNotify.email,
                        })
                      }
                      checked={inboxNotify.email ? true : false}
                    />
                  </div>
                  <label
                    className={`form-check-label ${
                      inboxNotify.email && "form-check-label_active"
                    }`}
                    for="flexSwitchCheckDefault"
                  >
                    on
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

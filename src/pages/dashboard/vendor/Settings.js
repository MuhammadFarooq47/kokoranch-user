import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { PUT, PATCH } from "../../../apis/requests";
import NavBar from "./NavBar";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Popup from "../../../components/popUp/popUp";
import Images from "../../../constants/images";
import { LOGOUT } from "../../../redux/actions/authentication";
import { useNavigate } from "react-router-dom";

const IOSSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    checked={props.checked}
    onChange={props.handleChange}
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#14A384" : "#14A384",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#14A384",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Settings({ setSidebar, sidebar }) {
  // const [isLoading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.authReducer);
  const [isLoading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const [value, setValue] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log("event.target.checked", event.target.checked);
  };
  // SETTING STATE WITH INPUT
  const onchange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  // FORM SUBMISSION
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await PATCH("/users/updateMyPassword", token, "", value);
      console.log("/users/updatePassword", res)
      setPopupOpen(true)
      toast.success("Password Updated Successfully...");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err?.response?.data?.message)
    }
  };

  const logoutAndSwitch = (e) => {
    e.preventDefault();
    dispatch(LOGOUT(token, navigate));
  };

  return (
    <>
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title="Settings" />
      <article className="vendor-profile-main">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 mb-5">
            <h2 className="fs-3 mb-5">Update Password</h2>

            <form onSubmit={onsubmit} className="vendor-setting-form-wrapper">
              <input
                type="password"
                className="form-control"
                id="passwordCurrent"
                name="passwordCurrent"
                value={value.passwordCurrent}
                onChange={onchange}
                placeholder="Current Password"
                required
              />

              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={value.password}
                onChange={onchange}
                placeholder="New Password"
                required
              />

              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                value={value.passwordConfirm}
                onChange={onchange}
                placeholder="Confirm Password"
                required
              />
              <button
                type="submit"
                // onClick={() => {
                //   onsubmit();
                // }}
                className="btn btn-solid btn-solid-primary"
                style={{ overflow: "hidden" }}
              >
                UPDATE
              </button>
            </form>
          </div>

          {/* <div className="col-12 col-sm-12 col-md-6 col-lg-5 mb-5">
            <h2 className="fs-3">New Order</h2>
            <div className="vendor-setting-wrapper-right">
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>In App Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Push Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Email Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="col-12 col-sm-12 col-md-6 col-lg-5 mb-5">
            <h2 className="fs-3">New Inbox Message</h2>
            <div className="vendor-setting-wrapper-right">
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>In App Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Push Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Email Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-5">
            <h2 className="fs-3">New Review</h2>
            <div className="vendor-setting-wrapper-right">
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>In App Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            checked={checked}
                            onChange={handleChange}
                          />
                        }
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Push Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
              <div className=" row  justify-content-between align-items-center">
                <div className="col-6 ">
                  <label>Email Notification</label>
                </div>

                <div className="col-6 d-flex justify-content-end">
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Off</Typography>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </article>

      {/* Popup start */}
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="success"
          />
          <p className="model-wrapper_text" style={{ fontSize: "1.5rem" }}>
            Password Updated Successfully, Login Again
          </p>
          <button
            onClick={(e) => {
              setPopupOpen(false);
              logoutAndSwitch(e);
              //  setFormChange(false)
            }}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Close
          </button>
        </div>
      </Popup>
      {/* Popup end */}
    </>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../../constants/images";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { VENDOR_TRADER_REGISTER } from "../../../redux/actions/authentication";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function VendorRegister() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [user, setUser] = new useState({
    storeName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agreement: false,
    role: "vendor",
    photo: "",
  });

  console.log(`${user?.role} Data`,  user)
  // CHANGE HANDLER
  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT HANDLER
  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData;
    if (user.photo) {
      formData = new FormData();
      for (const key in user) {
        if (key === "photo") {
          formData.append("photo", user[key], user[key].name);
        } else {
          formData.append(key, user[key]);
        }
      }
    }
    console.log("user", user.photo);
    // dispatch(REGISTER(user, setLoading, Navigate));
    dispatch(VENDOR_TRADER_REGISTER(formData || user, setLoading, Navigate));
  };
  return (
    <>
      <div className="container vendor-register-wrapper">
        <div className="col-12 dark-card my-5 vendor-register-wrapper_inner-wrapper">
          <img
            src={Images.Pictures.brownRightLeaf}
            className="vendor-register-wrapper_inner-wrapper_bg-image-1"
            alt="leaf"
          />
          <img
            src={Images.Pictures.curvePathGradient}
            className="vendor-register-wrapper_inner-wrapper_bg-image-2"
            alt="curve"
          />
          <div className="row mt-md-1 px-5 vendor-register-wrapper_inner-wrapper_form-wrapper">
            <div className="col-md-12 col-lg-8 col-sm-12  vendor-register-wrapper_inner-wrapper_form-wrapper_left">
              <form
                className="row vendor-register-wrapper_inner-wrapper_form-wrapper_left_form"
                onSubmit={onsubmit}
              >
                <div className="col-12 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_toggle-weapper">
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="radio-one"
                      name="role"
                      value="vendor"
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                      checked={user?.role === "vendor" ? true : false}
                      required
                    />
                    <label for="radio-one">Sign Up as Vendor</label>
                    <input
                      type="radio"
                      id="radio-two"
                      name="role"
                      value="trader"
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                      checked={user?.role === "trader" ? true : false}
                      required
                    />
                    <label for="radio-two">Sign Up as Trader</label>
                  </div>
                </div>
                <div
                  className="col-12 d-flex vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_profile-image-and-input-wrapper"
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className="profile-image">
                    <input
                      type="file"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          photo: e.target.files[0],
                        });
                      }}
                    />
                    <img
                      src={
                        user?.photo
                          ? URL.createObjectURL(user?.photo)
                          : // user?.image
                            Images.Pictures.profile
                      }
                      width={150}
                      height={150}
                      alt="Profile"
                    />
                    <div className="gradient-card plus-sign">
                      <FaPlus />
                    </div>
                  </div>
                  <div
                    className="mt-5 d-flex align-items-start justify-content-start flex-column"
                    style={{ width: "100%" }}
                  >
                    <label for="company" className="form-label">
                      Public Profile/Store Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      value={user.storeName}
                      onChange={onchange}
                      name="storeName"
                      placeholder="It can be changed from settings."
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper ">
                  <label for="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={user.firstName}
                    onChange={onchange}
                    name="firstName"
                    placeholder="Enter Your First Name"
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper">
                  <label for="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={user.lastName}
                    onChange={onchange}
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper">
                  <label for="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user.email}
                    onChange={onchange}
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper">
                  <label for="contact" className="form-label">
                    Enter Phone Number
                  </label>
                  <PhoneInput
                    enableSearch={true}
                    country={"us"}
                    id="contact"
                    value={user.phone}
                    onChange={(phone) => setUser({ ...user, phone })}
                    name="contact"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper">
                  <label for="password" className="form-label">
                    Create New Password
                  </label>
                  <div className="input-group input-group-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={user.password}
                    onChange={onchange}
                    name="password"
                    placeholder="Create New Password"
                    required
                  />
                   <span
              className="input-group-text password-toggle"
              style={{backgroundColor: "#383838", border: "none"}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash color="#fff" /> : <FaEye color="#fff" />}
            </span>
            </div>
                </div>
                <div className="col-md-6 col-sm-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_input-wrapper">
                  <label for="confirm" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group input-group-password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirm"
                    value={user.confirm}
                    onChange={onchange}
                    name="confirm"
                    placeholder="Confirm Password"
                    required
                  />
                   <span
              className="input-group-text password-toggle"
              style={{backgroundColor: "#383838", border: "none"}}
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash color="#fff" /> : <FaEye color="#fff" />}
            </span>
            </div>
                </div>
                <div className="col-12 mt-4 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_agrement-wrapper d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="checkbox_animated_2 check-it me-4"
                    name="agreement"
                    onChange={(e) =>
                      setUser({ ...user, agreement: e.target.checked })
                    }
                    checked={user.agreement}
                  />
                  <p>
                    I agree with the
                    <Link to={"/policy"} style={{ color: "#14a384" }}>
                      {" "}
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to={"/terms"} style={{ color: "#14a384" }}>
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
                <div className="col-md-12 mt-3 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_link-wrapper">
                  <p className="font-dark">
                    For Buyer Sign Up{" "}
                    <Link to="/register" style={{ color: "#14a384" }}>
                      Click here ?
                    </Link>
                  </p>
                </div>
                <div className="col-md-12 mt-3 vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_link-wrapper">
                  <p className="font-dark">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#14a384" }}>
                      Login
                    </Link>
                  </p>
                </div>

                <button
                  onClick={(e) => {}}
                  className="btn btn-solid btn-solid-primary-rounded  vendor-register-wrapper_inner-wrapper_form-wrapper_left_form_button fs-5"
                  type="submit"
                  disabled={isLoading || !user.agreement}
                >
                  Create Account
                </button>
              </form>
            </div>
            <div className="col-md-12 col-lg-4 col-sm-12  vendor-register-wrapper_inner-wrapper_form-wrapper_right">
              <div className="info-box mt-4">
                <h2 className="fs-2">
                  Who is <span className="border-title">{user.role}?</span>
                </h2>
                <p className="mt-4 font-dark" style={{ lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

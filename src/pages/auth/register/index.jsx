import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../../constants/images";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { REGISTER } from "../../../redux/actions/authentication";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const dispatch = new useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const [user, setUser] = new useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
    role: "user",
  });

  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user.password !== user.confirm) {
      setLoading(false);
      toast.error("Password does not match");
      return false;
    }
    if (user.password.length < 9) {
      setLoading(false);
      toast.error("Password must be at least 9 characters");
      return false;
    }
    try {
    await  dispatch(REGISTER(user, setLoading, navigate));
    // navigate("/signup-success")
    } catch (error) {
      // Check if error object has error status and message properties
      if (error.status && error.message) {
        toast.error(`Signup error: ${error.status} - ${error.message}`);
      } else {
        toast.error("An error occurred during signup.");
      }
      // console.error("Signup error", error);
    }
 
  };
  return (
    <>
     <div className="d-flex justify-content-center mt-5">
        <div className="brand-logo" style={{display: "flex", flexDirection: "row", justifySelf: "center", alignItems: "center"}}>
          <Link to="/">
            <img
              src={Images.Pictures.logo}
              className="img-fluid lazyload"
              width={80}
              height={80}
              alt="logo"
            />
          </Link>
            <h2 style={{ marginLeft: "1rem" }}>KOKO Ranch</h2>
        </div>
      </div>
      <div
        className="container-fluid auth-back d-flex justify-content-center py-5"
        style={{
          position: "relative",
        }}
      >
        <img
          src={Images.Pictures.brownLeftLeaf}
          style={{
            position: "absolute",
            bottom: "-17rem",
            left: "0rem",
            width: "60rem",
          }}
          alt="brown-left-leaf"
        />
        <div className="col-lg-6 col-md-11 col-sm-12 dark-card auth-card d-flex my-5">
          <div className="row mt-md-1">
            <div className="col-12 text-center mt-5">
              <h2 style={{ fontWeight: 400 }}>Sign Up as Buyer</h2>
            </div>
            <form className="row px-5 my-3" onSubmit={onsubmit}>
              <div className="col-md-6 col-sm-12 mt-4">
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
              <div className="col-md-6 col-sm-12 mt-4">
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
              <div className="col-md-6 col-sm-12 mt-4">
                <label for="email" className="form-label">
                  Enter Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={user.email}
                  onChange={onchange}
                  name="email"
                  placeholder="Enter Your Email Address"
                  required
                />
              </div>
              <div className="col-md-6 col-sm-12 mt-4">
                <label for="contact" className="form-label">
                  Enter Phone Number
                </label>
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  id="contact"
                  value={user.phoneNumber}
                  onChange={(phoneNumber) => setUser({ ...user, phoneNumber })}
                  name="contact"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="col-md-6 col-sm-12 mt-4">
                <label for="password" className="form-label">
                  Create New Password
                </label>
                <div className="input-group input-group-password">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={user.password}
                  onChange={onchange}
              name="password"
              placeholder="Enter Password"
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
              <div className="col-md-6 col-sm-12 mt-4">
                <label for="confirm" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group input-group-password">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              id="confirm"
              value={user.confirm}
              onChange={onchange}
              name="confirm"
              placeholder="Confirm Your Password"
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
              <div className="col-12 mt-5 d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={isCheck}
                  onChange={() => setCheck(!isCheck)}
                  className="checkbox_animated_2 check-it me-4"
                />{" "}
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
              <div className="col-md-12 mt-3 text-center">
                <p>
                  Want to sign up as a Vender or Trader.{" "}
                  <Link to="/vendor-register" style={{ color: "#14a384" }}>
                    Click here ?
                  </Link>
                </p>
              </div>
              <div className="col-md-12 mt-3 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#14a384" }}>
                    Login
                  </Link>
                </p>
              </div>
              <div className="col-12 my-4 text-center">
                <button
                  className="btn btn-solid-light-rounded py-3 m-auto  register-btn"
                  style={{ width: "20rem", color: "#14A384" }}
                  // disabled={isLoading || !isCheck}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

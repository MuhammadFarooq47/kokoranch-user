import { toast } from "react-toastify";
import ActionTypes from "../constant";
import { GET, POST, PUT, PATCH } from "../../apis/requests";
// import CryptoJS from 'crypto-js';
import axios from "axios";

const LOGIN = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await POST("/users/login", null, credentials);
      console.log("Response Login", response);

      if (response.status === "fail") {
        throw new Error(response.message);
      }

      // Successful login
      setLoading(false);
      toast.success("Login Successful");

      // const encryptionKey = CryptoJS.lib.WordArray.random(32);
      // const encryptedToken = CryptoJS.AES.encrypt(token, encryptionKey).toString();

      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("email")
      // localStorage.setItem("role", response?.data?.user?.role);

      dispatch({
        type: ActionTypes.LOGIN,
        payload: response.data,
      });
    } catch (error) {
      // Handle other errors
      console.log("Login message Error ==>>>", error.response.data.message);
      toast.error(error?.response?.data?.message);
    }
  };
};
// const USER_DATA =  (credentials, setLoading, navigate) => {
//   return async (dispatch) => {
//     try {
//       setLoading(true);
//       const response = await GET("/users/login", null, credentials);
//       console.log("Response", response.data);

//       // if (response.status === "fail") {
//       //   console.log("If response ==>>", response);
//       //   throw new Error(response.message);
//       // }
//       // Successful login
//       setLoading(false);
//       toast.success("Login Successful");
//       // navigate("/signup-success");
//       // localStorage.setItem('token', response.data.token);
//       // localStorage.setItem("userData", JSON.stringify(response.data.user));
//       dispatch({
//         type: ActionTypes.LOGIN,
//         payload: response.data,
//       });
//     } catch (error) {
//       // Handle other errors
//       console.log("Login message Error ==>>>", error.message);
//       toast.error(error.message)
//     }
//   };
// };

const LOGOUT = (token, navigate) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      dispatch({
        type: ActionTypes.LOGOUT,
      });
      navigate("/login"); // Redirect to the desired page after logout.
    } catch (error) {
      // If there is an error during logout, dispatch logoutFailure.
      console.log(error, "logout error");
    }
  };
};
const REGISTER = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await axios.post("https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/users/signup", credentials, null, "");
      toast.success("Registration Successfull");
      setLoading(false);
      navigate("/signup-success");
      localStorage.setItem("token", response?.data?.token);
      // localStorage.setItem("userData", JSON.stringify(response.message.user));
      dispatch({
        type: ActionTypes.REGISTER,
        payload: response?.data,
      });
    } catch (error) {
      // toast.error("An error occurred during registration.", error?.response?.data?.message);
      console.log("Registration error ==>>>", error?.response?.data?.message);
      console.log("Error ==================", error);
    } 
  };
};

const VENDOR_TRADER_REGISTER = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await axios.post("https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/users/signup", credentials, null, "");
      console.log("Registration Successful");
      console.log("response data =>>", response);
      toast.success("Registration Successfull");
      setLoading(false);
      navigate("/signup-success");
      // localStorage.setItem("token", response.message.token);
      // localStorage.setItem("userData", JSON.stringify(response.message.user));
      dispatch({
        type: ActionTypes.VENDOR_TRADER_REGISTER,
        payload: response.data,
      });
    } catch (error) {
      // toast.error("An error occurred during registration.", error?.statusCode);
      console.log("Register message Error ==>>>", error?.response?.message);
      // console.log("Error ==================", error);
    } 
  };
};

const UPDATE_USER = (data) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      // if (typeof data.image === 'object') {
      //   formData.append('image', data.image);
      // }

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_AUTH,
        payload: response.data,
      });
      toast.success("User Info Updated Successfully");

      // if (response.status === 200) {
      //   dispatch({
      //     type: ActionTypes.UPDATE_AUTH,
      //     payload: response.data,
      //   });
      //   toast.success("User Info Updated Successfully");
      // } else {
      //   toast.error("Error updating user info");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Error updating user info");
      // console.log(error.response, "rrrrrrrrrrr")
    }
  };
};

const UPDATE_VENDOR = (data) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      if (typeof data.photo === "object") {
        formData.append("image", data.photo);
      }

      formData.append("storeName", data?.storeName);
      formData.append("firstName", data?.firstName);
      formData.append("lastName", data?.lastName);
      formData.append("email", data?.email);
      formData.append("phoneNumber", data?.phoneNumber);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_AUTH,
        payload: response.data,
      });

      // if (response.status === 200) {
      //   dispatch({
      //     type: ActionTypes.UPDATE_AUTH,
      //     payload: response.data,
      //   });
      //   toast.success("User Info Updated Successfully");
      // } else {
      //   toast.error("Error updating user info");
      // }
    } catch (error) {
      console.log(error);
      // toast.error("Error updating user info");
      // console.log(error.response, "rrrrrrrrrrr")
    }
  };
};

const UPDATE_TRADER = (formData) => {
  return async (dispatch) => {
    try {
      // const formData = new FormData();

      // if (typeof data.photo === "object") {
      //   formData.append("image", data.photo);
      // }

      // formData.append("storeName", data?.storeName);
      // formData.append("firstName", data?.firstName);
      // formData.append("lastName", data?.lastName);
      // formData.append("email", data?.email);
      // formData.append("phoneNumber", data?.phoneNumber);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data, "UPDATE_TRADER")
      toast.success("User Info Updated Successfully");

      dispatch({
        type: ActionTypes.UPDATE_AUTH,
        payload: response.data,
      });

    } catch (error) {
      console.log(error?.message);
      // toast.error("Error updating user info");
      // console.log(error.response, "rrrrrrrrrrr")
    }
  };
};

const UPDATE_ACCOUNT_DETAIL = (data, token, userId) => {
  return (dispatch) => {
    return PUT("/users/update/bank/detail", token, userId, data)
      .then((response) => {
        console.log(response);
        // debugger
        if (response.status === false) {
          toast.error(response.message);
        } else {
          toast.success("Bank Detail Updated Successfully");
          dispatch({
            type: ActionTypes.UPDATE_AUTH,
            payload: response.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
};

const CHECK_TOKEN = (headers) => {
  return async (dispatch) => {
    try {
      const response = await GET("/users/me", headers, "");
      console.log("CHECK_TOKEN", response.data.role);
      // if (response.status === "fail") {
      //   toast.error(response.message);
      // }
      dispatch({
        type: ActionTypes.CHECK_TOKEN,
        payload: response?.data,
      });
    } catch (error) {
      // toast.error(error.message);
      console.log(error?.message)
    }
  };
};

const FORGOT_PASSWORD = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await POST("/users/forgotPassword", null, credentials);
      // navigate('/reset-password', { state: { credidentials: response.data.email } });
      // localStorage.setItem("email", response.data.email)
      // console.log(response.data, "????????????")
      // navigate('/reset-password');
      setLoading(false);
      dispatch({
        type: ActionTypes.FORGOT_PASSWORD,
        payload: response.data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
};

const OTP_VERIFY = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await POST(
        "/users/verify-forgot-password-otp",
        null,
        credentials
      );
      console.log("Response", response);
      setLoading(false); // Set loading to false
      // Use the 'navigate' function to navigate to the desired route
      navigate("/create-new-password");
      if (response.status === "error") {
        // Handle server error (status code 500)
        toast.error("Server error occurred. Please try again later.");
        console.log("Server error occurred. Please try again later.");
      }

      dispatch({
        type: ActionTypes.OTP_VERIFY,
        payload: response.data,
      });
    } catch (error) {
      // Handle network or other unexpected errors
      toast.error(error.message);
      console.log(error.message);
      setLoading(false); // Set loading to false
    }
  };
};

const CREATE_NEW_PASSWORD = (credentials, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await POST(
        "/users/resetPasswordDone",
        null,
        credentials
      );
      // navigate("/reset-password");
      if (response.status === false) {
        toast.error(response.message);
      }
      dispatch({
        type: ActionTypes.CREATE_NEW_PASSWORD,
        payload: response.data,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
};

export {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_USER,
  UPDATE_VENDOR,
  UPDATE_TRADER,
  CHECK_TOKEN,
  FORGOT_PASSWORD,
  OTP_VERIFY,
  CREATE_NEW_PASSWORD,
  VENDOR_TRADER_REGISTER,
  UPDATE_ACCOUNT_DETAIL,
};

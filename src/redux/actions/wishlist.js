import { POST, GET, PATCH } from "../../apis/requests";
import ActionTypes from "../constant";
import { toast } from "react-toastify";
import axios from "axios";

const WISHLIST_ADD_ITEM = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.patch(
        `https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/products/add-or-remove-favourite/${id}`,
        null,
        config
      );
      console.log("WISHLIST_ADD_ITEM Data", response?.data);
      dispatch({
        type: ActionTypes.ADD_TO_WISHLIST,
        payload: response?.data,
      });

      toast.success("Item added to wishlist");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
};

const WISHLIST_REMOVE_ITEM = (id, type) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    };
    try {
      const response = await axios.patch(
        `https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/products/add-or-remove-favourite/${id}`,
        { type: "remove" }, // You can add data here if needed
        config // Pass the config object with headers
      );
      console.log("WISHLIST_REMOVE_ITEM Data", response?.data);
      dispatch({
        type: ActionTypes.REMOVE_FROM_WISHLIST,
        payload: response?.data,
      });
      toast.success("Item Removed From wishlist");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error.message);
    }
  };
};

const GET_USER_WISHLIST = (token) => {
  return async (dispatch) => {
    try {
      const response = await GET("/users/my/favourites", token, "");
      console.log(response?.data, "GET WISHLIST");
      dispatch({
        type: ActionTypes.GET_WISHLIST,
        payload: response?.data,
      });
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.error(error.message);
    }
  };
};

export { WISHLIST_ADD_ITEM, GET_USER_WISHLIST, WISHLIST_REMOVE_ITEM };

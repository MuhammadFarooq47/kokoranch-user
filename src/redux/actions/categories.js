import { GET } from "../../apis/requests";
import ActionTypes from "../constant";
import { toast } from "react-toastify";

const GET_All_CATEGORIES = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/categories/", null, "");
      dispatch({
        type: ActionTypes.GET_All_CATEGORIES,
        payload: response?.data,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
};

const GET_SUB_CATEGORIES = (id) => {
  return async (dispatch) => {
    try {
      const response = await GET(`/products/category/${id}`, null, "");
      dispatch({
        type: ActionTypes.GET_SUB_CATEGORIES,
        payload: response?.data,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
};

const GET_All_CATEGORIES_SERVICES = (categoryType) => {
  return (dispatch) => {
    return GET("/categories/get/" + categoryType, null, "")
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.GET_CATEGORIES_SERVICES,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };
};

const GET_CATEGORIES_PRODUCTS = (productId, token) => {
  return async (dispatch) => {
    try {
      const response = await GET(`/products/category/${productId}`, null, '');
      dispatch({
        type: ActionTypes.GET_CATEGORIES_PRODUCTS,
        payload: response?.data,
      })
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
}

export { GET_All_CATEGORIES, GET_SUB_CATEGORIES, GET_All_CATEGORIES_SERVICES, GET_CATEGORIES_PRODUCTS };

// GET_CATEGORIES_PRODUCTS,

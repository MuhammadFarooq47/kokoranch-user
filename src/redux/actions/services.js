import { GET, POST, PUT, DELETE } from "../../apis/requests";
//  POST,
import ActionTypes from "../constant";
import { toast } from "react-toastify";

const GET_All_SERVICES = (token) => {
  return (dispatch) => {
    return POST("/services/get", token, {})
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.GET_SERVICES,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const GET_SERVICE = (serviceId, token) => {
  return (dispatch) => {
    return GET("/services/get-service/", token, serviceId)
      .then((response) => {
        console.log("resp", response);
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.GET_SERVICES,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const GET_AGRICULTURAL_SERVICES = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/agricultural-services-categories", null, "");
      // console.log("agricultural data", response.data)
      if (response.success === "fail") {
        toast.error(response.message);
      }
      dispatch({
        type: ActionTypes.GET_AGRICULTURAL_SERVICES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
};

const CREATE_SERVICE = (data, token, popup) => {
  return (dispatch) => {
    return POST("/services/create", token, data, true)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          popup(true);
          dispatch({
            type: ActionTypes.CREATE_SERVICE,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const UPDATE_SERVICE = (serviceId, data, token, popup) => {
  console.log("jkdcjkjkx");
  return (dispatch) => {
    return PUT("/services/update", token, serviceId, data, true)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          popup(true);
          dispatch({
            type: ActionTypes.CREATE_SERVICE,
            payload: response,
          });
          console.log(response);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const SAVE_SINGLE_SERVICE = (data) => {
  console.log("save service", data);
  return (dispatch) => {
    localStorage.setItem("singleService", JSON.stringify(data));
    dispatch({
      type: ActionTypes.SAVE_SINGLE_SERVICE,
      payload: data,
    });
  };
};
const UPDATE_SERVICE_STATUS = (serviceId, data, token, popup) => {
  return (dispatch) => {
    return PUT("/services/update/status", token, serviceId, { status: data })
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          popup(true);
          // dispatch({
          //   type: ActionTypes.CREATE_SERVICE,
          //   payload: response,
          // });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const DELETE_SERVICE_BY_ID = (serviceId, token, popup) => {
  return (dispatch) => {
    return DELETE("/services/deleteServiceById", token, serviceId)
      .then((response) => {
        if (response.success == false) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          popup(true);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const GET_USER_SERVICES = (sellerId, token, setData, setLoader) => {
  return (dispatch) => {
    setLoader(true);
    return GET("/services/user_services/", token, sellerId)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
          setLoader(false);
        } else {
          console.log(response);
          setLoader(false);
          setData(response.services);
          // console.log("resss", response.services);
          dispatch({
            type: ActionTypes.GET_USER_SERVICE,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const GET_SERVICE_CATEGORIES = (services) => {
  return async (dispatch) => {
    try {
      const res = await POST("/agricultural-services", services);
    dispatch({
          type: ActionTypes.GET_SERVICE_CATEGORIES,
          payload: res.data,
        });
        // setLoader(false);
    } catch (error) {
      
    }
   
  };
};

export {
  GET_AGRICULTURAL_SERVICES,
  GET_All_SERVICES,
  GET_SERVICE,
  CREATE_SERVICE,
  GET_USER_SERVICES,
  GET_SERVICE_CATEGORIES,
  SAVE_SINGLE_SERVICE,
  UPDATE_SERVICE,
  UPDATE_SERVICE_STATUS,
  DELETE_SERVICE_BY_ID,
};

// GET_All_SERVICES, GET_SERVICE,

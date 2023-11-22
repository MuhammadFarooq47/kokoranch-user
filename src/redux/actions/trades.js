import { POST, GET, DELETE, PUT } from "../../apis/requests";
import ActionTypes from "../constant";
import { toast } from "react-toastify";
import axios from "axios";

const CREATE_TRADE_ACTION = (formdata) => {
  return async (dispatch) => {
 try {
    const response = await axios.post("http://192.168.100.44:3030/api/v1/trades", formdata, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Create Trade Response", response);
    toast.success("Trade create successfull");
    dispatch({
      type: ActionTypes.CREATE_TRADE,
      payload: response?.data,
    });
    } catch (error) {
      console.log("Error from trade create", error)
    }
  };
};


// const GET_All_TRADES = (condition, token) => {
//   return (dispatch) => {
//     if (condition) {
//       return GET('/trades/get', token, condition)
//         .then((response) => {
//           if (response.success === false) {
//             toast.error(response.message)
//           } else {
//             dispatch({
//               type: ActionTypes.GET_SERVICES,
//               payload: response,
//             })
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)

//         })
//     } else {
//       return GET('/trades/get', token, '')
//         .then((response) => {
//           if (response.success === false) {
//             toast.error(response.message)
//           } else {
//             dispatch({
//               type: ActionTypes.GET_TRADES,
//               payload: response,
//             })
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)

//         })
//     }
//   }
// }
const GET_All_SELLER_TRADES = (traderId, token) => {
  return (dispatch) => {
    if (traderId) {
      return GET("/trades/user_trades/", token, traderId)
        .then((response) => {
          if (response.success === false) {
            toast.error(response.message);
          } else {
            dispatch({
              type: ActionTypes.GET_TRADER_TRADES,
              payload: response,
            });
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
};
// const GET_TRADE = (tradeId, token) => {
//   return (dispatch) => {
//     return GET('/trades/get-trade-id/', token, tradeId)
//       .then((response) => {
//         if (response.success === false) {
//           toast.error(response.message)
//         } else {
//           dispatch({
//             type: ActionTypes.GET_TRADE,
//             payload: response,
//           })
//         }
//       })
//       .catch((error) => {
//         toast.error(error.message)

//       })
//   }
// }

const EDIT_TRADE_INFO_DETAIL_ACTION = (trade, token) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.EDIT_TRADE_INFO,
      payload: trade,
    });
  };
};
const UPDATE_TRADE_TRADE_ACTION = (tradeId, token, updateTradeInfo) => {
  return (dispatch) => {
    const formData = new FormData();

    for (const element of updateTradeInfo.images) {
      if (typeof element === "object") {
        formData.append("Images", element);
      } else if (typeof element === "string") {
        formData.append("images", element);
      }
    }

    formData.append("traderId", updateTradeInfo.traderId._id);
    formData.append("details", updateTradeInfo.details);
    formData.append("inSearchOf", updateTradeInfo.inSearchOf);
    formData.append("toExchangeWith", updateTradeInfo.toExchangeWith);
    formData.append("tradeType", updateTradeInfo.tradeType);
    return PUT("/trades/update", token, tradeId, formData)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          dispatch({
            type: ActionTypes.UPDATE_TRADE,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

const GET_USER_TRADE_REQUEST_ACTION = (userId, token) => {
  return (dispatch) => {
    return GET("/trades/user-trades-requests/", token, userId)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.GET_USER_TRADE_REQUESTS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const GET_TRADER_TRADE_REQUEST_ACTION = (traderId, token) => {
  return (dispatch) => {
    return GET("/trades/trader-trades-requests/", token, traderId)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.GET_TRADER_TRADE_REQUESTS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const CREATE_TRADE_REQUEST_ACTION = (data, token) => {
  return (dispatch) => {
    return POST("/trades/create-trade-request", token, data)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          dispatch({
            type: ActionTypes.CREATE_TRADE_REQUEST,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const CREATE_TRADE_REQUEST_MESSAGE_ACTION = (data, token) => {
  return (dispatch) => {
    return POST("/trades/create-trade-request-message", token, data)
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.CREATE_TRADE_REQUEST_MESSAGE,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const DELETE_TRADE_REQUEST_ACTION = (id, token) => {
  return (dispatch) => {
    return DELETE(`/trades/delete-trade-request/${id}`, token, "")
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          dispatch({
            type: ActionTypes.DELETE_TRADE_REQUEST,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
const DELETE_TRADE_ACTION = (id, token) => {
  return (dispatch) => {
    return DELETE(`/trades/remove/${id}`, token, "")
      .then((response) => {
        if (response.success === false) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          dispatch({
            type: ActionTypes.DELETE_TRADE,
            payload: response,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

export {
  CREATE_TRADE_REQUEST_ACTION,
  GET_USER_TRADE_REQUEST_ACTION,
  GET_TRADER_TRADE_REQUEST_ACTION,
  CREATE_TRADE_REQUEST_MESSAGE_ACTION,
  DELETE_TRADE_REQUEST_ACTION,
  DELETE_TRADE_ACTION,
  GET_All_SELLER_TRADES,
  EDIT_TRADE_INFO_DETAIL_ACTION,
  UPDATE_TRADE_TRADE_ACTION,
  CREATE_TRADE_ACTION,
};

//   GET_All_TRADES,   GET_TRADE,

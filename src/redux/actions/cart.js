import ActionTypes from "../constant";
import { toast } from "react-toastify";
import { POST, GET, DELETE } from "../../apis/requests";


export const addtoCart = (item) => {
  return {type: ActionTypes.ADD_TO_CART, payload: item };
};
export const alreadyInCart = (itemId) => {
  return { type: ActionTypes.ALREADY_IN_CART, payload: itemId };
};

export const removeFromCart = (itemId) => {
  return { type: ActionTypes.REMOVE_FROM_CART, payload: itemId };
};

export const increaseQuantity = (itemId) => {
  return { type: ActionTypes.INCREMENT_QUANTITY, payload: itemId };
};

export const decreaseQuantity = (itemId) => {
  return { type: ActionTypes.DECREMENT_QUANTITY, payload: itemId };
};


// export const addtoCart = (data, token) => {
//   return async (dispatch) => {
//     return POST("/cart/create", token, data)
//       .then((response) => {
//         // debugger
//         if (response.success === false) {
//           toast.error(response.message);
//         } else {
//           dispatch({
//             type: ActionTypes.ADD_TO_CART,
//             payload: response,
//           });

//           toast.success("Item added to cart");
//         }
//       })
//       .catch((error) => {
//         toast.error(error.message);
//         console.log(error.message);
//       });
//   };
// };

// export const alreadyInCart = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: ActionTypes.ALREADY_IN_CART, payload: id });
//     try {
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: ActionTypes.ERROR_CART, payload: error.response });
//     }
//   };
// };
// export const removeFromCart = (id, token) => {
//   return async (dispatch) => {
//     return DELETE("/cart/remove/" + id, token)
//       .then((response) => {
//         if (response.success === false) {
//           toast.error(response.message);
//         } else {
//           // debugger
//           dispatch({
//             type: ActionTypes.REMOVE_FROM_CART,
//             payload: response,
//           });
//           toast.success("Item Removed From cart");
//         }
//       })
//       .catch((error) => {
//         toast.error(error.message);
//         console.log(error.message);
//       });
//   };
// };

export const changeCartItemQuantity = (item_id, itemQuantity) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.CHANGE_CART_ITEM_QUANTITY,
      payload: { item_id, itemQuantity },
    });
  };
};
export const getCartTotalAction = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.GET_CART_TOTAL,
    });
  };
};
export const getDeliveryCharges = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.DELIVERY_CHARGES,
    });
  };
};
export const getCartItemsTotal = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.CART_ITEMS_TOTAL,
    });
  };
};

export const getAllCartItems = (token) => {
  return async (dispatch) => {
    if (localStorage.getItem("userData")) {
      return GET("/cart/get", token, "")
        .then((response) => {
          if (response.success === false) {
            toast.error(response.message);
          } else {
            dispatch({
              type: ActionTypes.GET_CART,
              payload: response,
            });
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error.message);
        });
    } else {
      dispatch({
        type: ActionTypes.GET_CART,
        payload: { products: [] },
      });
    }
    return;
  };
};

export const emptyCart = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.EMPTY_CART,
      payload: { message: "Cart is Empty!" },
    });
  };
};

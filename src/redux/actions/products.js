import { GET } from "../../apis/requests";
// POST
import ActionTypes from "../constant";
import { toast } from "react-toastify";

// const GET_All_PRODUCTS = (condition, token) => {
//   return (dispatch) => {
//     if (condition) {
//       return POST("/products/get", token, condition)
//         .then((response) => {
//           if (response.success === false) {
//             toast.error(response.message);
//           } else {
//             dispatch({
//               type: ActionTypes.GET_PRODUCTS,
//               payload: response,
//             });
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)
//         });
//     } else {
//       return POST("/products/get", token, {})
//         .then((response) => {
//           if (response.success === false) {
//             toast.error(response.message);
//           } else {
//             dispatch({
//               type: ActionTypes.GET_PRODUCTS,
//               payload: response,
//             });
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)
//         });
//     }
//   };
// };

const GET_FEATURED_PRODUCTS = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/products/featured", null, "",);
      console.log("GET_FEATURED_PRODUCTS RESPONSE", response);
      if (response.success === "fail") {
        toast.error(response.message);
      }
      dispatch({
        type: ActionTypes.GET_FEATURED_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.log("GET_FEATURED_PRODUCTS error", error.message);
    }
  };
};

// const GET_SEARCH_PRODUCTS_ACTION = (condition, token) => {
//   return (dispatch) => {
//     if (condition) {
//       return POST("/products/get-products-search", token, condition)
//         .then((response) => {
//           // debugger
//           if (response.success === false) {
//             toast.error(response.message);
//           } else {
//             dispatch({
//               type: ActionTypes.GET_PRODUCTS_SEARCH,
//               payload: response,
//             });
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)
//         });
//     } else {
//       return POST("/products/get", token, {})
//         .then((response) => {
//           if (response.success === false) {
//             toast.error(response.message);
//           } else {
//             dispatch({
//               type: ActionTypes.GET_PRODUCTS,
//               payload: response,
//             });
//           }
//         })
//         .catch((error) => {
//           toast.error(error.message)
//         });
//     }
//   };
// };
// const GET_PRODUCT_INFO = (productId, token) => {
//   return (dispatch) => {
//     return GET("/products/get-product/", token, productId)
//       .then((response) => {
//         if (response.success === false) {
//           toast.error(response.message);
//         } else {
//           console.log("resp", response);
//           dispatch({
//             type: ActionTypes.GET_PRODUCT,
//             payload: response,
//           });
//         }
//       })
//       .catch((error) => {
//         toast.error(error.message)
//       });
//   };
// };

export { GET_FEATURED_PRODUCTS };

// GET_All_PRODUCTS, GET_PRODUCT_INFO, GET_SEARCH_PRODUCTS_ACTION

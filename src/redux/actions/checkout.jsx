import ActionTypes from "../constant";
import {GET, POST} from "../../apis/requests";
import { toast } from "react-toastify";


const ADD_CHECKOUT = (values) => {
    return async (dispatch) => {
        try {
            const response = await POST("/product-orders/create-order", null, values, ""
            );
            toast.success("Order Successfull");
            dispatch({
                type: ActionTypes.ADD_CHECKOUT,
                payload: response?.data
            })
        } catch (error) {
            toast?.error( error?.response?.data?.message);
        }
    }
};


const GET_USER_CHECKOUT_DATA = () => {
    return async (dispatch) => {
        try {
            const response = await GET("/product-orders/my/orders"); // Await the GET request here
            dispatch({
                type: ActionTypes.GET_USER_CHECKOUT_DATA,
                payload: response?.data
            });
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    }
}



export {ADD_CHECKOUT, GET_USER_CHECKOUT_DATA};
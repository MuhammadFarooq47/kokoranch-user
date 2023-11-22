import ActionTypes from "../constant";
import {GET, POST} from "../../apis/requests";
import { toast } from "react-toastify";
import axios from "axios";


const ADD_CHECKOUT = (values) => {
    return async (dispatch) => {
        try {
            const response = await POST("/product-orders/create-order", null, values, ""
            );
            console.log("Checkout Data Response", response?.data);
            toast.success("Order Successfull");
            dispatch({
                type: ActionTypes.ADD_CHECKOUT,
                payload: response?.data
            })
        } catch (error) {
            console.log("Checkout error", error?.response?.data?.message);
            toast?.error( error?.response?.data?.message);
        }
    }
};


const GET_USER_CHECKOUT_DATA = () => {
    return async (dispatch) => {
        try {
            const response = await GET("/product-orders/my/orders"); // Await the GET request here
            console.log("/product-orders/my", response?.data);
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
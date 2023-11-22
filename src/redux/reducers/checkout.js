import ActionTypes from "../constant";


const initial_state = {
    checkout : {}
}

const CheckoutReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CHECKOUT: {
            return{
                ...state,
                checkout: action?.payload
            }
        }
        case ActionTypes.GET_USER_CHECKOUT_DATA: {
            return{
                ...state,
                checkout: action?.payload
            }
        }
     default:
        return state;
    }
}


export default CheckoutReducer;
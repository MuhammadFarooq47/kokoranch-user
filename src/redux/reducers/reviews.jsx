import ActionTypes from '../constant/index'
const initial_state = {
  reviews: [],
}

const ReviewsReducers = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.RATE_PRODUCT:
      return {
        ...state,
        reviews: action?.payload,
      }
    case ActionTypes.RATE_SERVICE:
      return {
        ...state,
        reviews:  action?.payload,
      }
    case ActionTypes.RATE_TRADE:
      return {
        ...state,
        reviews:  action?.payload,
      }
      case ActionTypes?.GET_PRODUCT_REVIEWS:
        return{
          ...state,
          reviews: action?.payload
        }
    case ActionTypes.ERROR_RATE:
      return {
        ...state,
        errorReview: action.payload.response,
      }

    default:
      return state
  }
}


export default ReviewsReducers;

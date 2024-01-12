import ActionTypes from '../constant/index'

const initial_state = {
  wishlist: [],
}

const WishlistReducers = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      }
      case ActionTypes.ADD_TO_WISHLIST:
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload],
        }
      case ActionTypes.REMOVE_FROM_WISHLIST:
        const wishlist = state.wishlist.filter(
          (wishlistItem) => {
            return wishlistItem._id !== action.payload}
        );
        return {
          ...state,
          wishlist,
        };
      
    default:
      return state
  }
}

export default WishlistReducers;

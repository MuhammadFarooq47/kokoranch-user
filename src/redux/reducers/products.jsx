import ActionTypes from '../constant/index'

const initial_state = {
  featuredProducts: [],
}

const ProductsReducers = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        Allproducts: action.payload.products,
      }
    case ActionTypes.GET_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.payload,
      }
    case ActionTypes.GET_PRODUCTS_SEARCH:
      return {
        ...state,
        searchProducts: action.payload.products,
      }
    case ActionTypes.GET_PRODUCT:
      return {
        ...state,
        product: action.payload.products,
      }
    case ActionTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product,
        ),
      }
    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id,
        ),
      }
    default:
      return state
  }
}

export default ProductsReducers

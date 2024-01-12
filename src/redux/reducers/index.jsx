import { combineReducers } from 'redux'

// REDUCERS
import authReducer from './auth'
import CartReducers from './cart'
import UsersReducers from './users'
import CategoriesReducers from './categories'
import ProductsReducers from './products'
import ServicesReducers from './services'
import TradesReducers from './trades'
import ReviewsReducers from './reviews'
import WishlistReducers from './wishlist'
import CheckoutReducer from './checkout'

// const cartData = localStorage.getItem('cartData')

// if (cartData == null) {
//   localStorage.setItem('cartData', [])
//   window.location.reload(false)
//   setTimeout(() => {
//     window.location.reload(false)
//   }, 500)
// } else {
//   // debugger
// }
const rootReducers = combineReducers({
  authReducer,
  CartReducers,
  UsersReducers,
  CategoriesReducers,
  ProductsReducers,
  ServicesReducers,
  TradesReducers,
  WishlistReducers,
  ReviewsReducers,
  CheckoutReducer
})

export default rootReducers

import ActionTypes from "../constant/index";

// const initState = {
//   loading: false,
//   cartData: [],
//   cartErrors: [],
//   token: "",
//   user: "",
// };

// const deliveryCharges = (deliveryRates, cartData) => {
//   let dCharges = 0;

//   cartData.map((item) => {
//     if (item.product) {
//       dCharges += deliveryRates * parseFloat(item.qty);
//     } else {
//       dCharges += deliveryRates * cartData.length;
//     }
//   });
//   return dCharges;
// };
// const getCartTotal = (cartData) => {
//   let total = 0;
//   const deliveryCharge = deliveryCharges(3, cartData);
//   if (cartData.length != "") {
//     cartData.map((item) => {
//       if (item.product) {
//         total += parseFloat(item.product.price) * parseFloat(item.qty);
//       } else {
//         total += parseFloat(item.service.cost);
//       }
//     });
//     total = total + deliveryCharge;
//   } else {
//     total = 0;
//   }
//   return total;
// };
// const getCartItemsTotal = (cartData) => {
//   let total = 0;

//   if (cartData.length != "") {
//     cartData.map((item) => {
//       if (item.product) {
//         total += parseFloat(item.product.price) * parseFloat(item.qty);
//       }
//       // setCartTotal(total.toFixed(2))
//       else {
//         total += parseFloat(item.service.cost);
//       }
//     });
//   } else {
//     total += 0;
//   }
//   return total;
// };

// const CartReducers = (state = initState, action) => {
//   switch (action.type) {
//     case ActionTypes.ADD_TO_CART:
//       return {
//         ...state,
//         cartData: [...state.cartData, action.payload.data],
//       };

//     case ActionTypes.ALREADY_IN_CART:
//       const isExistCart = state.cartData.some(
//         (obj) => obj._id === action.payload
//       );

//       return { ...state, alreadyPresentCart: isExistCart };

//     case ActionTypes.REMOVE_FROM_CART:
//       return {
//         ...state,
//         removeCartItem: action.payload,
//       };

//     case ActionTypes.GET_CART:
//       return {
//         ...state,
//         cartData: action.payload.products,
//       };

//     case ActionTypes.CHANGE_CART_ITEM_QUANTITY:
//       const newCart1 = state.cartData.map((obj) => {
//         if (obj._id === action.payload.item_id) {
//           return { ...obj, qty: action.payload.itemQuantity };
//         }

//         return obj;
//       });

//       return { ...state, cartData: newCart1 };

//     case ActionTypes.GET_CART_TOTAL:
//       const get_cart_total = getCartTotal(state.cartData);
//       return { ...state, cartTotal: get_cart_total };
//     case ActionTypes.DELIVERY_CHARGES:
//       const delvCharge = deliveryCharges(3, state.cartData);

//       return {
//         ...state,
//         deliveryTotalCharges: delvCharge,
//       };
//     case ActionTypes.CART_ITEMS_TOTAL:
//       const get_item_total = getCartItemsTotal(state.cartData);
//       return {
//         ...state,
//         cartItemsTotal: get_item_total,
//       };
//     case ActionTypes.EMPTY_CART:
//       return { ...state, emptyCart: action.payload };

//     case ActionTypes.ERROR_CART:
//       return { ...state, errors: action.payload };

//     default:
//       return state;
//   }
// };

// export default CartReducers;

// Cart reducer
const initialState = {
  cartItems: [],
}

 const CartReducers = (state = initialState, action) => {
  switch (action.type) {
    // Add in cart
    case ActionTypes.ADD_TO_CART: {
      const cartItem = action.payload;
      const cartItems = [...state.cartItems, cartItem];
      return {
        ...state,
        cartItems,
      };
    }
    // Check if already add in cart
    case ActionTypes.ALREADY_IN_CART: {
      const isExistCart = state.cartItems.some(
        (cartItem) => cartItem._id === action.payload
      );
      return { ...state, alreadyPresentCart: isExistCart };
     }
     
      
// Delete from cart
    case ActionTypes.REMOVE_FROM_CART: {
      const productId = action.payload;
      const cartItems = state.cartItems.filter(
        (cartItem) => {
          return cartItem._id !== productId}
      );
      return {
        // ...state,
        cartItems,
      };
    }
    case ActionTypes.INCREMENT_QUANTITY: {
      const productId = action.payload;
      const cartItems = state.cartItems.map((cartItem) => {
        if (cartItem._id === productId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      return {
        // ...state,
        cartItems,
      };
    }
    case ActionTypes.DECREMENT_QUANTITY: {
      const productId = action.payload;
      const cartItems = state.cartItems.map((cartItem) => {
        if (cartItem._id === productId) {
          if (cartItem.quantity > 1) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        }
        return cartItem;
      });
      return {
        // ...state,
        cartItems,
      };
    }
    default:
      return state;
  }
};

export default CartReducers;
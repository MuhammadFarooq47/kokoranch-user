import ActionTypes from "../constant/index";

const initial_state = {
  isAuthenticated: false,
  user: {},
  token: "",
  userType: "",
  userUpdated: false,
};


const AuthReducer = (state = initial_state, action) => {
  
  switch (action.type) {
   case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.user.role,
      };

      case ActionTypes.CHECK_TOKEN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
          userType: action.payload.data.role,
        };

  //       case ActionTypes.UPDATE_AUTH:
  // return {
  //   ...state,
  //   user: action.payload,
  // };


    case ActionTypes.UPDATE_AUTH:
      // localStorage.setItem('userData', JSON.stringify(action.payload.user))
  
      return {
        ...state,
        isAuthenticated: true,
          user: action.payload,
          token: action.payload.token,
          userType: action.payload.user.role,
          userUpdated: true,
      };

      case ActionTypes.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: "",
          // logoutError: null, // Clear any previous logout errors
        };
  

    case ActionTypes.REGISTER:
      // Update the state with the necessary information from the action payload
      return {
        ...state,
        isAuthenticated: false, // You may need to change this based on your logic
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.user.type,
      };

    case ActionTypes.VENDOR_TRADER_REGISTER:
      // Update the state with the necessary information from the action payload
      return {
        ...state,
        isAuthenticated: false, // You may need to change this based on your logic
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.user.type,
      };

    case ActionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        isAuthenticated: false,
        // user: action.payload.user,
        // token: action.payload.token,
        // userType: action.payload.user.type,
      };
    case ActionTypes.OTP_VERIFY:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        // userType: action.payload.user.type,
      };
    case ActionTypes.CREATE_NEW_PASSWORD:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.user.type,
      };

    default:
      return state;
  }
};

export default AuthReducer;

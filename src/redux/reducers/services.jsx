import ActionTypes from '../constant/index'

const initial_state = {
  services: [],
 agricultural: []
}

const ServicesReducers = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.GET_AGRICULTURAL_SERVICES:
      return {
        ...state,
        agricultural: action.payload,
      }
    case ActionTypes.GET_SERVICES:
      return {
        ...state,
        services: action.payload.services,
      }
    case ActionTypes.GET_SERVICE:
      return {
        ...state,
        service: action.payload.service,
      }
    case ActionTypes.ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
      }
    case ActionTypes.UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service,
        ),
      }
    case ActionTypes.DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== action.payload._id,
        ),
      }
    default:
      return state
  }
}

export default ServicesReducers;

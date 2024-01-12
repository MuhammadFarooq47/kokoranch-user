import ActionTypes from '../constant/index'

const initial_state = {
  users: [],
}

const UsersReducers = (state = initial_state, action) => {
  switch (action.types) {
    case ActionTypes.CREATE:
      return { ...state, users: [...state.users, action.payload] }

    // case ActionTypes.UPDATE:
    //   return { ...state, updatedUser: action.payload }

    case ActionTypes.DELETE:
      return state.users.filter((user) => user._id !== action.payload._id)

    case ActionTypes.GET:
      return { ...state, users: action.payload }

    default:
      return state
  }
}

export default UsersReducers

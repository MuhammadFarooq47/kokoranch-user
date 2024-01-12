import ActionTypes from '../constant/index'

const initial_state = {
  trades: [],
}

const TradesReducers = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRADES:
      return {
        ...state,
        trades: action.payload.trades,
      }
    case ActionTypes.CREATE_TRADE:
      return {
        ...state,
        trades: action.payload,
      }
    case ActionTypes.CREATE_TRADE_REQUEST:
      return {
        ...state,
        createTradeRequest: action.payload,
      }
    case ActionTypes.DELETE_TRADE_REQUEST:
      return {
        ...state,
        deleteTradeRequest: action.payload,
      }
    case ActionTypes.GET_TRADER_TRADES:
      return {
        ...state,
        traderTrades: action.payload.trades,
      }
    case ActionTypes.EDIT_TRADE_INFO:
      return {
        ...state,
        editTradeInfo: action.payload,
      }
    case ActionTypes.EDIT_TRADE:
      return {
        ...state,
        editTrade: action.payload,
      }
    case ActionTypes.CREATE_TRADE_REQUEST_MESSAGE:
      return {
        ...state,
        createtradeRequestMessage: action.payload,
      }
    // case ActionTypes.GET_TRADER_TRADES:
    //   return {
    //     ...state,
    //     createtradeRequestMessage: action.payload,
    //   }
    // case ActionTypes.GET_TRADE:
    //   return {
    //     ...state,
    //     trade: action.payload.trade,
    //   }
    case ActionTypes.GET_USER_TRADE_REQUESTS:
      return {
        ...state,
        userTradeRequests: action.payload.userTrades,
      }
    case ActionTypes.GET_TRADER_TRADE_REQUESTS:
      return {
        ...state,
        traderTradeRequests: action.payload.traderTradesRequests,
      }
    case ActionTypes.ADD_TRADE:
      return {
        ...state,
        trades: [...state.trades, action.payload],
      }
    case ActionTypes.GET_SELLER_TRADES:
      return {
        ...state,
        sellerTrades: action.payload.trades,
      }
    case ActionTypes.UPDATE_TRADE:
      return {
        ...state,
        updateTrade: action.payload,
      }
    case ActionTypes.DELETE_TRADE:
      return {
        ...state,
        deleteTrade: action.payload,
      }
    default:
      return state
  }
}

export default TradesReducers

import { ADD_MESSAGE, DELETE_MESSAGE, FETCH_MESSAGES, SEND_SUCCESS_MSG } from "../actionTypes/ActionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
    
      return [...state, action.payload];
    case DELETE_MESSAGE:
      return state.map((message) => message._id === action.payload._id ? action.payload : message);
    case SEND_SUCCESS_MSG:
      
      return state.map((message) => message.status === "unSend" ? action.payload : message);
      default:
          return state;
  }  
};
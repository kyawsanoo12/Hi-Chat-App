import {  FETCH_CONVERSATIONS, FETCH_MESSAGE_IN_CONVER } from "../actionTypes/ActionTypes";

export default (state =[], action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            return action.payload.msg;
        case FETCH_MESSAGE_IN_CONVER:
            
            return state.map((m) => m.conversationId === action.payload.conversationId ? action.payload : m);
      
        default:
            return state;
    }
}
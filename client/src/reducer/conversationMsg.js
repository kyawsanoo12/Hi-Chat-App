import {  FETCH_CONVERSATIONS, FETCH_MESSAGE_IN_CONVER, SEND_SUCCESS_MSG } from "../actionTypes/ActionTypes";

export default (state =[], action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            return action.payload.msg;
        case FETCH_MESSAGE_IN_CONVER:
            return state.map((m) => m?.conversationId === action.payload.conversationId ? action.payload : m);
        case SEND_SUCCESS_MSG:
            return state.map((m) => m?.conversationId === action.payload.conversationId ? action.payload : m);
        default:
            return state;
    }
}
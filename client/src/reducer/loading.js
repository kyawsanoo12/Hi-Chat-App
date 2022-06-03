import { END_CHAT_LOADING, END_CONVERSATION_LOADING, START_CHAT_LOADING, START_CONVERSATION_LOADING } from "../actionTypes/ActionTypes";


export default (state = {conversation:true,chat:false}, action) => {
    switch (action.type) {
        case START_CONVERSATION_LOADING:
            return { ...state, conversation: true };
        case END_CONVERSATION_LOADING:
            return { ...state, conversation: false };
        case START_CHAT_LOADING:
            return { ...state, chat: true };
        case END_CHAT_LOADING:
            return { ...state, chat: false };
        default:
            return state;
    }
}
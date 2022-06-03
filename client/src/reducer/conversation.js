import { ADD_CONVERSATION_SUCCESS, CHECK_CONVERSATIONS,DELETE_CONVERSATION, FETCH_CONVERSATIONS,SEARCH_CONVERSATION,BLOCK_CONVERSATION, SEND_SUCCESS_MSG   } from "../actionTypes/ActionTypes";

export default (state =[], action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
          
            return action.payload.conversations;
        case BLOCK_CONVERSATION:
            return state.map((c) => c._id === action.payload._id ? action.payload : c);
        case ADD_CONVERSATION_SUCCESS:
           
            return [...state,action.payload];
        case DELETE_CONVERSATION:
            
            return state.filter((c) => c._id !== action.payload._id); 
        case SEND_SUCCESS_MSG:
            return state.map((m) => m._id === action.payload._id ? action.payload : m);

        default:
            return state;
    }
}
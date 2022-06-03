import { ERRORS } from "../actionTypes/ActionTypes";

const errors= (state = [], action) => {
    switch (action.type) {
        case ERRORS:
            
            return action.payload;
        default:
            return state;
           
    }
}

export default errors;
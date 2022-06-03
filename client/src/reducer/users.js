import { FETCH_ALL_USERS, FETCH_USER_FRIENDS } from "../actionTypes/ActionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload
        case FETCH_USER_FRIENDS:
            return action.payload
        default:
            return state;
    }
}
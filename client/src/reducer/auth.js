import {LOGIN, LOGOUT, REGISTER} from "../actionTypes/ActionTypes";

const auth = (state = [], action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
      case LOGIN:
        localStorage.setItem("chat_app_profile", JSON.stringify( action.payload));
        return action.payload;
      case LOGOUT:
        localStorage.clear();
        return state;
        default:
            return state;
  }
};

export default auth;
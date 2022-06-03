import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./error";
import conversations from "./conversation";
import users from "./users";
import messages from "./messages";
import loading from "./loading";
import conversationMsg from "./conversationMsg";

const rootReducer = combineReducers({
    auth,
    errors,
    conversations,
    users,
    messages,
    loading,
   conversationMsg
});

export default rootReducer;
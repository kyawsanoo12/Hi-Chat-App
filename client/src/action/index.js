
import { Navigate } from "react-router-dom";

import { ADD_CONVERSATION_SUCCESS, ADD_MESSAGE, BLOCK_CONVERSATION, CHECK_CONVERSATIONS, DELETE_CONVERSATION, DELETE_MESSAGE, END_CHAT_LOADING, END_CONVERSATION_LOADING, FETCH_All_MESSAGES, FETCH_ALL_USERS, FETCH_CONVERSATIONS, FETCH_MESSAGES, FETCH_MESSAGE_IN_CONVER, FETCH_USER_FRIENDS, REACT_MESSAGE_EMOJI, SEARCH_CONVERSATION, SEND_SUCCESS_MSG, START_CHAT_LOADING, START_CONVERSATION_LOADING,  } from "../actionTypes/ActionTypes";
import { addConversation, addMessages, blockConver, checkConver, deleteConversation, deleteMessage, fetchAllUsers, fetchMessages, getAllMessages, getConversation, getFriends, reactMessage } from "../api/Api";

export const fetchConversations = () => async (dispatch) => {
    try {
         dispatch({ type: START_CONVERSATION_LOADING });
        const { data: data } = await getConversation();
        
        dispatch({ type: FETCH_CONVERSATIONS, payload: data });
        dispatch({ type:END_CONVERSATION_LOADING});
    } catch (err) {
        console.log(err);
    }
};

export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await fetchAllUsers();
        dispatch({ type: FETCH_ALL_USERS, payload: data });
    } catch (err) {
        console.log(err);
    }
}



export const fetchFriends = () => async (dispatch) => {
    try {
        const { data } = await getFriends();
        dispatch({ type: FETCH_USER_FRIENDS, payload: data });
    } catch (err) {
        console.log(err);
    }
}


export const getMessages = (conversationId) => async (dispatch) => {
    try {
       
        const { data } = await fetchMessages(conversationId);
        dispatch({ type: FETCH_MESSAGES, payload: data });
     
    } catch (err) {
        console.log(err);
    }
}

export const newMessage = ({conversationId,  text,file,to,replyText ,status,image,replyImage,hasFinished,sender,video},socket,otherUser) => async (dispatch) => {
    try {
        dispatch({ type: ADD_MESSAGE, payload: { conversationId, text, file, to, replyText, status, image, replyImage, hasFinished, sender ,video} });
        
        const { data } = await addMessages({conversationId,text,file,to,replyText,replyImage});
        console.log(data)
        dispatch({ type: FETCH_MESSAGE_IN_CONVER, payload: data });

        socket.current.emit("sendMessage", {conversationId:data?.conversationId,messageId:data._id, senderId: data.sender, receiverId: otherUser?._id, text: data.text, file:{image: data.file.image,video:data.file.video},data});
        
    } catch (err) {
        console.log(err);
    }
}

export const successMsg =(data) => async(dispatch)=> {
    try {
        dispatch({ type: SEND_SUCCESS_MSG, payload: data });
    } catch (err) {
        console.log(err)
    }
}

export const newConversation = ({senderId,receiverId},socket,navigate) => async (dispatch) => {
    try {
        const { data } = await addConversation({ senderId, receiverId });
       
        dispatch({ type: ADD_CONVERSATION_SUCCESS, payload: data });
       navigate(`/conversation/${data._id}`)
  
    } catch (err) {
        console.log(err);
    }
}

//check conversation
export const checkCon = ({receiver})=> async(dispatch) => {
    try {
        const { data } = await checkConver({ receiver });
        dispatch({ type: CHECK_CONVERSATIONS, payload: data });
    } catch (err) {
        console.log(err);
    }
}

//delete conversation
export const removeConversation = (conversationId) => async (dispatch) => {
    try {
       
        const { data } = await deleteConversation(conversationId);
        dispatch({type:FETCH_MESSAGE_IN_CONVER,payload:data})
        dispatch({ type: DELETE_CONVERSATION, payload: data });
       
    } catch (err) {
        console.log(err);
    }
}

//delete message
export const removeMessage = (messageId,socket,receiverId) => async (dispatch) => {
    try {
        const { data } = await deleteMessage(messageId);
        socket.current.emit("deleteMsg", {data,receiverId});
        dispatch({ type: DELETE_MESSAGE, payload: data });
        socket.current.emit("removeMessage", data);
    } catch (err) {
        console.log(err);
    }
}

//add Emoji in Message
export const addEmojiInMessage = ({ messageId, emoji }, socket) => async (dispatch) => {
    try {
        const { data } = await reactMessage({ messageId, emoji });
        dispatch({ type: REACT_MESSAGE_EMOJI, payload: data });
        socket.current.emit("setEmoji", data);
    } catch (err) {
        console.log(err.response);
    }
};

//block conversation
export const BlockConversation = (conversationId) => async (dispatch) => {
    try {
        const { data } = await blockConver(conversationId);
        dispatch({ type: BLOCK_CONVERSATION, payload: data });
    } catch (err) {
        console.log(err);
    }
}

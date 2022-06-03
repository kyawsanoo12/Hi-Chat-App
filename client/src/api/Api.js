import axios from "axios";

export const API_HOST = "http://localhost:5000";
const api = axios.create({ baseURL: `${API_HOST}/api` });


api.interceptors.request.use((req) => {
    if (localStorage.getItem("chat_app_profile")) {
       req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("chat_app_profile")).token}`
   }

    return req;
})

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
export const getConversation = () => api.get("/conversations" );
export const fetchAllUsers = () => api.get("/users");
export const fetchMessages = (conversationId) => api.get(`/messages/${conversationId}`);
export const addMessages = (data) => api.post("/messages", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
export const getFriends = () => api.get("/users/getfriends");
export const addConversation = (data) => api.post("/conversations", data);
export const deleteConversation = (conversationId) => api.delete(`/conversations/${conversationId}`);
export const deleteMessage = (messageId) => api.delete(`/messages/${messageId}`);
export const checkConver = (data) => api.post("/conversations/check", data);
export const reactMessage = ({ messageId, emoji }) => api.patch("/messages", { messageId, emoji });
export const blockConver = (conversationId) => api.post("/conversations/" + conversationId);
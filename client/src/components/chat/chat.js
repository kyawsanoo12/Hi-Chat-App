import React, { useState,useEffect,useRef } from 'react';
import useStyles from "./style";
import CreateIcon from '@material-ui/icons/Create';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import {  Container, Grid, Snackbar } from '@material-ui/core';
import {  IconButton, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import ChatBox from './chatBox/chatBox';
import ChatBar from './TobBar/ChatBar';
import { useDispatch, useSelector } from "react-redux";

import { fetchAllMessages, fetchConversations, fetchFriends, fetchUsers, getMessages } from '../../action';

import Welcome from './home/welcome';
import ConversationSide from './conversationSide/conversationSide';
import CreateConversationSide from './createConversation/createConversation';
import { io } from "socket.io-client";
import { useNavigate, useParams } from 'react-router-dom';
import ConversationDetailSide from './detailsSide.js';
import { API_HOST } from '../../api/Api';
import { Howl } from "howler";
import MessageAlert from "../../alert/Messenger - Notification Tone.mp3";


function Chat() {
     const socket = useRef();
    const classes = useStyles();
     const dispatch = useDispatch();
    const conversationsState = useSelector((state) => state.conversations);
    const users = useSelector((state) => state.users);
    const [createConSide, setCreateConSide] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const userId = JSON.parse(localStorage.getItem("chat_app_profile")).result._id;
    const { conversationId } = useParams();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const otherUsers = useSelector((state) => state.users);
    const conversation = conversations?.find(c => c._id === currentId);
    const [onlineUser, setOnlineUser] = useState(null);
const [arriveMessage, setArriveMessage] = useState(null);
    const [details, setDetails] = useState(false);

    const user_id = conversation?.members.find((user) => user !== userId);
 const sound=new Howl({src:[MessageAlert],html5:true,autoplay:false})
    const otherUser = users?.find((u) => u._id === user_id);
   

    useEffect(() => {
        dispatch(fetchConversations(userId));
        dispatch(fetchUsers());
    }, [userId]);
   
    useEffect(() => {
        socket.current = io("ws://localhost:5000");
         socket.current?.on("getMessages", (data) => {
             setArriveMessage(data);
            
    })
        setConversations(conversationsState)
          socket.current.on("messageAlert",  ({ data }) => {
                data.conversationId !== conversationId  && sound.play();
            
        });
      
    }, []);

    useEffect(() => {
        //dispatch(fetchConversations());
        setConversations(conversationsState);
        
    }, [arriveMessage]);
    
    useEffect(() => {
        
            setConversations(conversationsState)
  },[conversationsState])

    useEffect(() => {
        
        setCurrentId(conversationId);
       
   },[conversationId])

    useEffect(() => {
        if (currentId) {
            
            dispatch(getMessages(currentId));
          
            navigate("/conversation/" + currentId);
           
            
        }
    },[currentId])

    const handleChangeSide = () => {
       
        setCreateConSide(prev => !prev);
        console.log(createConSide)
        if (!createConSide) {
             
            dispatch(fetchFriends());
        } else {
            dispatch(fetchUsers());
        }
    }

    return (
        <Paper className={classes.root} >
       
            <Grid container >
                <Grid item xs={12} md={3} className={currentId ? classes.conversationGridNone : classes.conversationGrid} >
                <ChatBar/>
                    <Paper elevation={6} className={classes.paper} >
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <Typography variant="h5" style={{ marginBottom: "10px" }} color="textSecondary">{createConSide ? "Create Chats" : "Chats" }</Typography>  
                            {createConSide ?
                                < IconButton onClick={handleChangeSide}>
                                    <ArrowLeftIcon/>
                            </IconButton>  :
                                <IconButton onClick={handleChangeSide}>
                                    <CreateIcon />
                                </IconButton>
                            }
                            </div>
          <TextField variant="outlined" fullWidth size="small" color="primary" placeholder='Search' InputProps={{
              endAdornment: (
                  < InputAdornment position="end">
                      <SearchOutlinedIcon />
                  </InputAdornment>
              )
                        }} />
                       
                        {createConSide ?
                            <CreateConversationSide users={users} otherUsers={otherUsers} classes={classes} ownUserId={userId} setCreateConSide={setCreateConSide} conversations={conversations} socket={socket } />
                        :
                            
                            <ConversationSide users={otherUsers} conversations={conversations} userId={userId} setCurrentId={setCurrentId} onlineUser={onlineUser} socket={socket} currentId={ currentId} />
}
    </Paper>
                </Grid>
                <Grid item xs={12} md={details ? 6:9} className={ !currentId || details ? classes.chatBoxGridNone: ""}>
                    { currentId ?
                        <ChatBox conversation={conversation} userId={userId} users={users} conversationId={currentId} setCurrentId={setCurrentId} setOnlineUser={setOnlineUser} onlineUser={onlineUser} socket={socket} setDetails={setDetails} details={details} otherUser={otherUser} user_id={user_id } />
                        :
                    <Welcome/>
                    }
                </Grid>
                {details &&
                    <Grid item xs={12} md={3} className={!details ? classes.chatBoxGridNone:""}>
                        <ConversationDetailSide friendProfile={otherUser} conversationId={conversationId} setDetails={setDetails }/>
                 </Grid>
                }
                </Grid>   
               
         </Paper>
  )
}

export default Chat
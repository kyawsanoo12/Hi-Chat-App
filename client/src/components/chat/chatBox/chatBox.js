import { Avatar, IconButton, Paper,  Typography,CircularProgress, Snackbar } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react';
import useStyles from "../style";
import CallIcon from '@material-ui/icons/Call';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextBox from '../textBox/TextBox';
import {  useDispatch, useSelector } from 'react-redux';
import { API_HOST } from '../../../api/Api';
import Message from './message';
import { Howl } from "howler";
import { getMessages } from '../../../action';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import noMessagePng from "../../../logo/message.png";
import { ADD_MESSAGE } from '../../../actionTypes/ActionTypes';
import Replybox from '../textBox/replyBox';

function ChatBox({ conversation, userId, users, conversationId,setOnlineUser ,onlineUser,socket,setDetails,details,otherUser,user_id}) {
    const classes = useStyles();
 
    const navigate = useNavigate();
    
    const messages = useSelector((state) => state.messages);
    //const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef(null);
    const [reply, setReply] = useState(null);
    const online = onlineUser?.filter((u) => u.userId === user_id);
    const loading= useSelector((state) => state.loading);
    const sound = new Howl({ src: `${API_HOST}/audio/alert/Messenger - Notification Tone.mp3` })
    const [typing, setTyping] = useState(null);
     const replyReceiver = users.filter((u) => u._id === reply?.sender)[0];
    const dispatch = useDispatch();
    const conversationRef = useRef(null);
    const [removeMsg, setRemoveMsg] = useState(null);
    const [existEmoji, setExistEmoji] = useState(null);

   
   
    useEffect(() => {
       
        socket.current.on("getMessages", data => {
         
            setArrivalMessage({ conversationId:data.conversationId,sender: data.senderId, text: data.text, createdAt: Date.now(), file:data.file, status: data.status });
           
        });
        socket.current.on("getEmoji", data => {
            setExistEmoji(data);
       })
        socket.current.on("typingMessageGet", (data) => {

            setTyping(data);
          
        })
        socket.current.on("messageAlert", ({ senderId, receiverId }) => {
           
            receiverId === userId ? sound.play() : sound.stop();
        });
        socket.current.on("getRemoveMessage", data => {
            setRemoveMsg(data);
        })

    }, [])
    
    useEffect(() => {
        dispatch(getMessages(conversationId))
    },[removeMsg])
   
    useEffect(() => {
      dispatch(getMessages(conversationId))
  },[existEmoji])
   
    useEffect(() => {
        dispatch(getMessages(conversationId));
        arrivalMessage && conversation.members.includes(arrivalMessage.sender) &&
            dispatch({ type: ADD_MESSAGE, arrivalMessage });
           // setMessages(prev => [...prev, arrivalMessage]);
         
    }, [arrivalMessage]);
    
    useEffect(() => {
        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", data => {
            setOnlineUser(data);
        });
       
    }, [userId])
    
  
   
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);
   
    return (
        <>
            <Paper elevation={1} className={classes.chatBoxPaper}>
                <div className={classes.chatUserBar}>
                    <div className={classes.chatBarUserProfile}>
                        <IconButton className={classes.chatArrowBackIcon} onClick={()=>navigate("/")}>
                             <ArrowBackIcon/>
                        </IconButton>
                        <div className={classes.avatarContainer}>
                            <Avatar src={`${API_HOST}/images/user/${otherUser?.image}`} />
                            {online?.length > 0 &&
                            <span className={classes.active}></span>
                            }
                        </div>
                        <div className={classes.profileNameAndActiveText}>
                            <Typography variant="body1" className={classes.chatBarProfileName}>{otherUser?.name}</Typography>
                            {online?.length > 0 &&
                                <span  className={classes.activeText}> Active</span>
                            }
                        </div>
                    </div>
                    
                    <div className={classes.chatBarUserAction}>
                        <IconButton style={{ color: "#3498DB" }} >
                            <CallIcon className={classes.callIcon}/>
                        </IconButton>
                        <IconButton style={{ color: "#3498DB" }}>
                            <VideoCallIcon  className={classes.videoIcon}/>
                        </IconButton>
                        <IconButton style={{ color: "#3498DB" }} onClick={() => setDetails(prev => !prev)} color={"primary"}>
                            {details ? <MoreHorizIcon className={classes.morehorizIcon} color="secondary"/>  :
                            <MoreHorizIcon className={classes.morehorizIcon} />
                        }
                        </IconButton>
                    </div>
                </div>
                  
                {loading.chat === true ?
                    (<div className={classes.chatBoxLoading}>
                        <CircularProgress />
                    </div>)
                    :
                   
                        messages.length > 0 ?
                            (
                            <div className={classes.convarsition} ref={conversationRef} style={{overflowY:"auto",scrollBehavior:"smooth"}} onScroll={(e) => {
                                if (conversationRef?.current?.scrollTop === 0) {
                                    console.log("It's work")
                                }
                                }}>
                              
                                    {
                                    messages.map((message,index) => {
                                           
                                            return (
                                                
                                                <div key={message?._id}>
                                                    {message?.conversationId === conversationId &&
                                                        <div >
                                                    
                                                            {message?.sender !== userId ?
                                                                <Message message={message} otherUser={otherUser} socket={socket} setReply={setReply} typing={typing} index={index} messages={messages} users={users } />
                                                                :
                                                                <Message message={message} own socket={socket} setReply={setReply} typing={typing} index={index} messages={messages} users={users} />
                                                            }
                                                        </div>
                                                    }
                                                    </div>
                                            )
                                        })
                                    }
                         
                                <div ref={scrollRef} />
                                <Replybox reply={reply} replyReceiver={replyReceiver} userId={userId} setReply={setReply }/>
                            </div>
                            
                            
                        )
                        : (
                            <div className={classes.noMessageContainer}>
                                <img src={`${API_HOST}/images/user/${otherUser?.image}`} className={classes.noMessageAvatar} />
                                <Typography variant="h5">{otherUser?.name}</Typography>
                                  <Typography variant="h6" color="textSecondary">{ otherUser?.address }</Typography>
                              <Typography variant="body1" color="textSecondary">No Message yet.</Typography>  
                            </div>
                        )
                }
                  {typing?.senderId !== userId && typing?.msg.length > 0 &&typing?.conversationId === conversationId &&  
                                    <div className={classes.typingContainer}>
                                        <Typography variant="body2" color="textSecondary">{otherUser?.name} is typing.......</Typography>
                                    </div>}
            </Paper>
            <TextBox conversationId={conversation?._id} userId={userId} socket={socket} otherUser={otherUser} messages={messages} reply={reply} setReply={setReply} details={details} conversation={conversation} allDisabled={conversation?.status === "block" ? true:false }/>
           
        </>
                
  )
}

export default ChatBox
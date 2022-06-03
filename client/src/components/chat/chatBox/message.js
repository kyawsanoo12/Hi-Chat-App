import React, { useEffect, useState } from 'react';
import useStyles from "../style";
import { Avatar,  CircularProgress,  Tooltip,  Typography } from '@material-ui/core'
import { API_HOST } from '../../../api/Api';
import moment from "moment";
import DetailButton from './detailButton';
import Reply from '@material-ui/icons/Reply';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import EmojiButton from './actionButtons/emojiButton';
import { useDispatch } from 'react-redux';
import { successMsg } from '../../../action';

function Message({ message,own ,otherUser,socket,setReply,index,messages,users}) {
    const classes = useStyles();
    
    const [show, setShow] = useState(false);
    const [defaultShow, setDefaultShow] = useState(false);
    const reactName = users?.filter((u) => u._id === message?.react?.responseId)[0];
    const dispatch = useDispatch();
    const [sendSuccess, setSendSuccess] = useState("");
    //const [unSuccessImg, setUnSuccessImg] = useState(true);
    useEffect(() => {
        socket.current.on("sendMessageSuccess", ({data}) => {
           ;
            dispatch(successMsg(data));
            
        })
    },[])
 
    return ( 
        <>
        <div className={!own ? classes.chatMessage : classes.senderMessage} key={message?._id} onMouseEnter={() => setShow(true)} onMouseLeave={() => { !defaultShow && setShow(false) }}>
                
                  {!own &&
              <Avatar src={otherUser?.image ? `${API_HOST}/images/user/${otherUser?.image}` : null} className={ classes.messageAvatar} />
            }
            <div  className={classes.messageSenderContainer } >
                    {message?.reply && message.status === "active" &&
                      
                                <div>
                                    <div style={own ? { display: "flex", justifyContent: "flex-end" } : { display: "flex", justifyContent: "flex-start", marginLeft: "10px" }}>
                                        {message?.sender !== otherUser?._id ?
                                            <Typography variant="body2" color="textSecondary"><Reply style={{ fontSize: "15px" }} /> You  replied to {otherUser?.name}</Typography>
                                            :
                                            <Typography variant="body2" color="textSecondary"><Reply style={{ fontSize: "15px" }} /> {otherUser?.name}  replied to you </Typography>
                                        }
                                    </div>
                                 
                                <div className={message?.sender !== otherUser?._id ? classes.senderReply : classes.receiverReply}>
                                {!message.reply.image ?
                                    <div className={classes.replyTextContainer}>
                                        <p style={{ fontSize: "13px", fontFamily: "Arial", color: "grey" }}>{message?.reply?.text}</p>
                                    </div>
                                    :
                                    <div className={classes.replyImgContianer}>
                                        <a href={`${API_HOST}/images/messages/${message.reply.image}`}>
                                            <img className={classes.replyImg} src={`${API_HOST}/images/messages/${message.reply.image}`} />
                                            </a>
                                    </div>
}
                                </div>
                             
                                </div>
                              
                      
                            }
                <div style={!own ? {
                    display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "10px"
                } : {
                        display: "flex", flexDirection: "column", alignItems: "flex-end", marginBottom: "10px" 
                    }}>
              <div className={own ? classes.msgIconHoverShow: classes.msgIconHoverReverseShow}>
                      { show && message?.status === "active"  && 
              <div className={own ? classes.messageDetailButton: classes.msgDetailReceiveButton} onClick={()=>setDefaultShow(true)} onMouseLeave={()=>setDefaultShow(false)} style={{position:"relative"}}>
                                    <DetailButton message={message} socket={socket} receiverId={otherUser?._id} own={own} setReply={setReply} setDefaultShow={setDefaultShow }/>
              </div>}
                    {message?.text &&
                                <div> 
                               
                        <div className={ message.status === "active" || message.status === "unSend"? !own  ? classes.receive : classes.sender : classes.removeMsgSender}   >
                                        <p className={classes.text} >{message?.text}</p>
                                        {
                                            message.status === "active" && message?.react?.responseId &&
                                            <Tooltip placement={!own ? "right" : "left"} title={reactName?.name}>
                                           <div className={!own ? classes.receiverSideEmoji:classes.senderSideEmoji} style={{cursor:"pointer"}}>
                       {message.react.emoji} 
                 
                                                    </div>
                                                    </Tooltip>
                 }
                                        </div>
                                       
                       </div>
                            }
                           
                            {message?.status === "unSend"&& message?.image?.length > 0 && 
                                  <div className={classes.sendImg}>
                                            <a href={null}>
                                         
                                        <img src={message?.image} className={classes.messageImg} style={{opacity:".5"}}/>
                                       
                                            </a>
                                        </div>
                            } 
                            {message.status === "unSend" && message?.video &&
                                <div className={classes.sendImg}>
                                            <a href={null}>
                                         
                                        <div style={{ display: "flex", flexDirection: "row", width: "250px", height: "150px", background: "grey", borderRadius: "10px",justifyContent:"center",alignItems:"center",opacity:".5" }}>
                                            <CircularProgress color="inherit"/>
                                       </div>
                                       
                                            </a>
                                        </div>
                            }
                                       
                                    {message?.file?.image && message.status == "active" &&
                                        <div className={classes.sendImg}>
                                            <a href={`${API_HOST}/images/messages/${message?.file?.image}`}>
                                         
                                                <img src={`${API_HOST}/images/messages/${message?.file?.image}`} className={classes.messageImg} />
                                       
                                            </a>{
                                                message.react.responseId &&
                                                <div className={!own ? classes.receiverSideEmoji : classes.senderSideEmoji}>
                                                    {message.react.emoji}
                                                </div>}
                                        </div>
                                    }
                                    {message?.file?.video && message?.status == "active" &&
                  
                  
                                        <div className={classes.sendImg}>
                                            <video src={`${API_HOST}/video/messages/${message?.file?.video}`} className={classes.messageImg} controls />
                                            {message.react.responseId &&
                                                <div className={!own ? classes.receiverSideEmoji : classes.senderSideEmoji}>
                                                    {message.react.emoji}
                                                </div>}
                                        </div>
                  
                                    }
                                    {own && messages.length - 1 === index &&
                                        <div style={{ marginTop: "30px" }}>
                                            {
                                                message?.status === "active" || message?.status === "removed" ?
                                                    <CheckCircleOutlineIcon style={{ fontSize: "13px", color: "grey" }} />
                                                    :
                                                    <RadioButtonUncheckedIcon style={{ fontSize: "13px", color: "grey" }} />
                                            }
                                        </div>
                                    }
                                </div>
                            
                </div>
                 
                </div>
         
            <span className={!own ? classes.chatMessageTime : classes.chatSenderMessageTime}>{moment(message?.createdAt).fromNow()}</span>

          </div> 
           
          
      
   </>
    
  )
}

export default Message
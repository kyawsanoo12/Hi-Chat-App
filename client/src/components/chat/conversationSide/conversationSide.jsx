import React, { useEffect,useState,useRef } from 'react';
import { Avatar, ButtonBase, CircularProgress, Typography,IconButton,Button,Popper,MenuList,MenuItem,Menu,Fade } from '@material-ui/core';
import useStyles from "../style";
import { API_HOST, fetchMessages } from '../../../api/Api';
import moment from 'moment';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { useDispatch, useSelector } from "react-redux";
import {  fetchConversations, removeConversation } from '../../../action';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function ConversationSide({ users,conversations,userId,setCurrentId,onlineUser ,socket,currentId}) {
  const classes = useStyles();
  const  msg  = useSelector((state) => state.conversationMsg);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //console.log(messages)
  const navigate = useNavigate();
  const [show, setShow] = useState("");
   

 
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

 

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (loading.conversation) {
    return (
      <div className={classes.conversationLoading}>
        <CircularProgress/>
       </div>
     )
  }

   
  return (
    <>      
         
      <div className={classes.scrollY}>
   
        {conversations?.map((conversation, index) => {
          
          const conUser = conversation.members.find((u) => u !== userId);
          const user = users?.filter((u) => u._id === conUser)[0];
          const online = onlineUser?.filter((u) => u.userId === user?._id);
         
          return (
            <div key={conversation?._id} className={currentId === conversation._id ? classes.conversationContainerColor: classes.conversationContainer }  onMouseEnter={()=>setShow(conversation._id)} onMouseLeave={()=>setShow(false)}>
              <ButtonBase className={classes.buttonBase} onClick={() => {
                
                setCurrentId(conversation._id)
              }} style={{ width: "300px" }}>
                <div className={classes.avatarContainer}>
                  <Avatar src={`${API_HOST}/images/user/${user?.image}`} />
                  {online?.length > 0 &&
                    <span className={classes.active}></span>
                  }
                </div>
                 
               
                <div className={classes.message}>
                  <div>
                  <Typography variant="h6" className={classes.converUserName}>{user?.name}</Typography>
                  </div>
                  <div >
                    {msg?.map((m) => {
                     
                      if (m && m.file?.image && m.conversationId === conversation._id) {
                        return (
                               <p key={m._id} style={{ color: "grey" }}>{m.sender === userId ? `You: Send Image` : "Receive Image"} </p> 
                             )
                      } else if (m && m.file?.video && m.conversationId === conversation._id) {
                        return (
                            <p key={m._id} style={{ color: "grey" }}>{m.sender === userId ? `You: Send Video` : "Receive Video"} </p>
                        )
                           }
                    return m && (
                       <>
                  {    m?.conversationId === conversation._id &&
                         <p key={m._id} style={{ color: "grey" }}>{m.sender === userId ? `You: ${m.text?.substr(0, 15)}` : m.text?.substr(0, 15)} ... </p> }  
                     </>  
                      )
                 })}
                 </div>
                </div>
              
              </ButtonBase>
              {msg.map((m) => {
                return  m && m.sender === userId && m.conversationId === conversation._id &&
                  <div className={classes.delivaredAndSeenInConver}>
                    { m.status === "active" ? !m.seen ?
                      <CheckCircleOutlineIcon style={{ fontSize: "15px", color: "grey" }} />
                      :
                      <Avatar src={`${API_HOST}/images/user/${user?.image}`}  className={classes.seenMsg } />
                      :
                      <RadioButtonUncheckedIcon style={{fontSize:"15px",color:"grey"}} />
                    }
                </div>
                  
                })}
                    <span className={classes.friendMessageTime}>{moment(conversation.createdAt).fromNow()}</span>
              {show === conversation._id &&
                <div className={classes.converMoreHorizIcon} >
                 <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
         <MoreHorizOutlinedIcon/>
                  </Button>
               
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
                    TransitionComponent={Fade}
                    style={{marginTop:"40px"}}
      >
                    <MenuItem onClick={() => {
                     
                     dispatch(removeConversation(conversation._id));
                     navigate("/");
                     
        }}>Delete</MenuItem>
       
      </Menu>
                </div>
              }
             
            </div>
          )
        })}
             
      </div>
     
    </>
  );
};

export default ConversationSide;
import { Avatar, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Typography } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import useStyles from "./style";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useDispatch, useSelector } from 'react-redux';
import { ddMessages, API_HOST,checkConver } from "../../../../api/Api";
import CloseIcon from '@material-ui/icons/Close';
import { newMessage } from "../../../../action/index";


const ForwardTo = ({ message,socket }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const users = useSelector((state) => state.users);
    const myId = JSON.parse(localStorage.getItem("chat_app_profile"))?.result?._id;
    const [userId,setUserId] = useState([]);
    const otherUsers = users.filter((u) => u._id !== myId);
    const dispatch = useDispatch();
 
    const handleSend = async (receiverId,otherUser) => {
         const { data } = await checkConver({ sender:myId, receiver: receiverId});
        
       dispatch(newMessage({conversationId:data[0]?._id,receiver:receiverId,text:message?.text},socket,otherUser));
       setUserId([...userId,otherUser._id]);
   }

  return (
      <>
          <MenuItem  onClick={()=>{setOpen(true)}} component={ButtonBase} >
              Forward
          </MenuItem>
          <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullWidth style={{ overflowY: "auto" }}>
              <div className={classes.titleContainer}>
                  <DialogTitle><Typography variant="h6">Send by Several Messages</Typography></DialogTitle>
                  <IconButton onClick={()=>setOpen(false)}>
                      <CloseIcon/>
                  </IconButton>
                  </div>
          <DialogTitle><Typography variant="body1">People</Typography></DialogTitle>
              <DialogContent>
                  
                  {otherUsers.map((u) => {
                      
                      return (
                  <div className={classes.userContainer} key={u._id}>
                      <div className={classes.user}>
                          <div className={classes.avatar}>
                                  <Avatar sizes='small' src={`${API_HOST}/images/user/${u.image}`}/>
                          </div>
                          <div className={classes.userName}>
                                  <Typography>{ u.name}</Typography>
                          </div>
                      </div>
                      <div>
                                  <DialogActions>
                                      {userId.includes(u._id) ?   <IconButton size='small' color="primary" disabled >
                                              <SendRoundedIcon />
                                      </IconButton>
                                      :
                                          <IconButton size='small' color="primary" onClick={() => handleSend(u?._id, u)} >
                                              <SendRoundedIcon />
                                          </IconButton>
                  }
                          </DialogActions>
                      </div>
                  </div>
                   )})}
                  </DialogContent>
                  
          </Dialog>
      </>
  )
}

export default ForwardTo;
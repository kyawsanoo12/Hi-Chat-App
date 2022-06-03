import React, { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AddIcon from '@material-ui/icons/Add';
import Picker from 'emoji-picker-react';
import CloseIcon from '@material-ui/icons/Close';
import Close from '@material-ui/icons/Close';
import useStyles from "../style";
import { Paper, Button, IconButton, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import {  fetchConversations, newMessage } from "../../../action/index";
import { API_HOST } from '../../../api/Api';

function TextBox({conversationId,userId,socket,otherUser,messages,reply,setReply,setMessages,details,allDisabled}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showEmoji, setShowEmoji] = useState(false);
    const users = useSelector((state) => state.users);
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [base64, setBase64] = useState("");
    const [disable,setDisable] = useState(true);
    const [videFile, setVideoFile] = useState(false);

    const handleImgInputChange = (e) => {  
        
         const file = e.target.files[0];
         if (file.type == "image/jpeg") {
             setFile(file);
             const reader = new FileReader();
             reader.onload = (e) => {
                 setBase64(e.target.result);
        
             }
             reader.readAsDataURL(file);
         } else if (file.type === "video/mp4") {
             setFile(file);
             setVideoFile(true)
             
         }
     }
    
    useEffect(() => {
        text?.length > 0? setDisable(false) : setDisable(true) 
    }, [text])
   
    useEffect(() => {
         base64?.length > 0? setDisable(false) : setDisable(true) 
    }, [base64])
    
     useEffect(() => {
         file !== "" ? setDisable(false) : setDisable(true) 
    },[file])
    
    const handleSendClick = async () => {
         setDisable(true)
        try {
             socket.current.emit("typingMessage", { senderId: userId, receiverId: otherUser?._id, msg: "" })
            
            dispatch(newMessage({ conversationId: conversationId,  text: text,file:file,to:reply?.sender,replyText:reply?.text ,status:"unSend",image:base64,replyImage:reply?.file.image,hasFinished:false,sender:userId,video:videFile}, socket, otherUser));
       
           
            setText("");
            setReply(null);
        setBase64("");
            setFile("");
        } catch (err) {
            console.log(err)
        }
       
        if (showEmoji) {
               setShowEmoji(false)
        }
     
    }
  
    const handleChange = (e) => {
       
        setText(e.target.value);    
        socket.current.emit("typingMessage", { senderId: userId, receiverId: otherUser?._id, msg: e.target.value,conversationId:conversationId })
        
    }
   
    const handleShowEmoji = () => {
        setShowEmoji(!showEmoji);
        
    }
                                                                        
    const handleEmojiClick = (e, emojiObject) => {
        setText((prev)=>prev+emojiObject.emoji)
        
    }

    const handleCancelImg = () => {
        setBase64("");
        setFile("");
    }
    return (
        <div className={classes.textBoxContainer}>
   
      <Paper className={classes.textBox} elevation={6} >
                    
      
                <div className={base64 !== "" ? details ? classes.imgContainer1 :  classes.imgContainer :  file !== "" ?  classes.imgContainer:classes.hide}>
                   
                    <IconButton className={classes.closeIcon} onClick={handleCancelImg} >
                         <CloseIcon />
              </IconButton>
              {base64 !== "" &&
                  <img className={classes.img} src={base64} />
              }
              {file.type == "video/mp4" && 
                  <p style={{marginLeft:"10px"}}>{file?.name }</p>
               }
              </div>
               
                <div className={showEmoji ? classes.showEmoji : classes.hide}>
                    <Picker  onEmojiClick={handleEmojiClick} pickerStyle={{height:"300px"}}/>
                    </div>
               <IconButton disabled className={classes.addIconButton}>
              <AddIcon className={ classes.addIcon }/>
                </IconButton>
                <div className={classes.upload}>
                 <input accept="image/*,video/mp4" className={classes.file} id="icon-button-file" type="file" onChange={handleImgInputChange}/>
      <label htmlFor="icon-button-file">
                  <IconButton aria-label="upload picture" component="span" className={classes.photoIconButton}>
                      {base64 !== "" ? (<PhotoLibraryIcon color="secondary" className={ classes.photoIcon}/>):(<PhotoLibraryIcon className={ classes.photoIcon}/>)}
          
        </IconButton>
      </label>
                    </div>
                <IconButton onClick={handleShowEmoji} className={classes.emojiIconButton} disabled={allDisabled}>
              {showEmoji ? (<EmojiEmotionsIcon color="secondary" className={classes.emojiIcon }/>) : (<EmojiEmotionsIcon className={classes.emojiIcon }/>)}
                  
              </IconButton>
               
              
          <TextField variant="outlined" placeholder='Message' fullWidth onChange={handleChange} onClick={() => setShowEmoji(false)} value={text} className={classes.textField} InputProps={{ className: classes.textField }} disabled={!allDisabled ? file ? true : false : true} minRows={1} multiline size='small' maxRows={3}/>
              <IconButton className={classes.sendIcon} onClick={handleSendClick} style={disable ? {color:"#D0D3D4"} :  {color:"#2E86C1"}} disabled={!allDisabled ? disable:true}>
              <SendIcon />
                  </IconButton>
                
            </Paper>
            </div>
  )
}

export default TextBox
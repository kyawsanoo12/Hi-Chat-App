import React from 'react'
import { Paper, Typography,IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "../style";
import { API_HOST } from "../../../api/Api";

function Replybox({ reply, replyReceiver, userId ,setReply}) {
    const classes = useStyles();
  return (
         <div>
                       { reply &&
          <div className={classes.replyContainer}>
              <div className={classes.replyName}>
                      <Typography variant="body2">Reply To {reply.sender === userId ? "yourself" : replyReceiver?.name}</Typography>
                      {reply.text &&
                          <div className={classes.replyText}>
                              <p style={{ fontSize: "14px", fontFamily: "Arial", }}><strong>{reply.text}</strong></p>
                          </div>
                      }
                      {reply.file?.image &&
                          <div className={classes.replyTextBoxImgContainer}>
                              <img src={`${API_HOST}/images/messages/${reply.file.image}`} className={classes.replyTextBoxImg }/>
                          </div>
                      }
              </div>
                  <div>
                      <IconButton onClick={()=>setReply(null)}>
                          <CloseIcon/>
                      </IconButton>  
             </div>
                      </div>}
    </div>
  )
}

export default Replybox;
import React,{useState} from 'react';
import { Avatar, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Slide, Typography } from "@material-ui/core";
import useStyles from "./style";
import { API_HOST } from '../../../api/Api';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'; 
import Media from './media';
import { useDispatch } from 'react-redux';
import { BlockConversation } from '../../../action';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ConversationDetailSide = ({ friendProfile,conversationId,setDetails }) => {
    const [blockButtonShow, setBlockButton] = useState(false);
    const [mediaFileOpen, setMediaFileOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
      <>
      <Paper className={classes.paperContainer} elevation={3}>
               
                <div style={mediaOpen ? { display: "none" } : null}>
                     <div className={classes.backIcon}>
                    <IconButton onClick={()=>setDetails(false)}>
                        <ArrowBackIcon/>
                    </IconButton>
        </div>
          <div className={classes.profile}>
              <div>
                  <Avatar src={`${API_HOST}/images/user/${friendProfile?.image}`} className={ classes.avatar }/>
              </div>
              <div style={{ marginTop: "10px",textAlign:"center" }}>
                  
                  <Typography variant='body1'>{friendProfile?.name}</Typography>
                
              </div>
          </div>
          <div>
              <List component="div">
             
                  <ListItem button onClick={()=>setMediaFileOpen(prev=>!prev)}>
                        <ListItemText>Media and Links</ListItemText>
                      <ListItemIcon>
                          {mediaFileOpen ?
                              <ArrowDropDownIcon/>
                              :
                              <ArrowRightIcon />
                          }
                      </ListItemIcon>
                  </ListItem>
                    <Collapse in={mediaFileOpen} unmountOnExit>
                      <List component="div">
                        
                          <ListItem button onClick={()=>setMediaOpen(prev =>!prev)}>
                                <ListItemIcon>
                              <PhotoLibraryIcon/>
                          </ListItemIcon>
                              Media
                          </ListItem>
                      </List>
                  </Collapse>
                   <ListItem button onClick={()=>setPrivacyOpen(prev=>!prev)}>
                        <ListItemText>Privacy and Support</ListItemText>
                      <ListItemIcon>
                          {privacyOpen ?
                              <ArrowDropDownIcon/>
                              :
                              <ArrowRightIcon />
                          }
                      </ListItemIcon>
                            </ListItem>
                           <Collapse in={privacyOpen} unmountOnExit>
                      <List component="div">
                        
                                    <ListItem button onClick={() => {
                                        if (window.confirm("if you block this chat, You can't message or call them in this chat & You won't receive their message or calls.Are you Sure?")) {
                                           console.log("OK! Block") 
                                        }
                                       
                          }}>
                                <ListItemIcon>
                              <RemoveCircleIcon/>
                          </ListItemIcon>
                              Block
                                    </ListItem>
                             
                      </List>
                  </Collapse>
              </List>
              </div>
                </div>
              
                <Media mediaOpen={mediaOpen} setMediaOpen={setMediaOpen} />
        
            </Paper>
               </> 
        
  )
}

export default ConversationDetailSide ;
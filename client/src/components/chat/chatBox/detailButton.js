import React,{useState,useRef} from 'react'
import { IconButton, Popper, Grow, Paper, MenuItem, MenuList,ClickAwayListener ,ButtonBase} from "@material-ui/core";
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ReplyIcon from '@material-ui/icons/Reply';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import useStyles from "../style";
import { useDispatch } from 'react-redux';
import { fetchConversations, removeMessage } from '../../../action';
import { useNavigate } from 'react-router-dom';
import ForwardTo from './actionButtons/forwardButton';
import EmojiButton from './actionButtons/emojiButton';

function DetailButton({ message ,socket,receiverId,own,setReply,setDefaultShow }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [detailOpen, setDetailOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
     const handleToggle = () => {
    setOpen((prev) => !prev);
  }
  const handleClose = () => {
    setOpen(false)
  }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
  const handleReply = () => {
   setReply(message)
  }
    return (
      <>
        <div className={showEmoji ? !own? classes.showEmojiReact : classes.showEmojiReactOwn: classes.hide} onMouseLeave={()=>setShowEmoji(false)}>
          <EmojiButton message={message} setShowEmoji={setShowEmoji} socket={ socket}/>
        </div>
   <IconButton className={classes.iconButton}  ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                      <MoreHorizOutlinedIcon fontSize='small'className={classes.icon}/>
                            </IconButton>
                             <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:"1"}}>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper >
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {own &&
                      <MenuItem component={ButtonBase} onClick={() => {
                        dispatch(removeMessage(message._id, socket, receiverId));
                                   
                      }} >Delete</MenuItem>
                    }
                    <ForwardTo message={message} socket={socket }/>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                          <IconButton className={classes.iconButton} onClick={()=>handleReply()}>
                              <ReplyIcon fontSize="small"className={classes.icon} /> 
        </IconButton>
        { !own &&
          <IconButton className={classes.iconButton} onClick={() => { setShowEmoji(true); setDefaultShow(true) }}>
            <SentimentSatisfiedOutlinedIcon fontSize="small" className={classes.icon} />
          </IconButton>
        }
            </>
  )
}

    export default DetailButton;
import React,{useDebugValue, useEffect, useState} from 'react'
import { AppBar, Grid, IconButton,Paper, Toolbar, Typography,Avatar ,Menu,MenuItem,ButtonBase} from '@material-ui/core';
import ChatLogo from "../../../logo/HiChat.png";
import useStyles from "../style";
import {  useLocation, useNavigate } from 'react-router-dom';
import decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../../actionTypes/ActionTypes';
import { API_HOST } from '../../../api/Api';

function ChatBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("chat_app_profile")));
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = user.token;
  
    if (token) {
      const jwt = decode(token);
  
      if (jwt.exp * 1000 < new Date().getTime()) {
        return Logout();
      }
      
      setUser(JSON.parse(localStorage.getItem("chat_app_profile")))
    }
  },[location])
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
  
  const Logout = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/login")
  }
  return (
    <AppBar position='static' color='inherit' className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <div>
          <a href="http://localhost:3000">
            <img src={ChatLogo} className={classes.logo} />
            </a>
         </div>
           <ButtonBase onClick={handleClick} className={classes.profile}>
          <Avatar className={classes.avatar} src={`${API_HOST}/images/user/${user?.result.image}`}/>
        </ButtonBase>
       
        <Paper>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
        
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
       
            <MenuItem>Profile</MenuItem>
            <ButtonBase onClick={Logout}> <MenuItem >Logout</MenuItem></ButtonBase>
           
          </Menu>
        </Paper>
                            
      </Toolbar>
    </AppBar>
  );
}

export default ChatBar
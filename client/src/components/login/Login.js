import { Button, Container,Grow,Paper,Typography,Zoom } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from "./style";
import Input from "../input/Input";
import chatLogo from "../../logo/109065588-chat-icon-colorful-logo-concept-with-simple-shadow-on-white-10-different-blurred-backgrounds-include.webp";
import HiChat from "../../logo/HiChat.png"
import ChatDesign from "../../logo/chatLogo.png";
import { LoginValidate } from '../formValidate/validate';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { login } from "../../action/auth";
import { useNavigate } from 'react-router-dom';


function Login() {
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setSubmit] = useState(false);
  const errors = useSelector((state) => state.errors);
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(LoginValidate(user));
    setSubmit(true);
  
  };
  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      dispatch(login(user,navigate));
    }
  },[formErrors])

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grow in>
       <Paper elevation={0} className={classes.paperWelcome}>    
          <img src={HiChat} height="150px" width="150px" />
          <img src={ ChatDesign} height="300px" width="400px"/>
        <Typography variant="body1" color="textSecondary">Connect with your friends and Make Communaties Convarsation.</Typography>
        </Paper>
        </Grow>
      <Zoom in>
       
        <Paper elevation={0} className={classes.paper}>

          <Typography variant='h5' align='center'>Login Form</Typography>
            {errors.status === 404 && (
              <Alert severity='error' style={{margin:"15px"}}>{ errors.msg }</Alert>
           )}
          <div className={classes.logo}>
            <img src={chatLogo} width="100px" heigth="100px"  alt="Chat Logo" />
          </div>
          
          <form className={classes.form} onSubmit={handleSubmit}>
            <Input type="text" name="email" label="Email" fullWidth value={user.email}
              error={isSubmit && formErrors.email?.length > 0}
              helperText={formErrors.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })} /><br /><br />
            <Input type="password" name="password" label="Password" fullWidth value={user.password}
              error={isSubmit && formErrors.password?.length > 0}
              helperText={formErrors.password}
              onChange={e => setUser({ ...user, password: e.target.value })} />
            <br /><br/>
            <Typography className={classes.registerText} component="a" href="/register" color='textSecondary' >Have't An Account?</Typography>
            <br/><br/>
            <Button variant="contained" color="secondary" fullWidth type="submit">Login</Button>
          </form>
        </Paper>
       </Zoom>
    </Container>
  )
}

export default Login
import React, { useEffect, useState } from 'react';
import { Container, Paper,Typography, Button,  Zoom, IconButton } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import useStyles from "./style";
import Input from '../input/Input';
import * as Action from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";
import Camera from "@material-ui/icons/CameraAltOutlined";
import Alert from "@material-ui/lab/Alert"
import HiChat from "../../logo/HiChat.png";
import ChatDesign from "../../logo/chatLogo.png";
import { validate } from '../formValidate/validate';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTheme } from '@material-ui/styles';

export const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [image, setImage] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const errors = useSelector((state) => state.errors);
  const [register, setRegister] = useState({ email: "", firstName: "", lastName: "", password: "", confirmPassword: "", image: "" ,country:"",region:""});
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRegister({ ...register, image: file });
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    }
    reader.readAsDataURL(file);
  }
 
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(register));
    setIsSubmit(true);

  
  //;
   
  }

  useEffect(() => {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(Action.register(register, navigate));
     
    }
  },[formErrors])

  return (
    <Container maxWidth="lg" className={classes.container}>  
      <Paper className={classes.paperWelcome} elevation={0}>
        <img src={HiChat} height="150px" width="150px" />
         <img src={ChatDesign} height="300px" width="400px" />
        <Typography variant="body1" style={{alignItems:"center"}} color="textSecondary">Connect with your friends and Make Communaties Convarsation.</Typography>
      </Paper>
      <Zoom in>
              <Paper elevation={0} className={classes.paper} >
          <form onSubmit={handleSubmit} name="myform">
           
            <Typography variant='h5' align='center' style={{ marginBottom: "15px" }}>Register</Typography>
             {errors.status === 400 && (
              <Alert severity='error' style={{margin:"15px"}}>{ errors.msg }</Alert>
           )}
            <div className={classes.userName}>
              
              <Input name="firstname" label="FirstName" type="text" error={isSubmit && formErrors.firstName?.length > 0} helperText={isSubmit && formErrors.firstName} onChange={(e) => setRegister({ ...register, firstName: e.target.value })} value={register.firstName} />
              
              <Input name="lastname"  error={isSubmit && formErrors.lastName?.length > 0} helperText={isSubmit && formErrors.lastName} label="LastName" type="text" onChange={(e) => setRegister({ ...register, lastName: e.target.value })} value={ register.lastName}/>
            </div>
        
            <Input label="Email"
             error={isSubmit && formErrors.email?.length > 0} helperText={isSubmit && formErrors.email}
              name="email" fullWidth type="text" onChange={(e) => setRegister({ ...register, email: e.target.value })} value={register.email} />
                <div  className={classes.countryRegionContainer}>
              <div>
            <CountryDropdown
                
                value={register.country}
                  style={{
                    height: "50px", borderRadius: "10px", width: "200px", background: "white", fontSize: "15px", marginTop: "10px",}}
                
                onChange={(val) => {
                
                  setRegister({ ...register, country: val })
                }} />
              {formErrors.country?.length > 0 &&
                (
                <p style={{color:"red"}}>{ formErrors?.country }</p>
                  )}
              </div>
              <div>
              <RegionDropdown country={register.country}
                value={register.region} style={{height:"50px",width:"200px",borderRadius:"10px",background:"white",marginLeft:"8px",marginTop:"10px"}}
                onChange={v => setRegister({ ...register, region: v })} />
              
              
               {formErrors.region?.length > 0 &&
                (
                <p style={{color:"red"}}>{ formErrors?.region }</p>
                  )}
                </div>
                
             </div>

            <Input label="Password"
             error={isSubmit && formErrors.password?.length > 0} helperText={isSubmit && formErrors.password}
              name="password" fullWidth type="password" onChange={(e) => setRegister({ ...register, password: e.target.value })} value={register.password} />
            
            <Input variant='outlined' name="confrimPassword"
               error={isSubmit && formErrors.confirmPassword?.length > 0} helperText={isSubmit && formErrors.confirmPassword}
              label="ConfrimPassword" fullWidth type="password" onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })} value={register.confirmPassword} />
            
            <div className={classes.profile}>
              
              <img src={image} className={classes.profileImg} />
               
              <div>
               
              <input type="file" name="image" onChange={handleImageChange} style={{ display: "none" }} id="icon-button-file" />
              <label htmlFor='icon-button-file'>
                  <IconButton component="span" >
                    {image ?  (<Camera style={{color:"#2874A6"}}/>):(<Camera />)}
                 
                </IconButton>
                </label>
              </div>
             
            </div>
             {formErrors.image?.length > 0 && (
                  <p style={{color:"red"}}>{ formErrors.image}</p>
                )}
                  <Button variant='contained' style={{background:"#9B59B6",color:"white"}} fullWidth size="large" type="submit">Register</Button>
              </form>
              <br />
                  <Typography component={Link} to="/login" className={classes.loginText} align="right">Already Have An Account?</Typography>
                      
              </Paper>
              </Zoom>
    </Container>
  )
}

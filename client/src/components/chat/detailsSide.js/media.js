import { IconButton, Slide, Tab, Tabs, Typography,Box } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from "./style";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { API_HOST } from '../../../api/Api';

const TabPanel = ({ children, value, index, ...other }) => {
  const messages = useSelector((state) => state.messages);
  const classes = useStyles();
  const messageMedia = messages?.some((m) => m?.file && m?.file.image !== null) || messages.some((m)=> m.file && m?.file.video !== null);
   

    return (
         <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
                    <div className={classes.mediaContainer}>
              {children === "Media" &&
            
                <div className={classes.imgLibrary}>
                  {messageMedia ?
                  <>
                  {messages.map((m) => { 

                      return  m?.file?.image && <a href={`${API_HOST}/images/messages/${m.file?.image}`}><img className={classes.img} src={`${API_HOST}/images/messages/${m.file?.image}`} /></a>   
                   
                  }
              
                  )}
                  {messages.map((m) => {
                       return m?.file?.video && <video className={classes.img} src={`${API_HOST}/video/messages/${m.file?.video}`} controls /> 
                   })}
                  </>
                     :
                <div style={{display:"flex",justifyContent:"center"}}>
                      <Typography color="textSecondary">No Media</Typography>
                </div>}
                </div>
             
              } 
            
              
           </div>
        </Box>
      )}
    </div>
  );
    
}

const Media = ({ mediaOpen,setMediaOpen }) => {
    const classes = useStyles();
    function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}
    const [value, setValue] = useState(0);
  return (
      <Slide in={mediaOpen} direction="left" unmountOnExit >
          <div>
          <div className={classes.mediaTitleAndIcon}>

                  <IconButton onClick={()=>setMediaOpen(prev =>!prev)}>
                      <ArrowBackIcon/>
                  </IconButton>
            
                  <Typography variant="h6" style={{marginTop:"10px"}}>Media & Links</Typography>
              </div>
              <div className={classes.tab}>
                  <Tabs value={value} onChange={(e,newValue)=>setValue(newValue)} indicatorColor="primary"       textColor="primary" variant="scrollable"
        centered>
                      <Tab label="Media" {...a11yProps(0)}/>  
                  </Tabs>
              </div>
              <TabPanel value={value} index={0} children="Media" />
             
             
              </div>
     </Slide>
  )
}

export default Media
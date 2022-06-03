import React from 'react';
import { Paper } from "@material-ui/core";
import useStyles from "../style";
import RobotGif from "../../../logo/chatbot-marketing.gif";

function Welcome() {
    const classes = useStyles();
  return (
      <Paper elevation={6} className={classes.welcomePagePaper}>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",}}>
              <div style={{ marginTop: "50px" }}>
                  <div style={{alignItems:"center",textAlign:"center"}}>
                  <img src={RobotGif} height="300px" width="300px" />
                      <h3 style={{ color: "grey" }}>Welcome From HiChat Application</h3>
                      </div>
                  <p style={{ color: "grey" }}>Please select a chat to start messaging (OR) Search Your Friends and Select a Chat to Start.</p>
              </div>
              
          </div>
    </Paper>
  )
}

export default Welcome
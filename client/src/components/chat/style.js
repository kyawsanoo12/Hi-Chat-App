import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    
    root: {
        margin: "0",
       
       backgroundColor:theme.palette.background.paper
    },
     appbar: {
        marginBottom: "5px",
        borderTopLeftRadius: "10px",
         borderBottomLeftRadius:"10px",
        height:"70px",
        padding:"0"
    },
    replyTextContainer: {
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "#ECF0F1",
       
        marginTop:"10px"
    },
    senderReply: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-end"
    },
    receiverReply: {
        marginLeft:"20px",
          display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start"
    },
    profile: {
        position: "absolute",
        right:"0"
    },
    conversationContainerColor: {
        display: "flex", justifyContent: "space-between", position: "relative",
        borderRadius:"10px",
      background:theme.palette.grey.main  
    },
    conversationContainer: {
        display: "flex", justifyContent: "space-between", position: "relative",
       
    },
    paper: {
        
        padding: "10px",
        height: "81vh",  
    
        marginBottom:"0"
    },
    scrollY: {
        overflowY:"auto",
        
        maxHeight: "60vh",
        marginTop:"10px"
    },
    avatar: {
        margin:"15px",
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        position:'relative',
        padding:"0"
    },
    logo: {
        maxHeight: "90px",
       width: "150px",
        
        marginBottom:"0"
    },
    active: {
        borderRadius: "50%",
        height: "8px",
        width: "8px",
        background: theme.palette.success.main,
        position: "absolute",
        top: "30px",
        left:"26px"
    },
    avatarContainer: {
        position: "relative",
        margin: "10px",
        
    },
    notificationNumber: {
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        background: "red",
        color: "white",
        fontSize: "10px",
        padding:"1px"
    },
    message: {
        display: "flex",
        flexDirection: "column",
        textAlign: "initial",
        marginTop: "15px",
        marginLeft:"15px"
    },
    buttonBase: {
        position:"relative",
        borderRadius: "10px",
        
        borderBottom: `1px solid ${theme.palette.grey.main}`,
        padding:"10px",
        marginBottom: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-start"
    },
  
    friendMessageTime: {
        position: "absolute",
        top: "10px",
        right: "5px",
        color:"gray"
    },
    chatUserBar: {
        display: "flex",
        flexDirection: "row",
        borderBottom: `1px solid ${theme.palette.grey.main}`,
        padding: "5px",
        height:"50px",
        justifyContent:"space-between",
        [theme.breakpoints.down("sm")]: {
            padding:"0"
        }
    },
   
    typingContainer: {
        marginLeft: "20px",
      
    },
    chatBarUserProfile: {
        display: "flex",
        
    },
    chatBarUserAction: {
        display: "flex",
        flexDirection: "row",
        
    },
    chatBoxPaper: {
        position:"relative",
        padding: "10px",
        marginLeft: "5px",
       
        //background: "#F8F9F9",
       // background: theme.palette.grey.main,
        //color:"white",
    
        height: "82vh",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0"
       }
        
    },
    profileNameAndActiveText: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            margin:"0"
        }
    },
    callIcon: {
        [theme.breakpoints.down("sm")]: {
            height: "20px",
            margin:"0"
        }
    },
   
    
    welcomePagePaper: {
         position:"relative",
        padding: "10px",
       marginLeft:"5px",
       // background: "#F8F9F9",
        height: "94vh",
    },
    chatBarProfileName: {
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "15px",
            marginLeft: "0",
            marginTop:theme.spacing(1)
        }
    },
    messageAvatar: {
        [theme.breakpoints.down("sm")]: {
            maxHeight: "30px",
            maxWidth:"30px"
      }  
    },
    activeText: {
        marginLeft: "20px", color: "green",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            fontSize:"12px"
        }
    },
    convarsition: {
        display: "flex",
      
        flexDirection:"column",
        padding: "15px",
        maxHeight: "65vh",
      
        overflowX: "hidden",
        
       [theme.breakpoints.down("sm")]: {
            maxHeight:"67vh"
        }
    },
    receive: {
        marginLeft:"20px",
        padding: "15px",
        borderRadius: "20px",
        backgroundColor:theme.palette.grey.main,
        position: "relative",
        marginBottom: "15px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "5px",
            borderRadius: "10px",
            padding: "10px",
            maxWidth:"100px",
            marginBottom: "10px",
        }
    },
    text: {
        position: "relative",
        padding: "0",
        margin: "0 ",
        fontSize: "14px",
        fontFamily:"Arial",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            padding:"0 5px"
        }
    },
   msgIconHoverShow: {
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" 
      
    },
    msgIconHoverReverseShow: {
         display: "flex", flexDirection:"row-reverse", justifyContent: "center", alignItems: "center" 
    },
    messageDetailButton: {
        marginRight: "20px",
       
    },
    messageSenderContainer: {
        display:"flex",flexDirection:"column"
    },
    delivaredAndSeenInConver: {
        position: "absolute",
        right: "20px",
        top: "50px",
        
    },
    seenMsg: {
        width: theme.spacing(2) || "20px",
        height:theme.spacing(2) || "20px"
    },
    replyContainer: {
        position: "fixed",
        bottom:"80px",
       marginBottom:"10px",
        padding: "10px",
        borderTop: `1px solid ${theme.palette.grey.main}`,
        width: "68vw",
     background: theme.palette.grey.white,
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
      
        borderBottom: "0",
        display: "flex",
        justifyContent:"space-between"
    },
    msgDetailReceiveButton: {
        marginLeft:"20px"
    },
    icon: {
        margin: "0",
        padding:"0"
    },
    iconButton: {
        width: "20px",
        height:"20px"
    },
    chatMessage: {
        display: "flex",
        position: "relative",
        marginBottom: "40px",
       justifyContent:"space-between"
    },
    chatMessageTime: {
        position: "absolute",
        bottom: "0px",
        left:"90px",
        color: "gray",
        [theme.breakpoints.down("sm")]: {
            left: "50px",
            fontSize:"13px"
        }
    },
   
    sendImg: {
       position:"relative",
        marginTop: "10px",
        marginBottom: "0px",
        
        
    },
    messageImg: {
        maxWidth: "300px",
        maxHeight: "300px",
        borderRadius: "20px",
        marginBottom: "10px",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
           maxWidth:"200px"
            
        }
    },

    chatSenderMessageTime: {
        position: "absolute",
        bottom:"0",
        right: "0px",
        color: "grey",
        [theme.breakpoints.down("sm")]: {
            fontSize: "13px",
            right:"0"
        }
    },
    chatArrowBackIcon: {
        display:"none"
    },
    sender: {
         
         marginLeft:"20px",
        padding: "15px",
        borderRadius: "20px",
       
        color:"white",
        maxWidth:"200px",
        marginBottom: "20px",
        position: "relative",
         backgroundColor: theme.palette.primary.main,
       [theme.breakpoints.down("sm")]: {
           marginLeft: "0",
           borderRadius: "10px",
           marginBottom: "10px",
           padding: "5px",
           
           maxWidth: "100px",
           
          
           
        }
    },
    removeMsgSender: {
        marginLeft: "20px",
        padding: "15px",
        borderRadius: "20px",
        color:"grey",
        maxWidth: "200px",
        marginBottom: "20px",
        position: "relative",
        backgroundColor: theme.palette.grey.main,
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            borderRadius: "10px",
            marginBottom: "10px",
            padding: "5px",
            maxWidth: "100px",
          
        }
    },
    senderMessage: {
        position: "relative",
       
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "15px",
        [theme.breakpoints.down("sm")]: {
            margin: "0",
           
        }
    },
    textBox: {
        display: "flex",
        flexDirection: "row",
        //backgroundColor:"#F8F9F9",
        marginLeft:"5px",
        
        padding: "10px",
        borderTop: "1px solid #E5E7E9",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            marginTop:"5px",
            padding:"5px"
        }
    },
    textBoxContainer: {
        display: "flex",
   flexDirection:"column"     
},
    sendIcon: {
        marginLeft:"10px"
    },
    hide: {
        display:"none"
    },
    showEmoji: {
        position: "absolute",
        bottom:"100px"
    },
    file: {
        display:"none"
    },
    upload: {
        marginTop:"1px"
    },
     imgContainer: {
        position:"absolute",
        height: "100px",
         width:"950px",
        bottom: "100px",
        border: "1px solid #E5E7E9",
        background: "#F8F9F9",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    img: {
        maxWidth: "100px",
        maxHeight:"100px"
    },
    conversationLoading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"150px"
    },
    chatBoxLoading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop:"200px"
    },
    noMessageContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
       marginTop:"100px"
    },
    noMessageAvatar: {
        height: "150px",
        maxWidth: "150px",
        borderRadius:"50%"
    },
    converMoreHorizIcon: {
      
       marginTop:"20px"
    },
    converActionButtons: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E7E9",
        zIndex: "1",
        borderRadius: "10px",
        padding: "10px",
        position: "absolute",
        right: "0",
        bottom: "-10px",
       
    },
    showEmojiReact: {
        position: "absolute",
        bottom: "0",
        zIndex: "1",
        left:"70px"
    },
    showEmojiReactOwn: {
        position: "absolute",
        bottom: "0",
        right: "70px",
        zIndex:"1"
    },
  
    [theme.breakpoints.down("sm")]: {
        showEmojiReact: {
           
        },
      
        chatMessage: {
            marginBottom: "0",
            marginTop:"15px"
        },
        senderMessage: {
            marginTop:"10px"
        },
        typingContainer: {
            marginLeft: "0",
            position: "absolute",
          bottom:"10px",
       },
        receiverReply: {
            marginLeft:"0"
        },
       
        replyContainer: {
            width: "90vw",
            height:"30px"
        },
        sender: {
            marginTop:"15px"
        },
        noMessageAvatar: {
            height: "100px",
            width:"100px"
        },
        noMessageContainer: {
            marginTop:"50px"
        },
        chatBoxLoading: {
            marginTop:"160px"
        },
        addIcon: {
            height: "20px"
        },
        photoIcon: {
            height: "20px"
        },
        emojiIcon: {
            height: "20px"
        },
        addIconButton: {
            width: "15px"
        },
        photoIconButton: {
            width: "15px",
          
        },
        emojiIconButton: {
            width: "10px"
        },
        textField: {
          //  height: "40px",
           " & label.Mui-focused": {
    color: "white"
  },
  "& .MuiOutlinedInput-root" :{
    "&.Mui-focused fieldset" :{
      borderColor: "#CACFD2"
    }
  }
        },
        callIcon: {
            margin: "0",
            fontSize:"18px"
        },
       
        morehorizIcon: {
            margin: "0",
            fontSize:"20px"
        },
        videoIcon: {
            margin: "0",
            fontSize:"20px"
        },
        sendIcon: {
            width: "10px",
            marginLeft:"5px"
        },
        conversationGrid: {
            display:"block"
        },
        conversationGridNone: {
            display:"none"
        },
        chatBoxGridNone: {
            display:"none"
        },
        imgContainer: {
            width: "300px",
            bottom:"50px"
        },
        showEmoji: {
            bottom: "60px",
        
        },
        chatArrowBackIcon: {
            display: "block",
            margin: "0",
            width:"10px"
        },
        buttonBase: {
            margin: "0",
            padding: "5px",
           
        },
        converUserName: {
            fontSize:"18px"
        },
       
       },
   
    closeIcon: {
        position: "absolute",
        top: "0px",
        right: "0px",
       
    },
    imgContainer2: {
        position:"relative"
    },
    textField: {
      marginTop:"1px"
    },
    users: {
        height: "70px",
        width: "310px",
        display: "flex",
        overflowX:"auto",
        marginTop: "5px",
        "&::-webkit-scrollbar": {
            height: "10px",
         
        },
       borderBottom:"1px solid #ECF0F1"
       
       
        
    },
     replyTextBoxImg: {
         maxHeight: "100px",
         marginTop:"10px"
    },
    replyImg: {
        maxHeight: "100px",
        borderRadius: "10px",
        opacity: ".7",
        cursor:"pointer"
   },
    receiverSideEmoji: {
        position: "absolute",
        right: "0",
        bottom: "0",
        textAlign:"center",
        width: "15px",
        heigth:"15px",
        borderRadius:"50%",
        padding:"2px",
        background:"white"
    },
    senderSideEmoji: {
        position: "absolute",
        display: "flex",
       
        justifyContent:"center",
        left: "0",
        bottom: "0",
        color:"black",
            width: "15px",
        heigth: "15px",
       
        borderRadius:"50%",
        padding:"2px",
        backgroundColor: "white",
      
    },
    imgContainer1: {
        position:"absolute",
        height: "100px",
         width:"650px",
        bottom: "100px",
        border: "1px solid #E5E7E9",
        background: "#F8F9F9",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center"
    },
}));
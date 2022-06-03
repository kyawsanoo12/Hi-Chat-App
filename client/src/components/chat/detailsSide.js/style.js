import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    paperContainer: {
        height: "95vh",
        overflow: "auto",
        overflowY:"auto"
    },
    profile: {
        display: "flex",
            flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
            borderBottom:"1px solid #F4F6F6",
    },
    avatar: {
        height: "100px",
        width:"100px"
    },
    mediaTitleAndIcon: {
        display: "flex",
        flexDirection: "row",
       
        padding:"10px"
    },
    mediaContainer: {
        padding: "10px",
        
    },
    backIcon: {
        display: "none",
        [theme.breakpoints.down("sm")]:{
            display:"block"
        }
   },
    img: {
        height: "75px",
        width: "75px",
        margin: "5px",
        [theme.breakpoints.down("sm")]: {
             width:"100px"
         }
    },
    [theme.breakpoints.down("sm")]: {
        tab: {
            marginLeft:"15px"
        }
    }
}));
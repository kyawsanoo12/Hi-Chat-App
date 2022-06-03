import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    paper: {
        padding: "25px",
       
        borderRadius:"20px",
        width:"500px"
    },
    flex: {
      display:'flex'  
    },
    userName: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
             },
    loginText: {
        textDecoration: "none",
        color: "black",
        
       
    },
    countryRegionContainer: {
        margin:"10px",display:"flex",justifyContent:"space-between"
    },
    countryDropDown: {
       
        height: "50px",
        borderRadius: "10px",
        width: "200px",
        background: "white",
        fontSize: "15px",
        marginTop: "10px"
    },
    container: {
        marginTop: "20px",
        display: "flex",
        flexDirection: 'row',
        justifyContent:"space-between"
    },
    paperWelcome: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems:"center"
    },
    image: {
       maxWidth:"200px"
    },
    profile: {
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"
    },
    profileImg: {
        height:"100px",
        width: "100px",
        borderRadius: "50%",
        border:"1px solid gray",
    },
     [theme.breakpoints.down("sm")]: {
        paperWelcome: {
            display:"none"
         },
         paper: {
             width: "300px",
             padding:"0"
         },
         countryRegionContainer: {
             flexDirection: "column",
             
             position:"relative"
         }
     }
    
}));
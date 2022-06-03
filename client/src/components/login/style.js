import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    container: {
        marginTop: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"
    },
    form: {
        margin:"20px"
    },
    paper: {
        padding: "10px",
        borderTopRightRadius: "30px",
        borderBottomLeftRadius: "30px",
        width:"400px"
    },
    registerText: {
        margin: "15px",
        textDecoration:"none"
    },
    logo: {
        display: "flex",
        flexDirection:"row",
        justifyContent:"center"
       
    },
     paperWelcome: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems:"center"
    },
    [theme.breakpoints.down("sm")]: {
        paperWelcome: {
            display:"none"
        }
     }
}))
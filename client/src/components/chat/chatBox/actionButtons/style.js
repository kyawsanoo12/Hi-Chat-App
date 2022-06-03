import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
    userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "15px",
        
    },
    user: {
        display: "flex",
        justifyContent:"space-between"
    },
    avatar: {
        marginRight:"15px"
    },
    userName: {
        marginTop:"5px"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"
    }
}))
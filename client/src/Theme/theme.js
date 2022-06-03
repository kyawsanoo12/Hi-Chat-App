import { createTheme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

export const lightTheme = createTheme({
   
    palette: {
        type:"light",
        primary: {
            main:blue[700]
        },
        grey: {
            white:grey[100],
            main:grey[200]
        },
        mode:"dark",
    }
})

export const darkTheme = createTheme({
    palette: {
        type: "dark",
        grey: {
            main:grey[700]
        }
    }
})
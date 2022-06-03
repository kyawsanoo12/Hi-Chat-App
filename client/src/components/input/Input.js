import React, { useState } from 'react';
import { IconButton, InputAdornment,TextField } from "@material-ui/core";
import useStyles from "./style";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function Input({ label, name, fullWidth ,type,onChange,value,error,helperText}) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((old) => !old);
    }

  return (
      <>
          <TextField
              label={label}
              variant="outlined"
              name={name}
              fullWidth={fullWidth}
              className={classes.input}
              onChange={onChange}
              value={value}
              error={error}
              helperText={helperText}
              type={type === "password" ? 
               showPassword ? "text" : "password"
                  : "text"}
              InputProps={{
                  endAdornment:type === "password" ? (
                      <InputAdornment position='end'>
                          <IconButton onClick={handleShowPassword}>
                              {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                              </IconButton>
                  </InputAdornment>
              )
                  : null
              
            }}
          
          />
      </>
  )
}

export default Input;
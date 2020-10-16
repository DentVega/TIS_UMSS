import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button,Grid } from '@material-ui/core';
import {usePassword,useEmail} from '../constants/formCustomHook/useForm';


const LoginPage=()=> {
  const emailregex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [email,setEmail,emailError,setEmailError,emailMessage,setEmailMessage]=useEmail();  
  const [password,setPassword,passwordError,passMessage]=usePassword();

  const handleLogin=()=>{
    if(email.length>5 && emailregex.test(email)){ 
      //algo
    }else{
      setEmailError(true);
      setEmailMessage("email invalido");
    }
  }

  return (   
    
    <Grid 
      container        
      style={{minHeight:"100vh"}}
      alignItems="center"
      justify="center"
    >    
      <Grid 
        container 
        direction="column"
        style={{width:"45vh",borderRadius:"40px",padding:"20px",boxShadow:"0px 10px 10px 0px grey"}}
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <h2>Iniciar Sesion</h2>
        </Grid>
        <Grid item>
          <TextField
              error={emailError}
              id="filled-error-helper-text"
              label="Email"
              helperText={emailMessage}
              autoComplete="off"              
              value={email}
              type="email"
              name="email"
              variant="filled"
              onChange={setEmail}
              autoFocus={true}
              
            />  
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="filled-error-helper-text"
              label="Password"
              name="password"
              type="password"
              value={password}
              helperText={passMessage}
              variant="filled"
              autoComplete="off"
              onChange={setPassword}
              
            />    
          </Grid>
          <Grid item> 
            <Button variant="contained" color="primary" onClick={handleLogin}  >
              Iniciar Sesion
            </Button>
          </Grid> 
          <Grid item>
            <Button>
              olvido su contraseña?
            </Button>
          </Grid>
        </Grid>
    </Grid>  
         
  );
}

export default LoginPage;

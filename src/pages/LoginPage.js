import React,{useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Button,Grid,Link } from '@material-ui/core';

const LoginPage=()=> {
  const [form,setForm]=useState({
    email: "",
    password: ""
  });
  const {email,password}=form;

  const [emailE,setEmailE]=useState(false);
  const [passE,setPassE]=useState(false);


  useEffect(() => {
    email.length>30 ? setEmailE(true) : setEmailE(false);
    password.length>20 ? setPassE(true) : setPassE(false); 
  }, [email,password]);

  const handleInputChange=({target})=>{
    setForm({
      ...form,
      [ target.name ]:target.value
    })
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
              <label>Iniciar Sesion</label>
            </Grid>
            <Grid item>
            <TextField
                error={emailE}
                id="filled-error-helper-text"
                label="Email"
                autoComplete="off"
                name="email"
                value={email}
                helperText={emailE ? "Incorrect entry":""}
                variant="filled"
                onChange={handleInputChange}
                autoFocus={true}
                color="primary"
              />
              </Grid>
              <Grid item>
              <TextField
                error={passE}
                id="filled-error-helper-text"
                label="Password"
                name="password"
                value={password}
                helperText={passE ? "Incorrect entry":""}
                variant="filled"
                autoComplete="off"
                onChange={handleInputChange}
              />  
              </Grid>
              <Grid item> 
              <Button variant="contained" color="primary">
                Iniciar Sesion
              </Button>
              </Grid> 
              <Grid item>
                <Link>
                  olvido su contraseña?
                </Link>
              </Grid>
            </Grid>
        </Grid>   
        
  );
}

export default LoginPage;

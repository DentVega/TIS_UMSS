import React from 'react'
import {TextField,Grid,Button} from '@material-ui/core';
import { useEmail,useFullName,useCi,usePhone } from '../constants/formCustomHook/useForm';

const RegistrationPage = () => {
    const [name,handleNameChange,nameError,setNameError,nameMesasge,setNameErrorMessage] = useFullName();
    const [lastName,handleLastNameChange,lastNameError,setLastNameError,lastNameMesasge,setLastNameErrorMessage] = useFullName();
    const [phone,handlePhoneChange,phoneError,setPhoneError,phoneErrorMessage,setPhoneErrorMessage] = usePhone();
    const [email, setEmail, emailError, setEmailError, emailMessage, setEmailMessage] = useEmail();
    const [ci,handleCiChange,ciError, setCiError,ciErrorMessage, setCiMessageError] = useCi();
    const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const register=()=>{
        if(!nameError && name.length > 0){
            if(!lastNameError && lastName.length > 0){
                if(!phoneError && phone.length > 0){
                    if(!emailError && email.length > 4 && emailregex.test(email)){
                        if(!ciError && ci > 0){
                            console.log("usuario registrado")
                        }else{
                            setCiMessageError("carnet incorrecto");
                            setCiError(true);
                        }
                    }else{
                        setEmailMessage("email incorrecto");
                        setEmailError(true);
                    }
                }else{
                    setPhoneErrorMessage("telefono incorrecto");
                    setPhoneError(true);
                }

            }else{
                setLastNameErrorMessage("dato incorrecto");
                setLastNameError(true);
            }
        }else {
            setNameErrorMessage("dato incorrecto") ;
            setNameError(true);
        }
    }
    return (
        <div id={'content-login'} style={{ height: 700 }}>
        <Grid
            container 
            autoComplete="off"
            style={{minHeight:"100vh"}}
            alignItems="center"
            justify="center"
            >
            <Grid 
                container 
                justify="center"
                direction="column"
                spacing={4}
                style={{height:"90vh",width:"90vh",borderRadius:"40px",boxShadow:"0px 10px 10px 0px grey"}}
            >
                <Grid item>
                <Grid item style={{textAlign:'center'}}>
                    <h2>Crear Usuario</h2>
                </Grid>
                    <TextField 
                    
                        label="Nombres" 
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        error={nameError}
                        helperText={nameMesasge}
                        autoFocus
                    />
                </Grid>
                <Grid item >
                    <TextField 
                    label="Apellidos" 
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}    
                    error={lastNameError}
                    helperText={lastNameMesasge}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                    label="Telefono" 
                    type="number"  
                    value={phone}     
                    onChange={handlePhoneChange}   
                    error={phoneError}
                    helperText={phoneErrorMessage}              
                    />
                </Grid>
                
                <Grid item >
                    <TextField 
                    label="Email" 
                    type="email"                      
                    value={email}
                    onChange={setEmail}  
                    error={emailError}
                    helperText={emailMessage}
                    />
                </Grid>
                <Grid item >
                    <TextField 
                        label="CI" 
                        type="number" 
                        value={ci}
                        onChange={handleCiChange}
                        error={ciError}
                        helperText={ciErrorMessage}
                    />
                </Grid>
                <Grid item style={{textAlign:"center"}}>
                    <Button variant="contained" color="primary" type="submit" onClick={register}>
                        Crear Usuario
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        </div>
    )
}

export default RegistrationPage;

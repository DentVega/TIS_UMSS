import React,{useEffect} from 'react';
import { TextField, Grid, Button } from '@material-ui/core';

export const RegisterForm =(
    props
)=>{
    
    const[,,ciError,setCiError,,]=props.useCi;
    useEffect(()=>{
        setCiError(true);
    })
    console.log(ciError);
    return(
        <div>
            asdasd
        </div>
    )
}

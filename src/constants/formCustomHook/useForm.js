import {useState} from 'react';

export const useEmail = () => {
    const [values,setValues] =useState("");
    const [emailError,setEmailError]=useState(false);
    const [emailMessage,setEmailMessage]=useState("");
    const handleEmailChange=({target})=>{        
        if(values.length>30){
            setEmailError(true);
            setEmailMessage("Muchos Caracteres");
        }else{
            setEmailError(false);
            setEmailMessage("");
        }
        setValues(target.value)
    }
    return [values,handleEmailChange,emailError,setEmailError,emailMessage,setEmailMessage];
}

export const usePassword = () => {
    const [values,setValues] =useState("");
    const[passwordError,setPasswordError]=useState(false);

    const handleEmailChange=({target})=>{

        values.length>20?setPasswordError(true):setPasswordError(false);
        setValues(target.value)
    }
    return [values,handleEmailChange,passwordError,passwordError?"Muchos Caracteres":""];
}


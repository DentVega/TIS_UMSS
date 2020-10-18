import { useState } from 'react';

export const useEmail = () => {
  const [values, setValues] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const handleEmailChange = ({ target }) => {
    if (values.length > 29) {
      setEmailError(true);
      setEmailMessage('Muchos Caracteres');
    } else {
      setEmailError(false);
      setEmailMessage('');
    }
    setValues(target.value);
  };
  return [values, handleEmailChange, emailError, setEmailError, emailMessage, setEmailMessage];
};

export const usePassword = () => {
  const [values, setValues] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passMessage,setPassMessage] = useState('');

  const validPass = () => {
    return values.length > 20 || values.length === 0;
  };

  const handlePassChange = ({ target }) => {
    if (values.length > 29) {
      setPassMessage('Muchos Caracteres');
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassMessage('');
    }
    setValues(target.value);
  };
  return [values, handlePassChange, passwordError,setPasswordError,passMessage,setPassMessage ];
};

export const useFullName=()=>{
  const [values, setValues] = useState('');
  const [fullNameError,setFullNameError] = useState(false);
  const [fullNameMesasge,setFullNameErrorMessage] = useState('');
  const handleFullNameChange =({target})=>{
    if(values.length > 24){
      setFullNameErrorMessage("limite de caracteres 25");
      setFullNameError(true);
    }else{
      setFullNameErrorMessage("");
      setFullNameError(false);
    }
    setValues(target.value);
  }
  return [values,handleFullNameChange,fullNameError,setFullNameError,fullNameMesasge,setFullNameErrorMessage];
}

export const useCi=()=>{
  const [values, setValues] = useState('');
  const [ciError, setCiError] = useState(false);
  const [ciErrorMessage, setCiMessageError] = useState('');
  const handleCiChange =({target})=>{
    if(values.length > 7){
      setCiMessageError("8 numeros como maximo");
      setCiError(true);
    }else{
      setCiMessageError("");
      setCiError(false);
    }
    setValues(target.value);
  }
  return [values,handleCiChange,ciError, setCiError,ciErrorMessage, setCiMessageError];
}
export const usePhone=()=>{
  const [values, setValues] = useState('');
  const [phoneError,setPhoneError] = useState(false);
  const [phoneErrorMessage,setPhoneErrorMessage] =useState("");
  const handlePhoneChange =({target})=>{
    if(values.length > 7){
      setPhoneErrorMessage("8 numeros como maximo");
      setPhoneError(true);
    }else{
      setPhoneErrorMessage("");
      setPhoneError(false);
    }
    setValues(target.value);
  }
  return [values,handlePhoneChange,phoneError,setPhoneError,phoneErrorMessage,setPhoneErrorMessage]
}
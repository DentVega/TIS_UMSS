import { useState } from 'react';
import {sLimitCharacters,sLimitNumber} from '../strings';
import {re} from '../regexs';

export const useEmail = () => {
  const [values, setValues] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const handleEmailChange = (value) => {
    if (values.length > 29 || re.test(value)) {
      setEmailError(true);
      setEmailMessage('');
    } else {
      setEmailError(false);
      setEmailMessage('');
    }
    setValues(value);
  };
  return [values, handleEmailChange, emailError, setEmailError, emailMessage, setEmailMessage];
};

export const usePassword = () => {
  const [values, setValues] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passMessage,setPassMessage] = useState('');


  const handlePassChange = ({ target }) => {
    if (values.length > 29) {
      setPassMessage('');
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
  const handleFullNameChange =(value)=>{
    
    if(values.length > 24 || !re.test(value)){
      setFullNameErrorMessage("");
      setFullNameError(true);
    }else{
      setFullNameErrorMessage("");
      setFullNameError(false);
    }
    setValues(value);
  }
  return [values,handleFullNameChange,fullNameError,setFullNameError,fullNameMesasge,setFullNameErrorMessage];
}

export const useCi=()=>{
  const [values, setValues] = useState('');
  const [ciError, setCiError] = useState(false);
  const [ciErrorMessage, setCiMessageError] = useState('');
  const handleCiChange =(value)=>{
    if(values.length > 7){
      setCiMessageError(sLimitNumber);
      setCiError(true);
    }else{
      setCiMessageError("");
      setCiError(false);
    }
    setValues(value);
  }
  return [values,handleCiChange,ciError, setCiError,ciErrorMessage, setCiMessageError];
}
export const usePhone=()=>{
  const [values, setValues] = useState('');
  const [phoneError,setPhoneError] = useState(false);
  const [phoneErrorMessage,setPhoneErrorMessage] =useState("");
  const handlePhoneChange =(value)=>{
    if(values.length > 7){
      setPhoneErrorMessage(sLimitNumber);
      setPhoneError(true);
    }else{
      setPhoneErrorMessage("");
      setPhoneError(false);
    }
    setValues(value);
  }
  return [values,handlePhoneChange,phoneError,setPhoneError,phoneErrorMessage,setPhoneErrorMessage]
}

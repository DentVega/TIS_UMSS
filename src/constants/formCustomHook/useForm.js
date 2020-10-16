import { useState } from 'react';

export const useEmail = () => {
  const [values, setValues] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const handleEmailChange = ({ target }) => {
    if (values.length > 30) {
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

  const handleEmailChange = ({ target }) => {
    if (values.length > 30) {
      setPasswordError(true);
      setPassMessage('Muchos Caracteres');
    } else {
      setPasswordError(false);
      setPassMessage('');
    }
    setValues(target.value);
  };
  return [values, handleEmailChange, passwordError,setPasswordError,passMessage,setPassMessage ];
};

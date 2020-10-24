import { useState } from 'react';
import { emailRegex, nameRegex, lastNameRegex, phoneRegex, ciRegex } from '../regexs';
import { sLimitNumber, sLimitCharacters } from '../strings';

export const useEmail = () => {
  const [values, setValues] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const handleEmailChange = (value) => {
    if (!emailRegex.test(value)) {
      setEmailError(true);
      setEmailMessage('Debe seguir el siguiente formato test@example.com');
    } else if (value.length > 29) {
      setEmailError(true);
      setEmailMessage(sLimitCharacters);
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
  const [passMessage, setPassMessage] = useState('');

  const handlePassChange = ({ target }) => {
    if (values.length > 29) {
      setPassMessage(sLimitCharacters);
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassMessage('');
    }
    setValues(target.value);
  };
  return [values, handlePassChange, passwordError, setPasswordError, passMessage, setPassMessage];
};

export const useFullName = () => {
  const [values, setValues] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameMesasge, setFullNameErrorMessage] = useState(null);
  const handleFullNameChange = (value) => {
    if (value.length === 0) {
      setFullNameErrorMessage('El nombre no puede estar vacio');
      setFullNameError(true);
    } else if (!nameRegex.test(value)) {
      setFullNameErrorMessage('Solo se aceptan letras');
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage('El nombre debe tener mas de 2 caracteres');
      setFullNameError(true);
    } else if (value.length > 24) {
      setFullNameErrorMessage('limite de caracteres 25');
      setFullNameError(true);
    } else {
      setFullNameErrorMessage(null);
      setFullNameError(false);
    }
    setValues(value);
  };
  return [values, handleFullNameChange, fullNameError, setFullNameError, fullNameMesasge, setFullNameErrorMessage];
};

export const useLastName = () => {
  const [values, setValues] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameMesasge, setFullNameErrorMessage] = useState(null);
  const handleFullNameChange = (value) => {
    if (value.length === 0) {
      setFullNameErrorMessage('El Apellido no puede estar vacio');
      setFullNameError(true);
    } else if (!lastNameRegex.test(value)) {
      setFullNameErrorMessage('Solo se aceptan letras');
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage('El Apellido debe tener mas de 2 caracteres');
      setFullNameError(true);
    } else if (value.length > 24) {
      setFullNameErrorMessage('limite de caracteres 25');
      setFullNameError(true);
    } else {
      setFullNameErrorMessage(null);
      setFullNameError(false);
    }
    setValues(value);
  };
  return [values, handleFullNameChange, fullNameError, setFullNameError, fullNameMesasge, setFullNameErrorMessage];
};

export const useCi = () => {
  const [values, setValues] = useState('');
  const [ciError, setCiError] = useState(false);
  const [ciErrorMessage, setCiMessageError] = useState('');
  const handleCiChange = (value) => {
    if (!ciRegex.test(value)) {
      setCiMessageError('Solo se permiten numeros');
      setCiError(true);
    } else if (value.length < 5) {
      setCiMessageError('Debe ser mayor a 5 numeros');
      setCiError(true);
    } else if (value.length > 7) {
      setCiMessageError(sLimitNumber);
      setCiError(true);
    } else {
      setCiMessageError('');
      setCiError(false);
    }
    setValues(value);
  };
  return [values, handleCiChange, ciError, setCiError, ciErrorMessage, setCiMessageError];
};
export const usePhone = () => {
  const [values, setValues] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const handlePhoneChange = (value) => {
    if (!phoneRegex.test(value)) {
      setPhoneErrorMessage('Solo se aceptan numeros');
      setPhoneError(true);
    } else if (value.length < 7) {
      setPhoneErrorMessage('7 numeros como minimo');
      setPhoneError(true);
    } else if (value.length >= 8) {
      setPhoneErrorMessage(sLimitNumber);
      setPhoneError(true);
    } else {
      setPhoneErrorMessage('');
      setPhoneError(false);
    }
    setValues(value);
  };
  return [values, handlePhoneChange, phoneError, setPhoneError, phoneErrorMessage, setPhoneErrorMessage];
};

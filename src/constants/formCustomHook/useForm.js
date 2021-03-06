import { useState } from 'react';
import {
  emailRegex,
  nameRegex,
  lastNameRegex,
  phoneRegex,
  ciRegex,
  nameMateriaRegex,
  ciComplementoRegex
} from '../regexs';
import {
  sLimitNumber,
  sLimitCharacters,
  sMustFollowTheFollowingFormat,
  sTheNameCannotBeEmpty,
  sOnlyLettersAreAccepted,
  sNameMustHaveMoreThan2Characters,
  sCharacterLimit,
  sTheLastNameCannotBeEmpty,
  sMustHaveMoreThan2Characters,
  sCharacterLimit25,
  sOnlyNumbersAreAllowed,
  sMustBeGreaterThanNumbers,
  sNumbersMinimum,
  sLimitNumber1, sOnlyLettersAreAllowed
} from '../strings';

export const useEmail = () => {
  const [values, setValues] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const handleEmailChange = (value) => {
    if (!emailRegex.test(value)) {
      setEmailError(true);
      setEmailMessage(sMustFollowTheFollowingFormat);
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

  const handlePassChange = (value) => {
    if (values.length > 29) {
      setPassMessage(sLimitCharacters);
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassMessage('');
    }
    setValues(value);
  };
  return [values, handlePassChange, passwordError, setPasswordError, passMessage, setPassMessage];
};

export const useFullName = () => {
  const [values, setValues] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameMesasge, setFullNameErrorMessage] = useState(null);
  const handleFullNameChange = (value) => {
    if (value.length === 0) {
      setFullNameErrorMessage(sTheNameCannotBeEmpty);
      setFullNameError(true);
    } else if (!nameRegex.test(value)) {
      setFullNameErrorMessage(sOnlyLettersAreAccepted);
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage(sNameMustHaveMoreThan2Characters);
      setFullNameError(true);
    } else if (value.length > 24) {
      setFullNameErrorMessage(sCharacterLimit25);
      setFullNameError(true);
    } else {
      setFullNameErrorMessage(null);
      setFullNameError(false);
    }
    setValues(value);
  };
  return [values, handleFullNameChange, fullNameError, setFullNameError, fullNameMesasge, setFullNameErrorMessage];
};

export const useDescription = () => {
  const [values, setValues] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameMesasge, setFullNameErrorMessage] = useState(null);
  const handleDescriptionChange = (value) => {
    if (value.length === 0) {
      setFullNameErrorMessage(sTheNameCannotBeEmpty);
      setFullNameError(true);
    } else if (!nameMateriaRegex.test(value)) {
      setFullNameErrorMessage(sOnlyLettersAreAccepted);
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage(sNameMustHaveMoreThan2Characters);
      setFullNameError(true);
    } else if (value.length > 50) {
      setFullNameErrorMessage(sCharacterLimit25);
      setFullNameError(true);
    } else {
      setFullNameErrorMessage(null);
      setFullNameError(false);
    }
    setValues(value);
  };
  return [values, handleDescriptionChange, fullNameError, setFullNameError, fullNameMesasge, setFullNameErrorMessage];
};

export const useFullNameMateria = () => {
  const [values, setValues] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameMesasge, setFullNameErrorMessage] = useState(null);
  const handleFullNameChange = (value) => {
    if (value.length === 0) {
      setFullNameErrorMessage(sTheNameCannotBeEmpty);
      setFullNameError(true);
    } else if (!nameMateriaRegex.test(value)) {
      setFullNameErrorMessage(sOnlyLettersAreAccepted);
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage(sNameMustHaveMoreThan2Characters);
      setFullNameError(true);
    } else if (value.length > 24) {
      setFullNameErrorMessage(sCharacterLimit25);
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
      setFullNameErrorMessage(sTheLastNameCannotBeEmpty);
      setFullNameError(true);
    } else if (!lastNameRegex.test(value)) {
      setFullNameErrorMessage(sOnlyLettersAreAccepted);
      setFullNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setFullNameErrorMessage(sMustHaveMoreThan2Characters);
      setFullNameError(true);
    } else if (value.length > 24) {
      setFullNameErrorMessage(sCharacterLimit25);
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
      setCiMessageError(sOnlyNumbersAreAllowed);
      setCiError(true);
    } else if (value.length < 5) {
      setCiMessageError(sMustBeGreaterThanNumbers.replace('{0}', 5));
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

export const useCiComplemento = () => {
  const [values, setValues] = useState('');
  const [ciError, setCiError] = useState(false);
  const [ciErrorMessage, setCiMessageError] = useState('');
  const handleCiChange = (value) => {
    if (!ciComplementoRegex.test(value)) {
      setCiMessageError(sOnlyLettersAreAllowed);
      setCiError(true);
    } else if (value.length !== 1) {
      setCiMessageError(sLimitNumber1);
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
      setPhoneErrorMessage(sOnlyNumbersAreAllowed);
      setPhoneError(true);
    } else if (value.length < 7) {
      setPhoneErrorMessage(sNumbersMinimum.replace('{0}', 7));
      setPhoneError(true);
    } else if (value.length >= 9) {
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

export const useNameRol = () => {
  const [values, setValues] = useState('');
  const [nameError, setNameError] = useState(false);
  const [fullNameMesasge, setNameErrorMessage] = useState(null);
  const handleNameChange = (value) => {
    if (value.length === 0) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else if (!nameRegex.test(value)) {
      setNameErrorMessage(sOnlyLettersAreAccepted);
      setNameError(true);
    } else if (value.length > 0 && value.length <= 2) {
      setNameErrorMessage(sMustHaveMoreThan2Characters);
      setNameError(true);
    } else if (value.length > 20) {
      setNameErrorMessage(`${sCharacterLimit} 20`);
      setNameError(true);
    } else {
      setNameErrorMessage(null);
      setNameError(false);
    }
    setValues(value);
  };
  return [values, handleNameChange, nameError, setNameError, fullNameMesasge, setNameErrorMessage];
};

export const useAddClassForm= () => {
  const [date,setDate]=useState("");
  const [dateError,setDateError]=useState(false);
  const [dateErrorMesg,setDateErrorMsg] = useState("");

  const handleDateChange=(date)=>{
    const fechaHoy=new Date();
    const fechaMayor=new Date(fechaHoy);
    fechaMayor.setDate(fechaMayor.getDate()+10)

    if(new Date(date)>=fechaHoy&&fechaMayor>=new Date(date)){
      setDateError(false);
      setDateErrorMsg("");
      const fecha=new Date(date);
      setDate(fecha);
    }else{
      setDateError(true);
      setDateErrorMsg("introduzca una fecha valida");
    }
  };
  return [date,handleDateChange,dateError,setDateError,dateErrorMesg,setDateErrorMsg]
};

export const useFiles=()=>{
  const [values, setValues] = useState(null);
  const [fileError,setFileError] = useState(false);
  const [date,setDate]=useState("");
  const [dateError,setDateError]=useState(false);
  const [dateErrorMesg,setDateErrorMsg] = useState("");

  const [fileMessage,setFileMessage] = useState("");
  const [previewSource,setPreviewSource]=useState(null);

  const types = ['application/pdf']
  const preViewFile=(file)=>{
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setPreviewSource(reader.result);
    }
  }
  const handleFileChange = (value) => {

    if(value===false || types.includes(value.type)===false ){
      setFileMessage("Introduzca Formato PDF");
      setFileError(true);
      setPreviewSource(null);
    }
    else{
      setValues(value);
      setFileError(false);
      preViewFile(value);
    }
  }
  const handleDateChange=(value)=>{
      const fechaHoy=new Date();
      const fechaMenor=new Date(fechaHoy);
      fechaMenor.setDate(fechaMenor.getDate()-7)

    if(fechaMenor<=new Date(value)&&new Date(value)<fechaHoy.setDate(fechaHoy.getDate()-1)){
      setDateError(false);
      setDateErrorMsg("");
      setDate(value);
    }else{
      setDateError(true);
      setDateErrorMsg("introduzca una fecha valida");
    }
  }
  return [values,handleFileChange,handleDateChange,fileError,
    setFileError,fileMessage,setFileMessage,previewSource,date,dateError,setDateError,dateErrorMesg,setDateErrorMsg];

};




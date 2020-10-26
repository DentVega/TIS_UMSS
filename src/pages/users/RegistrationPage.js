import React, { useState } from 'react';
import { TextField, Grid, Button,Typography,Container } from '@material-ui/core';
import { useEmail, useFullName, useCi, usePhone } from '../../constants/formCustomHook/useForm';
import { getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import {
  sCancel,
  sCI,
  sConfirm,
  sCreateUser,
  sEmail,
  sLastName,
  sName,
  sPhone,
  sUpdateUser,
} from '../../constants/strings';
import { emailregex } from '../../constants/regexs';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const RegistrationPage = (props) => {
  sessionStorage.setItem("path",props.history.location.pathname);
  const [createUserComplete, setCreateUserComplete] = useState(false);
  const [updateUserComplete, setUpdateUserComplete] = useState(false);
  const [loadCurrentUser, setLoadCurrentUser] = useState(false);
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [
    lastName,
    handleLastNameChange,
    lastNameError,
    setLastNameError,
    lastNameMesasge,
    setLastNameErrorMessage,
  ] = useFullName();
  const [phone, handlePhoneChange, phoneError, setPhoneError, phoneErrorMessage, setPhoneErrorMessage] = usePhone();
  const [email, setEmail, emailError, setEmailError, emailMessage, setEmailMessage] = useEmail();
  const [ci, handleCiChange, ciError, setCiError, ciErrorMessage, setCiMessageError] = useCi();
  const [password, setPassword] = useState('');
  const [idUser, setIdUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const validName = () => {};

  const register = () => {
    registerUser();
  };

  const { userSelected } = props.usersReducer;
  if (userSelected != null && !loadCurrentUser) {
    handleNameChange(userSelected.firstname);
    handleLastNameChange(userSelected.lastname);
    handlePhoneChange(userSelected.phone);
    setEmail(userSelected.email);
    handleCiChange(userSelected.ci);
    setPassword(userSelected.userpassword);
    setIdUser(userSelected.idusers);
    setLoadCurrentUser(true);
  }

  if (createUserComplete || updateUserComplete) {
    props.getUsers();
    props.history.goBack();
  }

  const createPassword = () => {
    return `${name.substring(0, 2)}${lastName.substring(0, 2)}${phone.substring(0, 2)}${email.substring(
      0,
      2,
    )}${ci.substring(0, 2)}`;
  };

  const registerUser = () => {
    BackendConnection.createUser(name, lastName, phone, email, ci, createPassword()).then(() => {
      setOpenDialog(false);
      setCreateUserComplete(true);
    });
  };

  const updateUser = () => {
    BackendConnection.updateUser(idUser, name, lastName, phone, email, ci, password).then(() => {
      setOpenDialog(false);
      setUpdateUserComplete(true);
    });
  };

  const cancel = () => {
    props.changeUserSelected(null);
    props.history.goBack();
  };

  const confirmCreation = () => {
    
    if (!nameError && name.length > 0) {
      if (!lastNameError && lastName.length > 0) {
        if (!phoneError && phone.length > 0) {
          if (!emailError && email.length > 4 && emailregex.test(email)) {
            if (!ciError && ci > 0) {
              setOpenDialog(true);
            } else {
              setCiMessageError('carnet incorrecto');
              setCiError(true);
            }
          } else {
            setEmailMessage('email incorrecto');
            setEmailError(true);
          }
        } else {
          setPhoneErrorMessage('telefono incorrecto');
          setPhoneError(true);
        }
      } else {
        setLastNameErrorMessage('dato incorrecto');
        setLastNameError(true);
      }
    } else {
      setNameErrorMessage('dato incorrecto');
      setNameError(true);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div id={'content-login'} style={{ height: 700 }}>
      <CustomAlertDialog
        title={sConfirm}
        messageText={idUser === null ? 'Confirma la creacion del cliente' : 'Confirma la actualizacion del cliente'}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={idUser === null ? register : updateUser}
      />
      <Container
        style={{  borderRadius: '40px', boxShadow: '0px 10px 10px 0px grey' }}
        
        maxWidth="xs"
        > 

        <Typography  component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid
          container          
          
          direction="column"
          spacing={3}
          >
          <Grid item >
            <TextField
              label={sName}
              type="text"
              value={name}
              onChange={({ target }) => handleNameChange(target.value)}
              error={nameError}
              helperText={nameMesasge}
              autoFocus
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item >
            <TextField
              label={sLastName}
              type="text"
              value={lastName}
              onChange={({ target }) => handleLastNameChange(target.value)}
              error={lastNameError}
              helperText={lastNameMesasge}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label={sPhone}
              type="number"
              value={phone}
              onChange={({ target }) => handlePhoneChange(target.value)}
              error={phoneError}
              helperText={phoneErrorMessage}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>

          <Grid item>
            <TextField
              label={sEmail}
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              error={emailError}
              helperText={emailMessage}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label={sCI}
              type="number"
              value={ci}
              onChange={({ target }) => handleCiChange(target.value)}
              error={ciError}
              helperText={ciErrorMessage}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" type="submit" onClick={cancel}>
              {sCancel}
            </Button>

            <Button variant="contained" color="primary" type="submit" onClick={confirmCreation}>
              {idUser === null ? sCreateUser : sUpdateUser}
            </Button>
          </Grid>
        </Grid>
     
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    usersReducer: state.usersReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  changeUserSelected: (userSelected) => dispatch(changeUserSelected(userSelected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationPage));

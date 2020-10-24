import React, { useState } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { useEmail, useFullName, useCi, usePhone, useLastName } from '../../constants/formCustomHook/useForm';
import { getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { routes } from '../../router/RoutesConstants';
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
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const RegistrationPage = (props) => {
  const { user } = props.userReducer;
  if (user === null) {
    props.history.push(routes.login);
  }

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
  ] = useLastName();
  const [phone, handlePhoneChange, phoneError, setPhoneError, phoneErrorMessage, setPhoneErrorMessage] = usePhone();
  const [email, setEmail, emailError, setEmailError, emailMessage, setEmailMessage] = useEmail();
  const [ci, handleCiChange, ciError, setCiError, ciErrorMessage, setCiMessageError] = useCi();
  const [password, setPassword] = useState('');
  const [idUser, setIdUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const validName = () => {
    const nameValidIsNoEmpty = !nameError && name.length > 0;
    if (!nameValidIsNoEmpty) {
      setNameErrorMessage('El nombre no puede estar vacio');
      setNameError(true);
    }

    const lastNameIsNoEmpty = !lastNameError && lastName.length > 0;
    if (!lastNameIsNoEmpty) {
      setLastNameErrorMessage('El Apellido no puede estar vacio');
      setLastNameError(true);
    }

    const phoneIsNoEmpty = !phoneError && phone.length > 0;
    if (!phoneIsNoEmpty) {
      setPhoneErrorMessage('telefono no puede estar vacio');
      setPhoneError(true);
    }

    const emailIsNoEmpty = !emailError && email.length > 0;
    if (!emailIsNoEmpty) {
      setEmailMessage('email no puede estar vacio');
      setEmailError(true);
    }

    const ciIsNoEmpty = !ciError && ci > 0;
    if (!ciIsNoEmpty) {
      setCiMessageError('no puede estar vacio');
      setCiError(true);
    }

    if (nameValidIsNoEmpty && lastNameIsNoEmpty && phoneIsNoEmpty && emailIsNoEmpty && ci) {
      confirmCreation();
    }
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
    setOpenDialog(true);
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
        handleAccept={idUser === null ? registerUser : updateUser}
      />
      <Grid container autoComplete="off" style={{ minHeight: '100vh' }} alignItems="center" justify="center">
        <Grid
          container
          justify="center"
          direction="column"
          spacing={4}
          style={{ height: '90vh', width: '100vh', borderRadius: '40px', boxShadow: '0px 10px 10px 0px grey' }}>
          <Grid item>
            <Grid item style={{ textAlign: 'center' }}>
              <h2>{sCreateUser}</h2>
            </Grid>
            <TextField
              label={sName}
              type="text"
              value={name}
              onChange={({ target }) => handleNameChange(target.value)}
              error={nameError}
              helperText={nameMesasge}
              autoFocus
            />
          </Grid>
          <Grid item>
            <TextField
              label={sLastName}
              type="text"
              value={lastName}
              onChange={({ target }) => handleLastNameChange(target.value)}
              error={lastNameError}
              helperText={lastNameMesasge}
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
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" type="submit" onClick={cancel}>
              {sCancel}
            </Button>

            <Button variant="contained" color="primary" type="submit" onClick={validName}>
              {idUser === null ? sCreateUser : sUpdateUser}
            </Button>
          </Grid>
        </Grid>
      </Grid>
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

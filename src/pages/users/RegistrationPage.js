import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useEmail, useFullName, useCi, usePhone, useLastName } from '../../constants/formCustomHook/useForm';
import { getRoles, getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { routes } from '../../router/RoutesConstants';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sCI,
  sConfirm, sConfirmTheCreation, sConfirmTheUpdate,
  sCreateUser,
  sEmail,
  sLastName,
  sName,
  sPhone, sTheNameCannotBeEmpty,
  sUpdateUser,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const RegistrationPage = (props) => {
  const { user } = props.userReducer;
  const { roles } = props.rolesReducer;
  const { getRoles } = props;
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
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [roleSelected, setRoleSelected] = useState(1);

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeRol = (event) => {
    setRoleSelected(parseInt(event.target.value));
  };

  const validName = () => {
    const nameValidIsNoEmpty = !nameError && name.length > 0;
    if (!nameValidIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    }

    const lastNameIsNoEmpty = !lastNameError && lastName.length > 0;
    if (!lastNameIsNoEmpty) {
      setLastNameErrorMessage(sTheNameCannotBeEmpty);
      setLastNameError(true);
    }

    const phoneIsNoEmpty = !phoneError && phone.length > 0;
    if (!phoneIsNoEmpty) {
      setPhoneErrorMessage(sTheNameCannotBeEmpty);
      setPhoneError(true);
    }

    const emailIsNoEmpty = !emailError && email.length > 0;
    if (!emailIsNoEmpty) {
      setEmailMessage(sTheNameCannotBeEmpty);
      setEmailError(true);
    }

    const ciIsNoEmpty = !ciError && ci > 0;
    if (!ciIsNoEmpty) {
      setCiMessageError(sTheNameCannotBeEmpty);
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

  const renderSelectRol = () => {
    return (
      <Grid item>
        <Grid container justify="center" direction="column">
          <Grid item>
            <h2>Roles</h2>
          </Grid>
          <Grid item>
            <FormControl component={'fieldset'}>
              <RadioGroup name={'Rol1'} value={roleSelected} onChange={handleChangeRol}>
                {roles.map((rol) => {
                  return (
                    <div key={rol.idroles}>
                      <FormControlLabel control={<Radio />} label={rol.rolename} value={rol.idroles} />
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid container justify="center" direction="column" spacing={4}>
          <Grid item style={{ textAlign: 'center' }}>
            <h2>{sCreateUser}</h2>
          </Grid>
          <Grid item>
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
        </Grid>
      </Grid>
    );
  };

  return (
    <div id={'content-login'} style={{ height: 700 }}>
      <CustomAlertDialog
        title={sConfirm}
        messageText={idUser === null ? sConfirmTheCreation : sConfirmTheUpdate}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={idUser === null ? registerUser : updateUser}
      />
      <CustomAlertDialog
        title={sConfirm}
        messageText={sAreYouSureYourWantCancel}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancel}
      />
      <Grid container direction="column" spacing={4}>
        <Grid item container direction="row">
          {renderForm()}
          {renderSelectRol()}
        </Grid>

        <Grid item style={{ textAlign: 'center' }}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={() => setOpenDialogCancel(true)}>
                {sCancel}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={validName}>
                {idUser === null ? sCreateUser : sUpdateUser}
              </Button>
            </Grid>
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
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getRoles: () => dispatch(getRoles()),
  changeUserSelected: (userSelected) => dispatch(changeUserSelected(userSelected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationPage));

import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  useEmail,
  useFullName,
  useCi,
  usePhone,
  useLastName,
  usePassword,
} from '../../constants/formCustomHook/useForm';
import { getRoles, getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sCI,
  sConfirm,
  sConfirmTheCreation,
  sConfirmTheUpdate,
  sCreateUser,
  sEmail,
  sEmailIsAlreadyInUse,
  sLastName,
  sName,
  sPassword,
  sPhone,
  sTheNameCannotBeEmpty,
  sUpdateUser,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const RegistrationPage = (props) => {
  sessionStorage.setItem('path', props.history.location.pathname);

  const { roles } = props.rolesReducer;
  const { getRoles } = props;

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
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword, passwordError, setPasswordError, passMessage, setPassMessage] = usePassword();
  const [idUser, setIdUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [roleSelected, setRoleSelected] = useState(0);
  const { user } = props.userReducer;

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeRol = (event) => {
    setRoleSelected(parseInt(event.target.value));
  };

  const { userSelected } = props.usersReducer;
  const verifyEmail = () => {
    if (userSelected != null) {
      confirmCreation();
    } else {
      BackendConnection.verifyEmail(email).then((user) => {
        if (user.length === 0) {
          confirmCreation();
        } else {
          setEmailMessage(sEmailIsAlreadyInUse);
          setEmailError(true);
        }
      });
    }
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

    const phoneIsNoEmpty = !phoneError && phone > 0;
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
      verifyEmail();
    }
  };

  const getRol = (idUser) => {
    BackendConnection.getUserRolByIdUser(idUser).then((response) => {
      if(response.length>0){
        console.log('rol selected', response[0])
        setRoleSelected(response[0].idroles);
      }
    });
  };

  if (userSelected != null && !loadCurrentUser) {
    handleNameChange(userSelected.firstname);
    handleLastNameChange(userSelected.lastname);
    handlePhoneChange(userSelected.phone);
    setEmail(userSelected.email);
    handleCiChange(userSelected.ci);
    setPassword(userSelected.userpassword);
    setIdUser(userSelected.idusers);
    setLoadCurrentUser(true);
    setPassword(userSelected.userpassword);
    getRol(userSelected.idusers);
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
    const password = createPassword();
    BackendConnection.createUser(name, lastName, phone, email, ci, password).then((response) => {
      asignRol(response.body.res[0], password);
      let aux = new Date();
      let val = "idusers:" + response.body.res[0] + ",firstname:" + name + ",lastname:" + lastName + ",phone:" + phone
       + ",email:" + email + ",ci:" + ci + ",userpassword:" + password;
      BackendConnection.createUserslog(2, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
        console.log("ok inserted");
      });
    });
  };

  const asignRol = (user, password) => {
    const { idusers } = user;
    BackendConnection.createUserRol(idusers, roleSelected).then(async () => {
      await BackendConnection.sendEmail(email, password);
      setOpenDialog(false);
      setCreateUserComplete(true);
    });
  };

  const updateUser = async () => {
    const userRol = await BackendConnection.getUserRolByIdUser(idUser);
      if(userRol.length>0) await BackendConnection.deleteUserRol(idUser, userRol[0].idroles);
      await BackendConnection.createUserRol(idUser, roleSelected);

      BackendConnection.updateUser(idUser, name, lastName, phone, email, ci, password).then(() => {
        setOpenDialog(false);
        setUpdateUserComplete(true);
      });
      let aux = new Date();
      let val = "idusers:" + idUser + ",firstname:" + userSelected.firstname + ",lastname:" + userSelected.lastname + ",phone:" + userSelected.phone
       + ",email:" + userSelected.email + ",ci:" + userSelected.ci + ",userpassword:" + userSelected.userpassword
       + ",idusers:" + idUser + ",firstname:" + name + ",lastname:" + lastName + ",phone:" + phone
       + ",email:" + email + ",ci:" + ci + ",userpassword:" + password;
      BackendConnection.createUserslog(3, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
        console.log("ok updated");
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
          <Grid item >
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
          {userSelected && (
            <Grid item>
              <TextField
                label={sPassword}
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                error={passwordError}
                helperText={passMessage}
              />
            </Grid>
          )}
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

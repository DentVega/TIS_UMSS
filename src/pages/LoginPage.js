import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import { usePassword, useEmail } from '../constants/formCustomHook/useForm';
import { routes } from '../router/RoutesConstants';
import { changeUser, changeUserRole } from '../redux/actions/index.actions';
import BackendConnection from '../api/BackendConnection';
import { sBadCredentials, sForgotYourPassword, sIncorrectPassword, sInvalidEmail, sLogin } from '../constants/strings';
import { emailRegex } from '../constants/regexs';
import { getRoleFuncs } from '../redux/actions/indexthunk.actions';
import RecoveryPasswordDialog from '../components/dialogs/RecoveryPasswordDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login:{
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}))

const LoginPage = (props) => {
  const classes = useStyles();
  const e = sessionStorage.getItem('email');
  const p = sessionStorage.getItem('password');
  if (e !== null && p !== null) {
    BackendConnection.login(e, p).then((user) => {
      props.changeUser(user[0]);
      BackendConnection.getUserRol(user[0].idusers).then((rol) => {
        props.changeUserRole(rol[0]);
        props.getRoleFun();
      });
      props.history.push(sessionStorage.getItem('path'));
    });
  }
  const [email, setEmail, emailError, setEmailError, emailMessage, setEmailMessage] = useEmail();
  const [password, setPassword, passwordError, setPasswordError, passMessage, setPassMessage] = usePassword();

  const [showERecoveryPass, setShowERecoveryPass] = useState(false);

  const handleLogin = () => {
    if (email.length > 5 && emailRegex.test(email)) {
      login();
    } else {
      setEmailError(true);
      setEmailMessage(sInvalidEmail);
      setPassMessage(sIncorrectPassword);
      setPasswordError(true);
    }
  };

  const login = () => {
    BackendConnection.login(email, password).then((user) => {
      if (user.length > 0) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        props.changeUser(user[0]);
        BackendConnection.getUserRol(user[0].idusers).then((rol) => {
          props.getRoleFun();
          props.changeUserRole(rol[0]);
        });
        props.history.push(routes.home);
      } else {
        setEmailError(true);
        setEmailMessage(sBadCredentials);
      }
    });
  };

  const recuperarPassword = () => {
    setShowERecoveryPass(!showERecoveryPass);
  };

  return (
    <div id={'content-login'} style={{ height: 700 }} className={classes.login}>
      <RecoveryPasswordDialog
        open={showERecoveryPass}
        handleClose={() => setShowERecoveryPass(false)}
      />

      <Grid container alignItems="center" justify="center" style={{ width: '100%', height: '100%' }}>
        <Grid
          container
          direction="column"
          style={{ width: '45vh', borderRadius: '40px', padding: '20px', boxShadow: '0px 10px 10px 0px grey' }}
          justify="center"
          alignItems="center"
          spacing={4}>
          <Grid item>
            <h2>{sLogin}</h2>
          </Grid>
          <Grid item>
            <TextField
              error={emailError}
              id="email"
              label="Email"
              helperText={emailMessage}
              autoComplete="off"
              value={email}
              type="email"
              name="email"
              variant="filled"
              onChange={({ target }) => setEmail(target.value)}
              autoFocus={true}
            />
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="pass"
              label="Password"
              name="password"
              type="password"
              value={password}
              helperText={passMessage}
              variant="filled"
              autoComplete="off"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              {sLogin}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={recuperarPassword}>{sForgotYourPassword}</Button>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeUser: (user) => dispatch(changeUser(user)),
  getRoleFun: () => dispatch(getRoleFuncs()),
  changeUserRole: (rol) => dispatch(changeUserRole(rol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));

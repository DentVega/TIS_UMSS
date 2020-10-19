import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import { usePassword, useEmail } from '../constants/formCustomHook/useForm';
import { routes } from '../router/RoutesConstants';
import { changeUser } from '../redux/actions/index.actions';
import BackendConnection from '../api/BackendConnection';

const LoginPage = (props) => {
  const emailregex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const [email, setEmail, emailError, setEmailError, emailMessage, setEmailMessage] = useEmail();
  const [password, setPassword, passwordError, setPasswordError, passMessage, setPassMessage] = usePassword();

  const handleLogin = () => {
    if (email.length > 5 && emailregex.test(email)) {
      login();
    } else {
      setEmailError(true);
      setEmailMessage('email invalido');
      setPassMessage('contraseña incorrecta');
      setPasswordError(true);
    }
  };

  const login = () => {
    BackendConnection.login(email, password).then((user) => {
      if (user.length > 0) {
        props.changeUser(user[0]);
        props.history.push(routes.home);
      } else {
        setEmailError(true);
        setEmailMessage('Credenciales incorrectas');
      }
    });
  };

  return (
    <div id={'content-login'} style={{ height: 700 }}>
      <Grid container alignItems="center" justify="center" style={{ width: '100%', height: '100%' }}>
        <Grid
          container
          direction="column"
          style={{ width: '45vh', borderRadius: '40px', padding: '20px', boxShadow: '0px 10px 10px 0px grey' }}
          justify="center"
          alignItems="center"
          spacing={4}>
          <Grid item>
            <h2>Iniciar Sesion</h2>
          </Grid>
          <Grid item>
            <TextField
              error={emailError}
              id="filled-error-helper-text"
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
              id="filled-error-helper-text"
              label="Password"
              name="password"
              type="password"
              value={password}
              helperText={passMessage}
              variant="filled"
              autoComplete="off"
              onChange={setPassword}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Iniciar Sesion
            </Button>
          </Grid>
          <Grid item>
            <Button>olvido su contraseña?</Button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));

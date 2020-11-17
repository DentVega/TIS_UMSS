import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { emailRegex } from '../../constants/regexs';
import BackendConnection from '../../api/BackendConnection';

function RecoveryPasswordDialog(props) {
  const [email, setEmail] = useState('');
  const [showERecoveryPass, setShowERecoveryPass] = useState(false);
  const [emailNoRegister, setEmailNoRegister] = useState(false);
  const { open, handleClose } = props;

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const recoveryPassword = () => {
    if (email.length > 5 && emailRegex.test(email)) {
      BackendConnection.verifyEmail(email).then((user) => {
        console.log('user', user);
        if (user.length >= 1) {
          const { email, userpassword } = user[0];
          BackendConnection.sendEmail(email, userpassword)
            .then(() => {
              setEmailNoRegister(false);
              handleClose();
            });
        } else {
          setEmailNoRegister(true);
        }
      });
      setShowERecoveryPass(false);
    } else {
      setShowERecoveryPass(true);
      setEmailNoRegister(false);
    }
  };

  return (
    <div>
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Recuperar Contraseña</DialogTitle>
    <DialogContent>
      <TextField
        id="email-user"
        label="Email"
        value={email}
        onChange={({ target }) => handleChangeEmail(target.value)}
      />
      {showERecoveryPass && <h4>Ingrese su email</h4>}
      {emailNoRegister && <h4>Email no registrado</h4>}
    </DialogContent>
    <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={recoveryPassword} color="primary" autoFocus>
            Aceptar
          </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
}

export default RecoveryPasswordDialog;

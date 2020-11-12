import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserslogs, getUsers } from '../../redux/actions/indexthunk.actions';
import { Button, Grid, TextField } from '@material-ui/core';

function UserslogViewPage(props) {
  sessionStorage.setItem("path", props.history.location.pathname);
  const { userslogs, loading } = props.userslogsReducer;
  const { users } = props.usersReducer;
  //const [selected, changeSelected] = useState([]);
  let val = sessionStorage.getItem("path");
  let id = val.charAt(val.length -  1);

  const getSelected = (id) => {
    if(userslogs.length > 0){
      return userslogs.filter((it) => it.iduserslog === id);
    }
   }

  const getUser = (id) => {
    if(users.length > 0){
      return users.filter((it) => it.idusers === id);
    }
  }

  const getDate = (date) => {
    let val = "";
    for(let i = 0; i < 10; i++){
      val += date.charAt(i);
    }
    return val;
  }

  const show = () => {
    let log = getSelected(id);
    let usr = getUser(log[0].users_idusers);
    let val = "El usuario realizo la transaccion de " + getTransaction(log[0].transaction_idtransaction);
    return (
      <div>
        <h1>{val}</h1>
        <h2>Nombre del usuario: {usr[0].firstname} {usr[0].lastname}</h2>
        <h2>Correo del usuario: {usr[0].email}</h2>
        <h2>Fecha: {getDate(log[0].datechange)}  Hora: {log[0].timechange}</h2>
        <h2>Datos de la tabla: </h2>
        <p>{log[0].state}</p>
        <Grid item style={{ textAlign: 'center' }}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Aceptar
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Rechazar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  useEffect(() => {
    if (loading) {
      props.getUserslogs();
      props.getUsers();
    }
  });

  return (
    <div>
      <h1>Reporte</h1>
      {userslogs.length > 0 && show()}
    </div>
  );
}

const getTransaction = (id) => {
  if(id === 1){
    return "DELETE";
  }else{
    if(id === 2){
      return "UPDATE";
    }else{
      return "INSERT";
    }
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    usersReducer: state.usersReducer,
    userslogsReducer: state.userslogsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getUserslogs: () => dispatch(getUserslogs()),
  getTransaction: () => dispatch(getTransaction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserslogViewPage));

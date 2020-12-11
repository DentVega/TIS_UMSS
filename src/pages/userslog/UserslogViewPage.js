import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserslogs, getUsers } from '../../redux/actions/indexthunk.actions';
import { Button, Grid } from '@material-ui/core';
import BackendConnection from '../../api/BackendConnection';

function UserslogViewPage(props) {
  sessionStorage.setItem("path", props.history.location.pathname);
  const { userslogs, loading } = props.userslogsReducer;
  const [log, setLog] = useState([]);
  const [usr, setUsr] = useState([]);
  const { users } = props.usersReducer;
  const { id } = props.match.params;

  const getSelected = (id) => {
    if(userslogs.length > 0 && log.length <= 0){
      setLog(userslogs.filter((it) => it.iduserslog == id));
    }
   }

  const acceptUserlog = () => {
    BackendConnection.updateUserslog(id, log[0].transaction_idtransaction, log[0].users_idusers, log[0].timechange, log[0].datechange, log[0].state, 1)
    .then((res)=>{
      console.log("Accepted");
      props.history.goBack();
    }).catch((err)=>console.warn(err));
  }

  const rejectUserlog = () => {
    BackendConnection.rejectUserlog(log[0].transaction_idtransaction, log[0].state)
    .then((res)=>{
      console.log("Rejected");
    }).catch((err)=>console.warn(err));
    acceptUserlog();
  }

  const getUser = (id) => {
    if(users.length > 0 && usr.length <= 0){
      setUsr(users.filter((it) => it.idusers == id));
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
    getSelected(id);
    if(log.length > 0){
      getUser(log[0].users_idusers);
      if(usr.length > 0){
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
                 <Button variant="contained" color="primary" type="submit" onClick = {acceptUserlog}>
                  Aceptar
                 </Button>
              </Grid>

               <Grid item>
                 <Button variant="contained" color="primary" type="submit" onClick = {rejectUserlog}>
                  Rechazar
                 </Button>
               </Grid>
              </Grid>
           </Grid>
         </div>
       )
      }
    }
    
  }

  useEffect(() => {
      props.getUserslogs();
      props.getUsers();
  }, []);

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
    if(id === 3){
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

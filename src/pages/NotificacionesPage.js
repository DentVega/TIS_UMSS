import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeGrupo, changeGrupoHorario, updateNotifications } from '../redux/actions/index.actions';
import {
  getGrupoHorariosBackend,
  getGruposBackend,
  getNumberNotificationsByUser
} from '../redux/actions/indexthunk.actions';
import BackendConnection from '../api/BackendConnection';
import CardItem from '../components/CardItem';
import { Button, Grid } from '@material-ui/core';

function NotificacionesPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { user } = props.userReducer;
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    BackendConnection.getNotificactionByIdUser(user.idusers)
      .then(notificaciones => {
        setNotificaciones(notificaciones);
      });
  };

  const cleanNotifications = async () => {
    console.log('cleanNotifications');
    await BackendConnection.deleteNotificactionByIdUser(user.idusers);
    loadData();
    props.updateNotifications();
    props.getNumberNotificationsByUser(user.idusers);
  };

  return (
    <div>
      <Grid container direction={'row'} alignItems={'center'} spacing={2}>
        <Grid item>
          <h1>Notificaciones</h1>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" type="submit" onClick={cleanNotifications}>
            Borrar notificaciones
          </Button>
        </Grid>
      </Grid>
      <div>
        {notificaciones.map((notificacion) => {
          return (
            <div key={notificacion.idnotificaciones}>
              <CardItem text={notificacion.mensaje} secondaryText={notificacion.dia}/>
              <div style={{ height: 10 }}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    grupoReducer: state.grupoReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGrupo: (grupo) => dispatch(changeGrupo(grupo)),
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
  updateNotifications: () => dispatch(updateNotifications()),
  getNumberNotificationsByUser: (idUser) => dispatch(getNumberNotificationsByUser(idUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificacionesPage));

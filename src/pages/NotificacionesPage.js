import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeGrupo, changeGrupoHorario } from '../redux/actions/index.actions';
import { getGrupoHorariosBackend, getGruposBackend } from '../redux/actions/indexthunk.actions';
import BackendConnection from '../api/BackendConnection';
import CardItem from '../components/CardItem';

function NotificacionesPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { user } = props.userReducer;
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    BackendConnection.getNotificactionByIdUser(user.idusers)
      .then(notificaciones => {
        setNotificaciones(notificaciones);
      });

    return () => {
      BackendConnection.deleteNotificactionByIdUser(user.idusers);
    };
  }, [user]);

  return (
    <div>
      <h1>Notificaciones</h1>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificacionesPage));

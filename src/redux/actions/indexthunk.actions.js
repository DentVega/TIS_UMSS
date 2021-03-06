import {
  changeCarreras,
  changeRoles,
  changeSchools,
  changeUsers,
  changeRoleFuncs,
  changeMaterias,
  changeHorarios,
  changeUserslogs,
  changeGrupoHorarios,
  changeGrupos, 
  changeNumberNotifications,
  changeUsersRole
} from './index.actions';

import BackendConnection from '../../api/BackendConnection';

export const getRoles = () => {
  return (dispatch) => {
    BackendConnection.getRoles().then((roles) => {
      dispatch(changeRoles(roles));
    });
  };
};
export const getUsersRol = () => {
  return (dispatch) => {
    BackendConnection.getAllUsersRol().then((usersRol) => {
      dispatch(changeUsersRole(usersRol));
    });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    BackendConnection.getUsers()
      .then((users) => {
        console.log('users', users)
        dispatch(changeUsers(users));
      })
      .catch((e) => {
        console.warn(e.message);
      });
  };
};

export const getUserslogs = () => {
  return (dispatch) => {
    BackendConnection.getUserslogs()
      .then((userslogs) => {
        dispatch(changeUserslogs(userslogs));
      })
      .catch((e) => {
        console.warn(e.message);
      });
  };
};
export const getSchools = () => {
  return (dispatch) => {
    BackendConnection.getSchools()
      .then((schools) => {
        dispatch(changeSchools(schools));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getCarreras = () => {
  return (dispatch) => {
    BackendConnection.getCarreras()
      .then((carreras) => {
        dispatch(changeCarreras(carreras));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getRoleFuncs = () => {
  return (dispatch) => {
    BackendConnection.getRoleFuncs()
      .then((RoleFuncs) => {
        dispatch(changeRoleFuncs(RoleFuncs));
      })
      .catch((e) => {
        console.warn(e.message);
      });
  };
};

export const getHorariosBackend = () => {
  return (dispatch) => {
    BackendConnection.getHorarios()
      .then((horarios) => {
        dispatch(changeHorarios(horarios));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getMateriasBackend = () => {
  return (dispatch) => {
    BackendConnection.getMaterias()
      .then((materias) => {
        dispatch(changeMaterias(materias));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getGrupoHorariosBackend = () => {
  return (dispatch) => {
    BackendConnection.getGrupoHorarios().then((grupoHorarios) => {
      dispatch(changeGrupoHorarios(grupoHorarios));
    });
  };
};

export const getGruposBackend = () => {
  return (dispatch) => {
    BackendConnection.getGrupos().then((grupos) => {
      dispatch(changeGrupos(grupos));
    });
  };
};

export const getNumberNotificationsByUser = (idUser) => {
  return (dispatch) => {
    BackendConnection.getNotificactionByIdUser(idUser)
      .then(notificaciones => {
        if (notificaciones && notificaciones.length > 0) {
          dispatch(changeNumberNotifications(notificaciones.length));
        } else {
          dispatch(changeNumberNotifications(0));
        }
      });
  };
};

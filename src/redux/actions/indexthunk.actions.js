import { changeCarreras, changeRoles, changeSchools, changeUsers } from './index.actions';
import BackendConnection from '../../api/BackendConnection';

export const getRoles = () => {
  return (dispatch) => {
    BackendConnection.getRoles().then((roles) => {
      dispatch(changeRoles(roles));
    });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    BackendConnection.getUsers()
      .then((users) => {
        dispatch(changeUsers(users));
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
        console.log(e)
      });
  };
};

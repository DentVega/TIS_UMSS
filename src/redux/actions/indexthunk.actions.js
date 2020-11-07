import { changeRoles, changeUsers, changeUserslogs } from './index.actions';
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
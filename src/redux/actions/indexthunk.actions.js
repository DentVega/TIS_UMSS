import { changeRoles, changeUsers } from './index.actions';
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
    BackendConnection.getUsers().then((users) => {
      dispatch(changeUsers(users));
    });
  };
};

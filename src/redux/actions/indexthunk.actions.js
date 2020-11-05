import { changeRoles, changeUsers, changeRoleFuncs } from './index.actions';
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


export const getRoleFuncs = () =>{
  return (dispatch) =>{
    BackendConnection.getRoleFuncs()
      .then(RoleFuncs=>{
        dispatch(changeRoleFuncs(RoleFuncs));
      })
      .catch((e) =>{ 
        console.warn(e.message)
      })
  }
}
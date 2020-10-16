import { changeRoles } from './index.actions';
import { rolesMock } from '../../constants/mockData';

export const getRoles = () => {
  return (dispatch) => {
    dispatch(changeRoles(rolesMock));
  };
};

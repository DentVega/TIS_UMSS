import * as actions from './actions';

export const changeTabIndex = (index) => {
  return { type: actions.CHANGE_TAB_INDEX, index };
};

export const cleanAllReducers = () => {
  return { type: actions.CLEAN_ALL_REDUCERS };
};

export const openDrawer = () => {
  return { type: actions.OPEN_DRAWER };
};

export const changeUser = (user) => {
  return { type: actions.CHANGE_USER, user };
};

export const changeRoles = (roles) => {
  return { type: actions.CHANGE_ROLES, roles };
};

export const changeRole = (role) => {
  return { type: actions.CHANGE_ROLE, role };
};

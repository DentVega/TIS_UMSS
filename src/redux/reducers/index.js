import configReducer from './config.reducer';
import appReducer from './app.reducer';
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import rolesReducer from './roles.reducer';
import usersReducer from './users.reducer';
import userslogsReducer from './userslogs.reducer';

export default combineReducers({
  configReducer: configReducer,
  app: appReducer,
  userReducer: userReducer,
  rolesReducer: rolesReducer,
  usersReducer: usersReducer,
  userslogsReducer: userslogsReducer,
});

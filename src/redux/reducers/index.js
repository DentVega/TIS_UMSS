import configReducer from './config.reducer';
import appReducer from './app.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  configReducer: configReducer,
  app: appReducer,
});

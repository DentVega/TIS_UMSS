import configReducer from './config.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  configReducer: configReducer,
});

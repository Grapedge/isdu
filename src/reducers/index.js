import { combineReducers } from 'redux';
import auth from './authentication';
import course from './course';
import bus from './bus';
import user from './user';

export default combineReducers({
  auth,
  course,
  bus,
  user
});

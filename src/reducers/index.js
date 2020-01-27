import { combineReducers } from 'redux';
import auth from './authentication';
import course from './course';
import bus from './bus';
import user from './user';
import news from './news';
import newsDetail from './news_detail';

export default combineReducers({
  auth,
  course,
  bus,
  user,
  news,
  newsDetail
});

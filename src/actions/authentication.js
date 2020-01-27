import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '@/constants/authentication';
import { request } from '@/api/network/request';
import { LOGIN_URL } from '@/constants/fetch_url';
import { setStuID, setPassword } from '@/api/data/user';
import { makeActionCreator } from './makeActionCreator';

export const loginRequest = makeActionCreator(LOGIN_REQUEST);
export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'payload');
export const loginError = makeActionCreator(LOGIN_ERROR, 'payload');

export const login = (stuID, password) => dispatch => {
  dispatch(loginRequest());
  return request({
    url: LOGIN_URL,
    method: 'post',
    data: { u: stuID, p: password }
  }).then(
    res => {
      if (res.code === 0) {
        // 登录成功
        setStuID(stuID);
        setPassword(password);
        dispatch(loginSuccess({ stuID, token: res.data[0], password }));
      } else {
        // 登录失败
        dispatch(loginError(res.data));
      }
      return res;
    },
    err => {
      dispatch(loginError((err && err.errMsg) || ''));
      return {
        code: -1024,
        data: err.errMsg
      };
    }
  );
};

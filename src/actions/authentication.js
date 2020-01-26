import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '@/constants/authentication';
import { request } from '@/api/network/request';
import { LOGIN_URL } from '@/constants/fetch_url';
import { setStuID, setPassword } from '@/api/data/user';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = ({ stuID, token, password }) => {
  setStuID(stuID);
  setPassword(password);
  return {
    type: LOGIN_SUCCESS,
    payload: { stuID, token }
  };
};

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
});

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

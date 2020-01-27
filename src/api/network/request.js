import Taro from '@tarojs/taro';
import { AUTH_FAIL_CODE, LOGIN_SUCCESS } from '@/constants/authentication';
import { login } from '@/actions/authentication';
import { getStuID, getPassword } from '../data/user';
import store from '../../store/index';

/**
 * 发送网络请求简写方法，使用同Taro.request
 * @param {*} params
 */
export const request = params => {
  return Taro.request({
    ...params,
    header: {
      ...params.header,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data);
};

/**
 * 防止Token失效的网络请求
 * @param {*} params request params
 * @param {*} redux {dispatch, getState}
 */
export const authRequest = async (params, count = 0) => {
  const { dispatch, getState } = store;
  const { token } = getState().auth.data;
  const res = await request({
    ...params,
    header: {
      ...params.header,
      Token: token
    }
  });

  if (res.code === AUTH_FAIL_CODE) {
    if (count >= 1) {
      Taro.redirectTo({ url: '/pages/login/login' });
      throw '401: 身份认证失败';
    }
    // Token 过期，重新登录
    await dispatch(login(getStuID(), getPassword()));
    if (getState().auth.status === LOGIN_SUCCESS) {
      // 登录成功
      return authRequest(params, count + 1);
    }
  }
  return res;
};

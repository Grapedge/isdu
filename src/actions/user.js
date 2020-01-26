import { USER_URL } from '@/constants/fetch_url';
import { request, authRequest } from '@/api/network/request';
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from '@/constants/user';

export const userRequest = () => ({
  type: USER_REQUEST
});

export const userSuccess = data => ({
  type: USER_SUCCESS,
  payload: data
});

export const userError = error => ({
  type: USER_ERROR,
  payload: error
});

export const userInfo = () => (dispatch, getState) => {
  dispatch(userRequest());
  return authRequest(
    {
      url: USER_URL
    },
    { dispatch, getState }
  ).then(
    res => {
      if (res.code === 0) {
        dispatch(userSuccess(res.data));
      } else {
        dispatch(userError(res.data));
      }
    },
    err => {
      dispatch(userError(err.errMsg));
    }
  );
};

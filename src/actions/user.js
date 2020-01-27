import { USER_URL } from '@/constants/fetch_url';
import { authRequest } from '@/api/network/request';
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from '@/constants/user';

const userInfo = () => {
  return {
    types: [USER_REQUEST, USER_SUCCESS, USER_ERROR],
    shouldCallAPI: state => Object.keys(state.user.data).length === 0,
    callAPI: () =>
      authRequest({
        url: USER_URL
      })
  };
};

export default userInfo;

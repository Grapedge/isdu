import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '@/constants/authentication';

const initialState = {
  status: LOGOUT,
  error: '',
  data: {
    stuID: '',
    token: ''
  }
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        status: LOGIN_REQUEST
      };
    case LOGIN_SUCCESS:
      const { stuID, token } = action.payload;
      return {
        ...state,
        status: LOGIN_SUCCESS,
        data: {
          stuID,
          token
        }
      };
    case LOGIN_ERROR:
      return {
        ...state,
        status: LOGIN_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

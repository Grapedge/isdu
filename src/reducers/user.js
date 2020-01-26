import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from "@/constants/user";


// 课表
const initialState = {
  status: '',
  error: '',
  data: []
};

export default function course(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        status: USER_REQUEST
      };
    case USER_SUCCESS:
      return {
        ...state,
        status: USER_SUCCESS,
        data: action.payload
      };
    case USER_ERROR:
      return {
        ...state,
        status: USER_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

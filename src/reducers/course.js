import {
  COURSE_REQUEST,
  COURSE_SUCCESS,
  COURSE_ERROR
} from '@/constants/course';

// 课表
const initialState = {
  status: '',
  error: '',
  data: []
};

export default function course(state = initialState, action) {
  switch (action.type) {
    case COURSE_REQUEST:
      return {
        ...state,
        status: COURSE_REQUEST
      };
    case COURSE_SUCCESS:
      return {
        ...state,
        status: COURSE_SUCCESS,
        data: action.payload
      };
    case COURSE_ERROR:
      return {
        ...state,
        status: COURSE_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

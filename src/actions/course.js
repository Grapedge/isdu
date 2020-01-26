import {
  COURSE_REQUEST,
  COURSE_SUCCESS,
  COURSE_ERROR
} from '@/constants/course';
import { getCourseSchedule, setCourseSchedule } from '@/api/data/course';
import { authRequest } from '@/api/network/request';
import { COURSE_URL } from '@/constants/fetch_url';

// 课表action

export const courseRequest = () => ({
  type: COURSE_REQUEST
});

export const courseSuccess = schedule => {
  // 存储课表
  setCourseSchedule(schedule);
  return {
    type: COURSE_SUCCESS,
    payload: schedule
  };
};

export const courseError = errror => ({
  type: COURSE_ERROR,
  payload: errror
});

export const courseSchedule = () => async (dispatch, getState) => {
  dispatch(courseRequest());
  let schedule = getCourseSchedule();
  if (schedule) {
    dispatch(courseSuccess(schedule));
    return schedule;
  } else {
    // 发送网络请求
    try {
      const res = await authRequest(
        { url: COURSE_URL },
        { dispatch, getState }
      );
      schedule = res.data.map(v => ({
        ...v,
        courseWeeks: JSON.parse(v.courseWeeks)
      }));
      dispatch(courseSuccess(schedule));
      return schedule;
    } catch (e) {
      dispatch(courseError(e));
    }
  }
  return null;
};

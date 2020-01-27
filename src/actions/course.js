import {
  COURSE_REQUEST,
  COURSE_SUCCESS,
  COURSE_ERROR
} from '@/constants/course';
import { getCourseSchedule, setCourseSchedule } from '@/api/data/course';
import { authRequest } from '@/api/network/request';
import { COURSE_URL } from '@/constants/fetch_url';
import { makeActionCreator } from './makeActionCreator';

// 课表action

export const courseRequest = makeActionCreator(COURSE_REQUEST);

export const courseSuccess = makeActionCreator(COURSE_SUCCESS, 'payload');

export const courseError = makeActionCreator(COURSE_ERROR, 'payload');

export const courseSchedule = () => async (dispatch, getState) => {
  if (getState().course.status === COURSE_SUCCESS) return;
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
      setCourseSchedule(schedule);
      dispatch(courseSuccess(schedule));
      return schedule;
    } catch (e) {
      dispatch(courseError(e));
    }
  }
  return null;
};

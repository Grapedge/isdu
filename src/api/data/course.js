import Taro from '@tarojs/taro';
import { COURSE_SCHEDULE } from '@/constants/data';

export const setCourseSchedule = schedule =>
  Taro.setStorageSync(COURSE_SCHEDULE, schedule);

export const getCourseSchedule = () => Taro.getStorageSync(COURSE_SCHEDULE);

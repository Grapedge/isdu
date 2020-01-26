import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Auth from '@/components/user/Auth';
import Course from './course';

export default function CourseIndex() {
  return (
    <Auth>
      <Course />
    </Auth>
  );
}
CourseIndex.config = {
  navigationBarTitleText: '课表'
};

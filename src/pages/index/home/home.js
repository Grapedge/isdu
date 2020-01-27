import Taro, { useCallback, useEffect } from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import { AtGrid, AtList, AtListItem } from 'taro-ui';
import courseTableImg from '@/images/course_table.svg';
import libraryImg from '@/images/library.svg';
import bugImg from '@/images/bus.svg';
import calendarImg from '@/images/calendar.svg';
import arrangementImg from '@/images/arrangement.svg';
import classroomImg from '@/images/classroom.svg';
import scoresImg from '@/images/scores.svg';
import cardImg from '@/images/card.svg';
import swiper1Img from '@/images/swiper1.jpg';
import swiper2Img from '@/images/swiper2.jpg';
import swiper3Img from '@/images/swiper3.jpg';
import { useDispatch, useSelector } from '@tarojs/redux';
import { courseSchedule } from '@/actions/course';
import {
  COURSE_REQUEST,
  COURSE_ERROR,
  COURSE_SUCCESS
} from '@/constants/course';

import './home.scss';
import { getCurWeek } from '@/api/util/time';

const firstWeekDate = new Date(2020, 1, 17);
// 主页
export default function Home() {
  const onClickGrid = useCallback((_value, index) => {
    switch (index) {
      case 0:
        Taro.navigateTo({
          url: '/pages/course/index'
        });
        break;
      case 2:
        Taro.navigateTo({
          url: '/pages/bus/bus'
        });
        break;
      case 3:
        Taro.navigateTo({
          url: '/pages/calendar/calendar'
        });
        break;
      case 6:
        Taro.navigateTo({
          url: '/pages/scores/scores'
        });
        break;
      case 7:
        Taro.showModal({
          title: '提示',
          content: '校园卡功能维护中...',
          showCancel: false
        });
        break;
      default:
        Taro.showToast({
          title: '功能暂未实现',
          icon: 'none',
          duration: 2000
        });
    }
  }, []);
  const course = useSelector(state => state.course);
  const getTodayCourse = useCallback((data, curWeek, curDay) => {
    const res = data
      .filter(
        value =>
          value.courseWeekday === curDay &&
          value.courseWeeks.indexOf(curWeek + 1) >= 0
      )
      .sort((a, b) => a.courseOrder - b.courseOrder);
    if (res.length === 0) {
      return [
        {
          startTime: '',
          courseName: '今日无课',
          courseLocation: '...'
        }
      ];
    } else return res;
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(courseSchedule());
  }, [dispatch]);
  const week = getCurWeek(firstWeekDate);
  return (
    <View>
      {/* 滚动广告区域 */}
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        interval={5000}
        autoplay
      >
        <SwiperItem>
          <Image src={swiper1Img} className='swiper' />
        </SwiperItem>
        <SwiperItem>
          <Image src={swiper2Img} className='swiper' />
        </SwiperItem>
        <SwiperItem>
          <Image src={swiper3Img} className='swiper' />
        </SwiperItem>
      </Swiper>
      {/* 功能区域 */}
      <AtGrid
        columnNum={4}
        data={[
          {
            image: courseTableImg,
            value: '课表'
          },
          {
            image: libraryImg,
            value: '图书馆'
          },
          {
            image: bugImg,
            value: '校车'
          },
          {
            image: calendarImg,
            value: '校历'
          },
          {
            image: arrangementImg,
            value: '考试'
          },
          {
            image: classroomImg,
            value: '自习室'
          },
          {
            image: scoresImg,
            value: '成绩'
          },
          {
            image: cardImg,
            value: '校园卡'
          }
        ]}
        onClick={onClickGrid}
      />
      <Text className='tip-bar mb-1'>今日课程</Text>
      <AtList className='mb-2'>
        {course.status === COURSE_REQUEST ? (
          <AtListItem title='加载中...' />
        ) : course.status === COURSE_ERROR ? (
          <AtListItem title='加载失败' />
        ) : course.status === COURSE_SUCCESS ? (
          getTodayCourse(
            course.data,
            week + 1,
            new Date().getDay() + 1
          ).map(v => (
            <AtListItem
              title={`${v.startTime} ${v.courseName.substr(0, 6)}...@${
                v.courseLocation
              }`}
              key={`${v.courseWeekday}-${v.courseOrder}-${v.courseName}`}
            />
          ))
        ) : null}
      </AtList>
      <View className='mb-1'></View>
      <Text className='tip-bar mb-1'>最新资讯</Text>
      <AtList>
        <AtListItem title='功能暂未实现' />
      </AtList>
    </View>
  );
}

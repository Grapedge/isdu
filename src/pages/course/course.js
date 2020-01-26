import Taro, { useState, useEffect, useCallback, useRef } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import { useSelector } from '@tarojs/redux';
import {
  COURSE_SUCCESS,
  COURSE_ERROR,
  COURSE_REQUEST
} from '@/constants/course';

import './course.scss';
import { getCurWeek } from '@/api/util/time';

const colorMap = [
  '#5DADE2',
  '#1ABC9C',
  '#F4D03F',
  '#EC7063',
  '#EB984E',
  '#8E44AD'
];

const firstWeekDate = new Date(2020, 1, 17);
/**
 * 主页
 */
function Course() {
  const course = useSelector(state => state.course);

  // 将100以内的数字转换成中文读法
  const digitalToWeek = useCallback(dig => {
    const map = [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十'
    ];
    if (dig < 10) {
      return map[dig];
    } else if (dig === 10) {
      return map[10];
    } else if (dig % 10 === 0) {
      return map[dig / 10] + map[10];
    } else if (dig < 20) {
      return map[10] + map[dig % 10];
    } else return map[Math.floor(dig / 10)] + map[10] + map[dig % 10];
  }, []);

  // 一共有几周数据
  const [weekRange, setWeekRange] = useState(['第一周']);
  const getMaxWeek = useCallback(
    data =>
      data.length === 0
        ? 1
        : data
            .map(v => v.courseWeeks[v.courseWeeks.length - 1])
            .reduce((a, b) => Math.max(a, b)),
    []
  );
  // 选择第几周
  const week = getCurWeek(firstWeekDate);
  const [curWeek, setCurWeek] = useState(week < 0 ? 0 : week);
  const onChangeWeek = useCallback(e => {
    setCurWeek(parseInt(e.detail.value));
  }, []);

  /**
   * 计算得到本周二维课表
   */
  const getCurWeekSchedule = useCallback(
    data => {
      const hashCode = s =>
        s.split('').reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0);

      const schedule = data.filter(
        value => value.courseWeeks.indexOf(curWeek + 1) >= 0
      );

      const res = new Array(5)
        .fill(0)
        .map(() =>
          new Array(7).fill(0).map(() => ({ title: '', bgColor: '#fff' }))
        );

      for (const x of schedule) {
        const code = hashCode(x.courseName);
        res[x.courseOrder - 1][x.courseWeekday - 1] = {
          title: x.courseName.substr(0, 6) + '@' + x.courseLocation,
          bgColor:
            colorMap[
              ((code % colorMap.length) + colorMap.length) % colorMap.length
            ]
        };
      }
      return res;
    },
    [curWeek]
  );
  const schedule = getCurWeekSchedule(course.data);
  // 显示周几
  const dateRef = useRef(
    new Array(7).fill(0).map((v, i) => digitalToWeek(i + 1))
  );
  // 显示第几节课
  const periodRef = useRef(new Array(5).fill(0).map((v, i) => i + 1));

  useEffect(() => {
    setWeekRange(
      new Array(getMaxWeek(course.data))
        .fill(0)
        .map((v, i) => `第${digitalToWeek(i + 1)}周`)
    );
  }, [course.data, digitalToWeek, getMaxWeek]);
  return (
    <View className='app-cntr'>
      {/* 选择第几周 */}
      <Picker
        mode='selector'
        range={weekRange}
        onChange={onChangeWeek}
        className='time-picker'
      >
        <View className='title mb-1'>{weekRange[curWeek]}</View>
      </Picker>
      {/* 课表区域 */}
      <View className='course-schedule'>
        {/* 显示周几 */}
        <View className='week-bar'>
          {dateRef.current.map(v => (
            <View className='date' key={v}>
              {v}
            </View>
          ))}
        </View>
        {/* 两栏，左侧为显示第几节，右侧为课表区域 */}
        <View className='course-two-part'>
          {/* 显示数字1-5 */}
          <View className='period'>
            {periodRef.current.map(v => (
              <View className='digit' key={v}>
                {v}
              </View>
            ))}
          </View>
          {/* 显示课表区域 */}
          <View className='table'>
            {course.status === COURSE_REQUEST ? (
              <AtActivityIndicator content='加载中...' mode='center' />
            ) : course.status === COURSE_ERROR ? (
              <View>加载出错...</View>
            ) : course.status === COURSE_SUCCESS ? (
              new Array(5).fill(0).map((v, i) => (
                <View key={i + v} className='at-row at-row__align--center '>
                  {schedule[i].map((u, j) => (
                    <View
                      key={u + j}
                      className='at-col at-col--wrap'
                      style={{ backgroundColor: u.bgColor }}
                    >
                      {u.title}
                    </View>
                  ))}
                </View>
              ))
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

Course.options = {
  addGlobalClass: true
};
export default Course;

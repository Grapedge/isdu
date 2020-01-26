import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTimeline } from 'taro-ui';
import './calendar.scss';

export default function Calendar() {
  return (
    <View>
      <AtTimeline
        className='.calendar'
        pending
        items={[
          { title: '2月' },
          {
            title: '14号',
            content: ['教职工上班']
          },
          {
            title: '16号',
            content: ['注册'],

            color: 'red'
          },
          {
            title: '17号',
            content: ['正式上课', '第一周']
          },
          {
            title: '24号',
            content: ['第二周']
          },
          { title: '3月' },
          {
            title: '2号',
            content: ['第三周']
          },
          {
            title: '9号',
            content: ['第四周']
          },
          {
            title: '16号',
            content: ['第五周']
          },
          {
            title: '23号',
            content: ['第六周']
          },
          {
            title: '30号',
            content: ['第七周']
          },
          { title: '4月' },
          {
            title: '4号',
            content: ['清明节'],

            color: 'red'
          },
          {
            title: '6号',
            content: ['第八周']
          },
          {
            title: '13号',
            content: ['第九周']
          },
          {
            title: '20号',
            content: ['第十周']
          },
          {
            title: '27号',
            content: ['第十一周']
          },
          { title: '5月' },
          {
            title: '1号',
            content: ['清明节'],

            color: 'red'
          },
          {
            title: '4号',
            content: ['第十二周']
          },
          {
            title: '11号',
            content: ['第十三周']
          },
          {
            title: '18号',
            content: ['第十四周']
          },
          {
            title: '25号',
            content: ['第十五周']
          },
          { title: '6月' },

          {
            title: '1号',
            content: ['十六周']
          },
          {
            title: '8号',
            content: ['第十七周']
          },
          {
            title: '15号',
            content: ['第十八周']
          },
          {
            title: '22号',
            content: ['第十九周']
          },
          {
            title: '25号',
            content: ['端午节'],
            color: 'red'
          },
          {
            title: '29号',
            content: ['第二十周']
          },
          { title: '7月' },

          {
            title: '6号',
            content: ['暑假开始...']
          }
        ]}
      ></AtTimeline>
    </View>
  );
}

Calendar.config = {
  navigationBarTitleText: '校历'
};

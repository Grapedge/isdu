import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtCard, AtActivityIndicator } from 'taro-ui';

import './bus.scss';
import { useSelector } from '@tarojs/redux';
import { BUS_ERROR, BUS_REQUEST, BUS_SUCCESS } from '@/constants/bus';

// 校车查询结果页面
export default function BusResult() {
  const way = useSelector(state => state.bus);
  return (
    <View>
      <View className='mb-2' />
      {way.status === BUS_ERROR ? (
        <View>查询出错</View>
      ) : way.status === BUS_REQUEST ? (
        <AtActivityIndicator mode='center' title='加载中...' />
      ) : way.status === BUS_SUCCESS ? (
        way.data.map(v => {
          return (
            <AtCard title={v.t} key={v} className='mb-1'>
              <View>
                <Text className='strong'>起始：</Text>
                {v.s}
              </View>
              <View>
                <Text className='strong'>经过：</Text>
                {v.p}
              </View>
              <View>
                <Text className='strong'>终点：</Text>
                {v.e}
              </View>
            </AtCard>
          );
        })
      ) : null}
    </View>
  );
}

BusResult.options = {
  addGlobalClass: true
};
BusResult.config = {
  navigationBarTitleText: '查询结果'
};

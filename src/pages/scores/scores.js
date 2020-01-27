import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtCard, AtList, AtListItem } from 'taro-ui';

export default function Scores() {
  const [current, setCurrent] = useState(0);
  const scoresTabList = [{ title: '本学期成绩' }, { title: '历年成绩' }];
  return (
    <View className='app-cntr'>
      <AtTabs
        current={current}
        tabList={scoresTabList}
        onClick={v => setCurrent(v)}
        className='cntr'
      >
        <AtTabsPane current={current} index={0}>
          <View>
            <View className='mb-2' />
            {/* 成绩卡 */}
            <AtCard extra='排名1/32' title='体育（3）'>
              <AtList>
                <AtListItem
                  title='学分：3.0'
                  iconInfo={{ size: 16, color: '#2ECC71', value: 'bookmark' }}
                />
                <AtListItem
                  title='成绩：100'
                  iconInfo={{ size: 16, color: '#2ECC71', value: 'bookmark' }}
                />
              </AtList>
            </AtCard>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>标签页二的内容</View>
        </AtTabsPane>
      </AtTabs>
      {/* 绩点 */}
      <View className='points'>估测绩点：5.1</View>
    </View>
  );
}

Scores.options = {
  addGlobalClass: true
};

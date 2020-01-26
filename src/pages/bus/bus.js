import Taro, { useState, useCallback, useRef } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { AtSwitch, AtButton } from 'taro-ui';
import './bus.scss';
import { useDispatch } from '@tarojs/redux';
import { busInfo } from '@/actions/bus';

const schoolNameMap = [
  '中心',
  '洪家楼',
  '趵突泉',
  '软件园',
  '兴隆山',
  '千佛山'
];

// 校车查询页面
export default function Bus() {
  const dispatch = useDispatch();
  const [firstSchool, setFirstSchool] = useState(-1);
  const [secondSchool, setSecondSchool] = useState(-1);
  const [isWorkDay, setIsWorkDay] = useState(true);
  const queryLoading = useRef(false);
  // 检测用户点击
  const onClickSchool = useCallback(
    index => {
      if (firstSchool === -1) {
        setFirstSchool(index);
      } else if (index === firstSchool) {
        if (secondSchool >= 0) {
          setFirstSchool(secondSchool);
          setSecondSchool(-1);
        } else setFirstSchool(-1);
      } else if (secondSchool === -1) {
        setSecondSchool(index);
      } else if (index === secondSchool) {
        setSecondSchool(-1);
      } else {
        setFirstSchool(index);
        setSecondSchool(-1);
      }
    },
    [firstSchool, secondSchool]
  );
  return (
    <View>
      <View className='at-row at-row--wrap at-row__justify--center'>
        {schoolNameMap.map((v, i) => (
          <View
            className={
              'school-cntr' +
              (i === firstSchool || i === secondSchool ? ' selected' : '')
            }
            key={v}
            onClick={() => onClickSchool(i)}
          >
            <Image
              src='data:image/png;base64,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'
              className='school-icon'
            />
            <Text>{v}校区</Text>
          </View>
        ))}
      </View>

      <View className='tips mb-2'>
        温馨提示：请依次点击校区图标以选择出发地和目的地(查询电话：88395114)订车服务电话：88395765或88392365
      </View>
      <View className='at-row at-row__justify--center at-row--wrap mb-1'>
        <Text>
          从
          {firstSchool === -1 ? ' 未选择 ' : ` ${schoolNameMap[firstSchool]} `}
          校区到
          {secondSchool === -1
            ? ' 未选择 '
            : ` ${schoolNameMap[secondSchool]} `}
          校区
        </Text>
        <AtSwitch
          title={'当前选择：' + (isWorkDay ? '工作日' : '非工作日')}
          checked={isWorkDay}
          onChange={value => setIsWorkDay(value)}
          className='switch mb-2'
        />
        <AtButton
          className='query-btn'
          type='secondary'
          onClick={() => {
            if (queryLoading.current) return;
            if (firstSchool === -1 || secondSchool === -1) {
              Taro.showModal({
                title: '提示',
                content: '请先选择校区！',
                showCancel: false
              });
            } else {
              queryLoading.current = true;
              Taro.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 2000
              });
              dispatch(
                busInfo(
                  schoolNameMap[firstSchool] + '校区',
                  schoolNameMap[secondSchool] + '校区',
                  !isWorkDay
                )
              );
              Taro.navigateTo({ url: '/pages/bus/result' });
              queryLoading.current = false;
            }
          }}
        >
          查询
        </AtButton>
      </View>
    </View>
  );
}

Bus.options = {
  addGlobalClass: true
};
Bus.config = {
  navigationBarTitleText: '校车'
};

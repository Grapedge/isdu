import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';
import { useDispatch } from '@tarojs/redux';
import { login } from '@/actions/authentication';
import { getPassword, getStuID } from '@/api/data/user';
import userInfo from '@/actions/user';
import User from './user/user';
import Home from './home/home';

import './index.scss';

export default function Index() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const stuID = getStuID();
    const password = getPassword();
    if (stuID && password) {
      dispatch(login(stuID, password)).then(() => {
        console.log('dispatch')
        dispatch(userInfo());
      });
    }
  }, [dispatch]);
  return (
    <View className='app-cntr'>
      <View className='cntr'>
        {current === 0 ? null : current === 1 ? (
          <Home />
        ) : current === 2 ? (
          <User />
        ) : null}
      </View>
      <AtTabBar
        tabList={[
          { title: '资讯', iconType: 'list' },
          { title: '主页', iconType: 'home' },
          { title: '个人中心', iconType: 'user' }
        ]}
        current={current}
        onClick={v => setCurrent(v)}
      />
      <View className='mb-1' />
    </View>
  );
}

Index.options = {
  addGlobalClass: true
};

Index.config = {
  navigationBarTitleText: '首页'
};

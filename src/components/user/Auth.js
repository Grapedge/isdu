import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { LOGIN_SUCCESS } from '@/constants/authentication';

export default function Auth(props) {
  const auth = useSelector(state => state.auth);
  useDidShow(() => {
    if (auth.status !== LOGIN_SUCCESS) {
      Taro.redirectTo({ url: '/pages/login/login' });
    }
  });
  return <View>{props.children}</View>;
}

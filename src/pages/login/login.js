import Taro, { useState } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import visibleImg from '@/images/visible.svg';
import visibleOffImg from '@/images/visible_off.svg';
import backgroundImg from '@/images/background.png';
import logoImg from '@/images/logo.png';
import { AtInput, AtButton } from 'taro-ui';
import { useDispatch } from '@tarojs/redux';
import { login } from '@/actions/authentication';
import './login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const [stuID, setStuID] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  return (
    <View
      className='login-view'
      style={{
        backgroundImage: `url(${backgroundImg})`
      }}
    >
      <View className='cntr'>
        <Image src={logoImg} className='logo' />
        <AtInput
          name='value'
          type='text'
          placeholder='学号'
          className='input mb-2'
          value={stuID}
          onChange={value => setStuID(value)}
        />
        {passwordVisible ? (
          <AtInput
            name='value'
            type='text'
            placeholder='统一认证密码'
            className='input mb-2'
            value={password}
            onChange={value => setPassword(value)}
          >
            <Image
              src={visibleImg}
              className='eye'
              onClick={() => {
                setPasswordVisible(state => !state);
              }}
            />
          </AtInput>
        ) : (
          <AtInput
            name='value'
            type='password'
            placeholder='统一认证密码'
            className='input mb-2'
            value={password}
            onChange={value => setPassword(value)}
          >
            <Image
              src={visibleOffImg}
              className='eye'
              onClick={() => {
                setPasswordVisible(state => !state);
              }}
            />
          </AtInput>
        )}
        <AtButton
          type='secondary'
          className='button'
          loading={loginLoading}
          onClick={() => {
            if (loginLoading) return;
            if (stuID.length === 0 || password.length === 0) {
              Taro.showModal({
                title: '错误',
                content: '请输入学号或密码',
                showCancel: false
              });
              return ;
            }
            setLoginLoading(true);
            dispatch(login(stuID, password)).then(data => {
              if (data.code === 0) {
                Taro.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 3000
                });
                // 跳转页面
                Taro.redirectTo({ url: '/pages/index/index' });
                /** TODO */
              } else {
                // 显示错误信息
                Taro.showModal({
                  title: '错误',
                  content: data.data,
                  showCancel: false
                });
                setLoginLoading(false);
              }
            });
          }}
        >
          登录
        </AtButton>
      </View>
    </View>
  );
}

Login.config = {
  navigationBarTitleText: '登录'
};

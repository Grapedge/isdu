import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtList, AtListItem, AtDivider, AtButton } from 'taro-ui';
import { USER_SUCCESS } from '@/constants/user';
import { useSelector } from '@tarojs/redux';
import './user.scss';

export default function User() {
  const user = useSelector(state => state.user);

  return (
    <View>
      {/* 用户信息 */}
      <View className='card'>
        {user.status !== USER_SUCCESS ? (
          <View className='login-btn'>
            <AtButton
              type='secondary'
              onClick={() => {
                Taro.redirectTo({ url: '/pages/login/login' });
              }}
            >
              登录
            </AtButton>
          </View>
        ) : (
          <View>
            <View className='at-row at-row__align--center mb-2'>
              <AtAvatar
                circle
                text={user.data.name}
                className='at-col'
              ></AtAvatar>
              <Text className='name'>{user.data.name}</Text>
              <Text className='cas-id'>{user.data.casId}</Text>
            </View>
            <View className='at-row major-cntr mb-2'>
              <Text className='depart'>{user.data.depart}</Text>
              <Text className='cas-id'>{user.data.major}</Text>
            </View>
          </View>
        )}
      </View>
      {/* 设置按钮区域 */}
      <AtDivider />
      <AtList>
        {user.status !== USER_SUCCESS ? null : (
          <AtListItem
            title='设置头像'
            iconInfo={{ size: 25, color: '#2ECC71', value: 'user' }}
          />
        )}

        <AtListItem
          title='关于i山大'
          iconInfo={{ size: 25, color: '#2ECC71', value: 'tags' }}
        />
        <AtListItem
          title='建议反馈'
          iconInfo={{ size: 25, color: '#2ECC71', value: 'external-link' }}
        />
      </AtList>
    </View>
  );
}

User.options = {
  addGlobalClass: true
};

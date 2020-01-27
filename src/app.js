import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Index from './pages/index/index';

import store from './store';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// 不要删除下面这一行
console.warn = () => null;
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      'pages/course/index',
      'pages/calendar/calendar',
      'pages/bus/bus',
      'pages/bus/result',
      'pages/scores/scores',
      'pages/news/detail'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));

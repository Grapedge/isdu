import Taro, { useCallback } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { NEWS_DETAIL_REQUEST } from '@/constants/news_detail';
import { AtActivityIndicator } from 'taro-ui';
import './detail.scss';

export default function NewsDetail() {
  const newsDetail = useSelector(state => state.newsDetail);
  const download = useCallback(url => {
    Taro.showLoading({
      title: '下载中...'
    });
    Taro.downloadFile({
      url: url,
      success: function(res) {
        Taro.openDocument({
          filePath: res.tempFilePath,
          success: function() {
            Taro.hideLoading();
          },
          fail: function() {
            Taro.showToast({
              title: '文件格式不支持',
              image: '../../utils/pic/error.png'
            });
          }
        });
      },
      fail: () => {
        Taro.showToast({
          title: '下载失败',
          icon: 'none',
          duration: 2000
        });
        Taro.hideLoading();
      }
    });
  }, []);

  return (
    <View className='at-article'>
      {newsDetail.status === NEWS_DETAIL_REQUEST ? (
        <AtActivityIndicator mode='center' content='正在努力加载中...' />
      ) : (
        <View>
          <View className='at-article__h1'>{newsDetail.data.title}</View>
          <View className='at-article__info'>
            {newsDetail.data.date}
            {`   `}
            {newsDetail.data.site}
          </View>
          <View className='at-article__content mb-4'>
            {newsDetail.data.content &&
              newsDetail.data.content.split('\n').map(v => (
                <View className='at-article__p' key={v}>
                  {v}
                </View>
              ))}
          </View>
          <View className='mb-4' />
          <View className='mb-4'>
            {newsDetail.data.attachment &&
            newsDetail.data.attachment.length > 0 ? (
              <View>
                <View className='at-article__h3 strong'>附件下载</View>
                {newsDetail.data.attachment.map(v => (
                  <View
                    className='.at-article__p strong'
                    key={v.title}
                    onClick={() => download(v.url)}
                  >
                    {v.title}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

NewsDetail.options = {
  addGlobalClass: true
};
NewsDetail.config = {
  navigationBarTitleText: '资讯'
};

import Taro, { useEffect, useState } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtListItem, AtList } from 'taro-ui';
import { useDispatch, useSelector } from '@tarojs/redux';
import newsData from '@/actions/news';
import { NEWS_SUCCESS } from '@/constants/news';
import newsDetail from '@/actions/news_detail';

import './news.scss';

const sites = ['sduOnline', 'underGraduate', 'sduYouth', 'sduView'];
export default function Home() {
  // 当前选择标签页
  const [current, setCurrent] = useState(0);
  const news = useSelector(state => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    sites.map(v => dispatch(newsData(v)));
  }, [dispatch]);
  const newsTabList = [
    { title: '学生在线' },
    { title: '本科生院' },
    { title: '青春山大' },
    { title: '山大视点' }
  ];

  return (
    <AtTabs
      current={current}
      tabList={newsTabList}
      onClick={v => setCurrent(v)}
      className='cntr'
    >
      {news.status === NEWS_SUCCESS
        ? sites.map((v, i) => (
            <AtTabsPane key={v} current={current} index={i}>
              <AtList>
                {news.data[v] &&
                  news.data[v].map((u, j) => (
                    <AtListItem
                      key={u.url}
                      title={u.title}
                      note={u.block}
                      arrow='right'
                      onClick={() => {
                        dispatch(newsDetail(v, j));
                        Taro.navigateTo({ url: '/pages/news/detail' });
                      }}
                    />
                  ))}
              </AtList>
            </AtTabsPane>
          ))
        : null}
      <AtTabsPane current={current} index={0}></AtTabsPane>
    </AtTabs>
  );
}

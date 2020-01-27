import {
  NEWS_DETAIL_REQUEST,
  NEWS_DETAIL_SUCCESS,
  NEWS_DETAIL_ERROR
} from '@/constants/news_detail';
import { request } from '@/api/network/request';
import { NEWS_URL } from '@/constants/fetch_url';

const newsDetail = (site, id, page = 1) => {
  return {
    types: [NEWS_DETAIL_REQUEST, NEWS_DETAIL_SUCCESS, NEWS_DETAIL_ERROR],
    shouldCallAPI: () => true,
    callAPI: () =>
      request({
        url: NEWS_URL,
        data: {
          site,
          id,
          page,
          content: null
        }
      }),
    oldAPI: true
  };
};

export default newsDetail;

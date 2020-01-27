import { NEWS_URL } from '@/constants/fetch_url';
import { request } from '@/api/network/request';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_ERROR } from '@/constants/news';
import { makeActionCreator } from './makeActionCreator';

export const newsRequest = makeActionCreator(NEWS_REQUEST);
export const newsSuccess = makeActionCreator(NEWS_SUCCESS, 'payload');
export const newsError = makeActionCreator(NEWS_ERROR, 'payload');

const newsData = (site, page = 1) => (dispatch, _getState) => {
  // if (getState().news.status === NEWS_SUCCESS) return;
  dispatch(newsRequest());
  return request({
    url: NEWS_URL,
    data: {
      site,
      page
    }
  }).then(
    res => {
      dispatch(newsSuccess({ site, data: res }));
    },
    err => {
      dispatch(newsError(err.errMsg));
    }
  );
};

export default newsData;

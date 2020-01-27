import {
  NEWS_DETAIL_REQUEST,
  NEWS_DETAIL_SUCCESS,
  NEWS_DETAIL_ERROR
} from '@/constants/news_detail';
import { request } from '@/api/network/request';
import { NEWS_URL } from '@/constants/fetch_url';
import { makeActionCreator } from './makeActionCreator';

// export const newsDetailRequest = makeActionCreator(NEWS_DETAIL_REQUEST);
// export const newsDetailSuccess = makeActionCreator(
//   NEWS_DETAIL_SUCCESS,
//   'payload'
// );
// export const newsDetailError = makeActionCreator(NEWS_DETAIL_ERROR, 'payload');

// const newsDetail = (site, id, page = 1) => dispatch => {
//   dispatch(newsDetailRequest());
//   return request({
//     url: NEWS_URL,
//     data: {
//       site,
//       id,
//       page,
//       content: null
//     }
//   }).then(
//     res => {
//       dispatch(newsDetailSuccess(res));
//     },
//     err => {
//       dispatch(newsDetailError(err.errMsg));
//     }
//   );
// };

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

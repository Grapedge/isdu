import {
  NEWS_DETAIL_REQUEST,
  NEWS_DETAIL_SUCCESS,
  NEWS_DETAIL_ERROR
} from '@/constants/news_detail';

const initialState = {
  status: '',
  error: '',
  data: []
};

export default function newsDetail(state = initialState, action) {
  switch (action.type) {
    case NEWS_DETAIL_REQUEST:
      return {
        ...state,
        status: NEWS_DETAIL_REQUEST
      };
    case NEWS_DETAIL_SUCCESS:
      return {
        ...state,
        status: NEWS_DETAIL_SUCCESS,
        data: action.payload
      };
    case NEWS_DETAIL_ERROR:
      return {
        ...state,
        status: NEWS_DETAIL_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

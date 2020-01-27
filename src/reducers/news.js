import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_ERROR } from '@/constants/news';

const initialState = {
  status: '',
  error: '',
  data: []
};

export default function news(state = initialState, action) {
  switch (action.type) {
    case NEWS_REQUEST:
      return {
        ...state,
        status: NEWS_REQUEST
      };
    case NEWS_SUCCESS:
      return {
        ...state,
        status: NEWS_SUCCESS,
        data: {
          ...state.data,
          [action.payload.site]: action.payload.data
        }
      };
    case NEWS_ERROR:
      return {
        ...state,
        status: NEWS_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

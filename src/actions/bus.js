import { BUS_REQUEST, BUS_SUCCESS, BUS_ERROR } from '@/constants/bus';
import { BUS_URL } from '@/constants/fetch_url';
import { request } from '@/api/network/request';

export const busRequest = () => ({
  type: BUS_REQUEST
});

export const busSuccess = data => ({
  type: BUS_SUCCESS,
  payload: data
});

export const busError = error => ({
  type: BUS_ERROR,
  payload: error
});

export const busInfo = (start, end, isWeekend) => dispatch => {
  dispatch(busRequest());
  request({
    url: BUS_URL,
    data: {
      start,
      end,
      isWeekend: isWeekend ? 1 : 0
    }
  }).then(
    res => {
      dispatch(busSuccess(res.data));
    },
    err => {
      dispatch(busError(err.errMsg));
    }
  );
};

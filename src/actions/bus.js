import { BUS_REQUEST, BUS_SUCCESS, BUS_ERROR } from '@/constants/bus';
import { BUS_URL } from '@/constants/fetch_url';
import { request } from '@/api/network/request';

const busInfo = (start, end, isWeekend) => {
  return {
    types: [BUS_REQUEST, BUS_SUCCESS, BUS_ERROR],
    shouldCallAPI: () => true,
    callAPI: () =>
      request({
        url: BUS_URL,
        data: {
          start,
          end,
          isWeekend: isWeekend ? 1 : 0
        }
      })
  };
};

export default busInfo;

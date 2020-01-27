import { BUS_REQUEST, BUS_SUCCESS, BUS_ERROR } from '@/constants/bus';

const initialState = {
  status: '',
  error: '',
  data: []
};

export default function bus(state = initialState, action) {
  switch (action.type) {
    case BUS_REQUEST:
      return {
        ...state,
        status: BUS_REQUEST
      };
    case BUS_SUCCESS:
      return {
        ...state,
        status: BUS_SUCCESS,
        data: action.payload
      };
    case BUS_ERROR:
      return {
        ...state,
        status: BUS_ERROR,
        error: action.payload
      };
    default:
      return state;
  }
}

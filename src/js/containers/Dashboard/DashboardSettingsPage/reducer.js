import initialState from './state';
import * as T from './constants';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case T.LOAD_DATA_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data
      };
    case T.LOAD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default: return state;
  }
}

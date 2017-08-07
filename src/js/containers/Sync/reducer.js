/* @flow */
import * as T from './constants';
import type { SyncState, SyncAction } from './flowTypes';

export const initialState: SyncState = {
  isLoading: false,
  error: {
    message: ''
  },
  success: false
};

const syncReducer = (
  state: SyncState = initialState,
  action: SyncAction
): SyncState => {
  switch (action.type) {
    case T.LOAD_DATA_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {
          message: ''
        },
        success: true
      };
    case T.LOAD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        success: false
      };
    case T.RESET_DATA:
      return {
        ...state,
        isLoading: false,
        error: {
          message: ''
        },
        success: false
      };
    default:
      return state;
  }
};

export default syncReducer;

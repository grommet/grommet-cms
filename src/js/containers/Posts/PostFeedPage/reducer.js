/* @flow */
import * as T from './constants';
import type { PostFeedPageState, PostFeedPageAction } from './flowTypes';

export const initialState: PostFeedPageState = {
  isLoading: false,
  loadingError: null,
  posts: null
};

const postFeedPageReducer = (
  state: PostFeedPageState = initialState,
  action: PostFeedPageAction
): PostFeedPageState => {
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
        posts: action.posts
      };
    case T.LOAD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadingError: action.error
      };
    case T.CLEAR_ERRORS:
      return {
        ...state,
        loadingError: null
      };
    default:
      return state;
  }
};

export default postFeedPageReducer;

/* @flow */
export type LOAD_DATA_INITIATION_TYPE = 'POSTFEEDPAGE/LOAD_DATA_INITIATION';
export type LOAD_DATA_SUCCESS_TYPE = 'POSTFEEDPAGE/LOAD_DATA_SUCCESS';
export type LOAD_DATA_FAILURE_TYPE = 'POSTFEEDPAGE/LOAD_DATA_FAILURE';
export type CLEAR_ERRORS_TYPE = 'POSTFEEDPAGE/CLEAR_ERRORS';

export type PostFeedPageState = {
  isLoading: boolean,
  posts: ?Array<PostType>,
  loadingError: ?{ message: string }
}

export type PostFeedPageAction = {
  type: LOAD_DATA_INITIATION_TYPE | LOAD_DATA_SUCCESS_TYPE | LOAD_DATA_FAILURE_TYPE | CLEAR_ERRORS_TYPE,
  error?: ?{ message: string },
  posts?: ?Array<PostType>
}

export type PostFeedPageProps = {
  actions: {
    loadDataInitiation: () => PostFeedPageAction,
    loadDataSuccess: (posts: Array<PostType>) => PostFeedPageAction,
    loadDataFailure: (error: { message: string }) => PostFeedPageAction,
    clearErrors: () => PostFeedPageAction,
    getPosts: Function
  },
  loadingError?: ?{ message: string },
  isLoading: boolean,
  posts?: ?Array<PostType>
}

export type PostType = any;

/* @flow */
import * as T from './constants';
import type { PostFeedPageAction, PostType } from './flowTypes';
import Request from 'grommet-cms/utils/request';

export const loadDataInitiation = (): PostFeedPageAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess =
  (posts: Array<PostType>): PostFeedPageAction => ({
    type: T.LOAD_DATA_SUCCESS,
    posts
  });

export const loadDataFailure =
  (error: { message: string }): PostFeedPageAction => ({
    type: T.LOAD_DATA_FAILURE,
    error
  });

export const clearErrors = (): PostFeedPageAction => ({
  type: T.CLEAR_ERRORS
});

export const getPosts = (page: number = 0) =>
  (dispatch: (action: any) => void, getState: any) => {
    let { url } = getState().api;
    const postsUrl = `${url}/posts?page=${page}`;
    dispatch(loadDataInitiation());
    Request.get(postsUrl)
      .then(res => {
        dispatch(loadDataSuccess(res));
      })
      .catch(err => {
        const message = 'There was an error processing your request.' +
          '  Please try again.';
        dispatch(
          loadDataFailure({
            message
          })
        );
      });
  };

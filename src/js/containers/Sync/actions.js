/* @flow */
import * as T from './constants';
import type { SyncAction } from './flowTypes';

export const loadDataInitiation = (): SyncAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess = (): SyncAction => ({
  type: T.LOAD_DATA_SUCCESS
});

export const loadDataFailure = (error: { message: string }): SyncAction => ({
  type: T.LOAD_DATA_FAILURE,
  error
});

export const resetData = (): SyncAction => ({
  type: T.RESET_DATA
});

export const sync = (data: Object) =>
  (dispatch: Dispatch, getState: Function) => {
    dispatch(loadDataInitiation());
    const { action, page, resourceType } = data;
    const { url } = getState().api;
    const resourceTypeQuery = resourceType.value && `resourceType=${resourceType.value}&`;
    const postIdQuery = page.value && `postId=${page.value}&`;

    return fetch(`${url}/sync/${action.value}?${postIdQuery}${resourceTypeQuery}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(({ json, status }) => {
        if (status && status >= 400) {
          return dispatch(loadDataFailure({ message: 'Error syncing data.' }));
        }

        dispatch(loadDataSuccess(json));
        return(json);
      })
      .catch(err => {
        return dispatch(loadDataFailure({ message: 'Error syncing data.' }));
      });
  };

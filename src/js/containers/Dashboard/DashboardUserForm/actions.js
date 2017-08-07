import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';
import { browserHistory } from 'react-router';

export function userRequest() {
  return {
    type: ActionTypes.USER_CREATE_REQUEST
  };
}
export function userRequestSuccess(response) {
  return {
    type: ActionTypes.USER_CREATE_SUCCESS,
    response
  };
}

export function userGetSuccess(user) {
  return {
    type: ActionTypes.USER_GET_SUCCESS,
    user
  };
}

export function userRequestError(errorMsg) {
  return {
    type: ActionTypes.USER_CREATE_ERROR,
    error: errorMsg
  };
}

export const getUser = userId =>
  (dispatch, getState) => {
    const { url } = getState().api;

    return fetch(`${url}/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
        ))
      .then(
        ({ status, json }) => {
          if (status >= 400) {
            // Status looks bad
            return dispatch(userRequestError(json.message));
          }
          // Status looks good
          return dispatch(userGetSuccess(json));
        },
        err =>
          // dispatch app error
          dispatch(userRequestError(json.message))

      );
  };

export const userPost = (user, loggedInRole) =>
  (dispatch, getState) => {
    const { url } = getState().api;
    const { role: loggedInRole } = getState().login.user;
    const endPoint = (user._id)
      ? `/user/${user._id}/edit`
      : '/user/register';

    fetch(`${url}${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
        ))
      .then(
        ({ status, json }) => {
          if (status >= 400) {
            // Status looks bad
            dispatch(userRequestError(json.message));
          } else {
            // Status looks good
            dispatch(userRequestSuccess(json));
            if (loggedInRole === 0) {
              browserHistory.push('/dashboard/users');
            } else {
              browserHistory.push('/dashboard/homepage');
            }
          }
        },
        (err) => {
          // dispatch app error
          dispatch(userRequestError(json.message));
        }
      );
  };

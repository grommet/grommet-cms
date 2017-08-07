import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export function usersRequest() {
  return {
    type: ActionTypes.USERS_REQUEST
  };
}

export function usersSuccess(users) {
  return {
    type: ActionTypes.USERS_SUCCESS,
    users
  };
}

export function usersError(errorMsg) {
  return {
    type: ActionTypes.USERS_ERROR,
    error: errorMsg
  };
}

export function userDeleteSuccess() {
  return {
    type: ActionTypes.USER_DELETE_SUCCESS
  };
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    dispatch(usersRequest());

    let { url } = getState().api;
    fetch(`${url}/user/${id}/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(usersError(text));
          } else {
            // Refresh users list.
            dispatch(getUsers());
            dispatch(userDeleteSuccess());
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(usersError('There was an error processing your request.'));
        }
      );
  };
}

export function getUsers() {
  return (dispatch, getState) => {
    dispatch(usersRequest());

    let { url } = getState().api;
    fetch(`${url}/users`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          statusText: response.statusText,
          json
        })
      ))
      .then(
        ({ status, statusText, json }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(usersError(text));
          } else {
            dispatch(usersSuccess(json));
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(usersError('There was an error processing your request.'));
        }
      );
  };
}

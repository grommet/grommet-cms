import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as ActionTypes from './constants';

export function loginRequest() {
  return { type: ActionTypes.USER_LOGIN_REQUEST };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.USER_LOGIN_SUCCESS,
    user
  };
}

export function loginError(errorMsg) {
  return {
    type: ActionTypes.USER_LOGIN_ERROR,
    loginError: errorMsg
  };
}

export function logoutSuccess() {
  return {
    type: ActionTypes.USER_LOGOUT_SUCCESS
  };
}

export function login(user) {
  return (dispatch, getState) => {
    const { url } = getState().api;
    fetch(`${url}/user/login`, {
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
          statusText: response.statusText,
          json
        })
        ))
      .then(
        ({ status, statusText, json }) => {
          if (status >= 400) {
            const text = (status === 401)
              ? 'The email and password you entered don\'t match.'
              : statusText;
            dispatch(loginError(text));
          } else {
            dispatch(loginSuccess(json));
          }
        },
        () => {
          // dispatch app error
          dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(loginRequest());

    const { url } = getState().api;
    fetch(`${url}/user/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(loginError('There was an error processing your request.'));
          } else {
            dispatch(logoutSuccess(statusText));
            browserHistory.push('/dashboard');
          }
        },
        () => {
          // dispatch app error
          dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}

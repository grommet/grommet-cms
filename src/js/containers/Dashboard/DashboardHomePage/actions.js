import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as ActionTypes from './constants';

export function dataRequest() {
  return {
    type: ActionTypes.DASHBOARD_HOME_PAGE_REQUEST
  };
}

export function dataSuccess(data) {
  return {
    type: ActionTypes.DASHBOARD_HOME_PAGE_SUCCESS,
    data
  };
}

export function dataError(errorMsg) {
  return {
    type: ActionTypes.DASHBOARD_HOME_PAGE_ERROR,
    error: errorMsg
  };
}

export function getData() {
  return function (dispatch, getState) {
    dispatch(dataRequest());

    const { url } = getState().api;
    return fetch(`${url}/posts/latest`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.json().then(json => ({
      status: response.status,
      statusText: response.statusText,
      json
    }))).then(({ status, statusText, json }) => {
      if (status >= 400) {
        const text = statusText;
        dispatch(dataError(text));
      } else {
        dispatch(dataSuccess(json));
      }
    }, () => dispatch(dataError('There was an error processing your request.')));
  };
}

export function submit(data) {
  const endPoint = 'homepage';

  return function (dispatch, getState) {
    dispatch(dataRequest());

    const { url } = getState().api;
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    }).then(
      ({ status, statusText }) => {
        if (status >= 400) {
          dispatch(dataError(statusText));
        } else {
          // redirect
          browserHistory.push('/dashboard/homepage');
        }
      }, () => dispatch(dataError('There was an error processing your request.'))
    );
  };
}

import { browserHistory } from 'react-router';
import { loadNavRoutes } from 'grommet-cms/containers/Dashboard/DashboardContainer/actions';
import * as T from './constants';

export function reorderPageType(index, direction) {
  return {
    type: T.REORDER_PAGE_TYPE,
    index,
    direction
  };
}

export function requestInitiation() {
  return {
    type: T.REQUEST_INITIATION
  };
}

export function requestFailure(error) {
  return {
    type: T.REQUEST_FAILURE,
    error
  };
}

export function loadDataSuccess(data) {
  return {
    type: T.LOAD_DATA_SUCCESS,
    data
  };
}


export function deleteSuccess() {
  return {
    type: T.DELETE_SUCCESS
  };
}

export function submissionSuccess() {
  return {
    type: T.SUBMISSION_SUCCESS
  };
}

export function getPageTypeSuccess(pageType) {
  return {
    type: T.GET_PAGE_TYPE_SUCCESS,
    pageType
  };
}

export function confirmDeletion(index) {
  return {
    type: T.CONFIRM_DELETION,
    index
  };
}

export function cancelDeletion() {
  return {
    type: T.CANCEL_DELETION
  };
}

export function formInput(field, value) {
  return {
    type: T.FORM_INPUT,
    field,
    value
  };
}

export function clearForm() {
  return {
    type: T.CLEAR_FORM
  };
}

export function clearError() {
  return {
    type: T.CLEAR_ERROR
  };
}

export function loadData() {
  return function (dispatch, getState) {
    const { url } = getState().api;
    dispatch(requestInitiation());
    return fetch(`${url}/pageTypes`)
      .then(res => res.json())
      .then(data => dispatch(loadDataSuccess(data)))
      .catch(err => dispatch(requestFailure(err)));
  };
}

export function deletePageType(id) {
  return (dispatch, getState) => {
    dispatch(requestInitiation());

    const { url } = getState().api;
    fetch(`${url}/pageType/${id}/delete`, {
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
            dispatch(requestFailure(text));
          } else {
            // Refresh list.
            dispatch(loadData());
            dispatch(loadNavRoutes());
            dispatch(deleteSuccess());
          }
        },
        (err) => {
          dispatch(requestFailure('There was an error processing your request.'));
        }
      );
  };
}

export const getPageType = id =>
  (dispatch, getState) => {
    const { url } = getState().api;
    dispatch(requestInitiation());
    return fetch(`${url}/pageType/${id}`, {
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
            return dispatch(requestFailure(json.message));
          }
          // Status looks good
          return dispatch(getPageTypeSuccess(json));
        },
        err =>
          // dispatch app error
          dispatch(requestFailure(json.message))

      );
  };

export function submitPageType(pageType) {
  const endPoint = ((pageType._id && pageType._id === '') || !pageType._id)
    ? 'pageType/create'
    : `pageType/${pageType._id}`;

  return (dispatch, getState) => {
    dispatch(requestInitiation());
    const { url } = getState().api;
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(pageType)
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(requestFailure(statusText));
          } else {
            dispatch(submissionSuccess());
            dispatch(loadNavRoutes());
            browserHistory.push('/dashboard/pageTypes');
          }
        },
        (err) => {
          // dispatch app error
          dispatch(requestFailure('There was an error processing your request.'));
        }
      );
  };
}

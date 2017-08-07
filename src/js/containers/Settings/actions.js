import * as T from './constants';

export function removeLogo() {
  return {
    type: T.REMOVE_LOGO
  };
}

export function clearError() {
  return {
    type: T.CLEAR_ERROR
  };
}

export function loadDataInitiation() {
  return {
    type: T.LOAD_DATA_INITIATION
  };
}

export function loadDataSuccess(data) {
  return {
    type: T.LOAD_DATA_SUCCESS,
    data
  };
}

export function loadDataFailure(error) {
  return {
    type: T.LOAD_DATA_FAILURE,
    error
  };
}

export function loadData() {
  return function(dispatch, getState) {
    const { url } = getState().api;
    dispatch(loadDataInitiation());
    return fetch(`${url}/settings`)
      .then((res) => res.json())
      .then((data) => dispatch(loadDataSuccess(data)))
      .catch((err) => dispatch(loadDataFailure(err)));
  };
}

export function formInput(formType, field, value) {
  return {
    type: T.FORM_INPUT,
    formType,
    field,
    value
  };
}

export function submitDataInitiation() {
  return {
    type: T.SUBMIT_DATA_INITIATION
  };
}

export function submitDataSuccess(message) {
  return {
    type: T.SUBMIT_DATA_SUCCESS,
    message
  };
}

export function clearMessage() {
  return {
    type: T.CLEAR_MESSAGE
  };
}

export function submitDataFailure(error) {
  return {
    type: T.SUBMIT_DATA_FAILURE,
    error
  };
}

export function submitData(data) {
  return function(dispatch, getState) {
    const { url } = getState().api;
    dispatch(submitDataInitiation());
    return fetch(`${url}/settings/edit`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then((res) =>
        res.json().then((json) => ({
          status: res.status,
          statusText: res.statusText,
          json
        })))
      .then(({ json }) => {
        if (json.updateView) {
          setTimeout(() => {
            location.reload();
          }, 2000);
        }

        return dispatch(submitDataSuccess(json.message));
      })
      .catch((err) => dispatch(submitDataFailure(err)));
  };
}

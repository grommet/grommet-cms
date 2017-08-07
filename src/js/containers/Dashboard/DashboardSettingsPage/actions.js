import * as T from './constants';

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

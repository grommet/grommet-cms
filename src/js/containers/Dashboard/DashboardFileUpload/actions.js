import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export function fileRequest() {
  return {
    type: ActionTypes.FILE_UPLOAD_REQUEST
  };
}

export function fileSuccess(file) {
  return {
    type: ActionTypes.FILE_UPLOAD_SUCCESS,
    file
  };
}

export function fileError(errorMsg) {
  return {
    type: ActionTypes.FILE_UPLOAD_ERROR,
    error: errorMsg
  };
}

export function fileInsert(layer) {
  return {
    type: ActionTypes.FILE_INSERT_REQUEST,
    insertRequest: layer
  };
}

export function fileUpload(file) {
  const endPoint = 'file/create';

  let formData = new FormData();

  for(name in file) {
    formData.append(name, file[name]);
  }

  return (dispatch, getState) => {
    let { url } = getState().api;

    dispatch(fileRequest());
    fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      body: formData
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
            console.log('dispatching error:', status, statusText, json);
            dispatch(fileError(statusText));
          } else {
            dispatch(fileSuccess(json));
          }
        },
        err => {
          // dispatch app error
          console.log(err);
          dispatch(fileError('There was an error processing your request.'));
        }
      );
  };
}

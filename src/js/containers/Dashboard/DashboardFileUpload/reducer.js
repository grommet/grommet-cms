import * as ActionTypes from './constants';

const initialState = {
  insertRequest: false,
  uploadRequest: false,
  error: '',
  url: ''
};

export function file(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FILE_INSERT_REQUEST:
      return Object.assign({}, state, {
        insertRequest: action.insertRequest,
        error: ''
      });
    case ActionTypes.FILE_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        uploadRequest: true,
        error: '',
        url: ''
      });
    case ActionTypes.FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        insertRequest: false,
        uploadRequest: false,
        error: '',
        url: action.file.path
      });
    case ActionTypes.FILE_UPLOAD_ERROR:
      return Object.assign({}, state, {
        uploadRequest: false,
        error: action.error,
        url: ''
      });
    default:
      return state;
  }
}

export default file;

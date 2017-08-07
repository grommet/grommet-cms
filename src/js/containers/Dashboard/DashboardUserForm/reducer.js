import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  _id: undefined,
  role: undefined,
  username: ''
};

function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_CREATE_REQUEST:
      return Object.assign({}, state, {
        request: true,
        error: ''
      });
      break;
    case ActionTypes.USER_CREATE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: ''
      });
      break;
    case ActionTypes.USER_GET_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: '',
        ...action.user
      });
      break;
    case ActionTypes.USER_CREATE_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
      break;
    default:
      return state;
  }
}

export default user;

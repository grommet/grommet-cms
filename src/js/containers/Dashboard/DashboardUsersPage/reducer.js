import * as ActionTypes from './constants';

const initialState = {
  request: false,
  users: []
};

function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return Object.assign({}, state, {
        request: true,
        users: []
      });
      break;
    case ActionTypes.USERS_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        users: action.users,
        error: ''
      });
      break;
    case ActionTypes.USERS_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
      break;
    case ActionTypes.USER_DELETE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: ''
      });
      break;
    default:
      return state;
  }
}

export default users;

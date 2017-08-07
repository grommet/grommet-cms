import * as ActionTypes from './constants';

const initialState = {
  loginRequest: false,
  loginError: '',
  loggedIn: (process.env.NODE_ENV === 'development')
    ? true
    : false,
  user: (process.env.NODE_ENV === 'development')
    ? {
      username: 'admin',
      role: 0
    }
    : undefined
};

function login(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return Object.assign({}, state, {
        loginRequest: true,
        loginError: ''
      });
      break;
    case ActionTypes.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginRequest: false,
        loggedIn: true,
        loginError: '',
        user: action.user
      });
      break;
    case ActionTypes.USER_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginRequest: false,
        loginError: action.loginError
      });
      break;
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loginRequest: false,
        loginError: '',
        loggedIn: false
      });
      break;
    default:
      return state;
  }
}

export default login;

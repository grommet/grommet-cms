import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  data: {}
};

function dashboardHomepage(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.DASHBOARD_HOME_PAGE_REQUEST:
      return Object.assign({}, state, {
        request: true,
        data: {}
      });
      break;

    case ActionTypes.DASHBOARD_HOME_PAGE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: '',
        data: action.data
      });
      break;

    case ActionTypes.DASHBOARD_HOME_PAGE_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
      break;

    default:
      return state;
  }
}

export default dashboardHomepage;

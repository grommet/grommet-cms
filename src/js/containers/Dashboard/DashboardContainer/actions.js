import Requests from 'grommet-cms/utils/request';
import * as ActionTypes from './constants';

export function dashboardError(error) {
  return {
    type: ActionTypes.DASHBOARD_ERROR,
    error
  };
}

export function dashboardSetLeftNavAnchor({ label, onClick }) {
  return {
    type: ActionTypes.DASHBOARD_SET_LEFT_NAV_ANCHOR,
    label,
    onClick
  };
};

export function dashboardRequest() {
  return {
    type: ActionTypes.DASHBOARD_REQUEST
  };
};

export function dashboardLoadNavSuccess(nav) {
  return {
    type: ActionTypes.DASHBOARD_LOAD_NAV_SUCCESS,
    nav
  };
};

export function loadNavRoutes() {
  return function(dispatch, getState) {
    let { url } = getState().api;
    dispatch(dashboardRequest());
    Requests.get(`${url}/routes`)
      .then(json => {
        if (!json.routes) {
          throw new Error('Unexpected data returned from server');
        }
        dispatch(dashboardLoadNavSuccess(json.routes));
      })
      .catch(err => {
        dispatch(dashboardError(err));
      });
  };
}

import * as ActionTypes from './constants';

const initialState = {
  error: '',
  loading: false,
  leftNavAnchor: {
    title: null,
    onClick: null
  },
  pageMenu: [],
  navLinks: [
    {
      type: 'Link',
      path: '/dashboard/assets',
      label: 'Assets',
      role: [0, 1]
    },
    {
      type: 'Menu',
      label: 'Admin',
      role: [0],
      children: [
        {
          path: '/dashboard/pageTypes',
          label: 'Page Types',
          role: [0]
        },
        {
          path: '/dashboard/settings',
          label: 'Settings',
          role: [0]
        },
        {
          path: '/dashboard/users',
          label: 'Users',
          role: [0]
        }
        // This is still expiremental. Use are your own risk.
        /* {
          path: '/dashboard/sync',
          label: 'Sync',
          role: [0]
        } */
      ]
    }
  ]
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DASHBOARD_LOAD_NAV_SUCCESS:
      return {
        ...state,
        loading: false,
        pageMenu: action.nav
      };
    case ActionTypes.DASHBOARD_SET_LEFT_NAV_ANCHOR:
      return {
        ...state,
        leftNavAnchor: {
          title: action.label,
          onClick: action.onClick
        }
      };
    case ActionTypes.DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
      break;
    case ActionTypes.DASHBOARD_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
      break;
    default:
      return state;
  }
}

export default dashboard;

import * as ActionTypes from './constants';

const initialState = {
  addPostForm: {
    isVisible: false,
    selectedPostIndex: null
  },
  redirect: false,
  currentPage: 0
};

function dashboardPosts(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DASHBOARD_POSTS_TOGGLE_FORM:
      return {
        ...state,
        addPostForm: {
          isVisible: !state.addPostForm.isVisible,
          selectedPostIndex: typeof action.index === 'number'
            ? action.index
            : null
        }
      };
    case ActionTypes.DASHBOARD_POSTS_ADD_POST_REDIRECT:
      return {
        ...state,
        redirect: !state.redirect
      };
    case ActionTypes.DASHBOARD_POSTS_INCREMENT_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    default:
      return state;
  }
}

export default dashboardPosts;

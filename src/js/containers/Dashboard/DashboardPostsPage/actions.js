import * as ActionTypes from './constants';

export const toggleAddPostFormVisibility = index => ({
  type: ActionTypes.DASHBOARD_POSTS_TOGGLE_FORM,
  index
});

export const addPostRedirect = () => ({
  type: ActionTypes.DASHBOARD_POSTS_ADD_POST_REDIRECT
});

export const incrementCurrentPage = () => ({
  type: ActionTypes.DASHBOARD_POSTS_INCREMENT_CURRENT_PAGE
});

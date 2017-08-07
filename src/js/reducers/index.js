import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import api from 'grommet-cms/containers/Api/reducer';
import login from 'grommet-cms/containers/LoginPage/reducer';
import posts from 'grommet-cms/containers/Posts/PostPage/reducer';
import postFeedPage from 'grommet-cms/containers/Posts/PostFeedPage/reducer';
import sync from 'grommet-cms/containers/Sync/reducer';
import settings from 'grommet-cms/containers/Settings/reducer';
import pageTypes from 'grommet-cms/containers/PageTypes/reducer';
import * as dashboardReducers from 'grommet-cms/containers/Dashboard/reducers';

const rootReducer = combineReducers({
  api,
  login,
  posts,
  postFeedPage,
  sync,
  settings,
  pageTypes,
  ...dashboardReducers,
  routing
});

export default rootReducer;

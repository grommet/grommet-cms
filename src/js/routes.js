import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import {
  DashboardContainer,
  LoginPage,
  DashboardHomePage,
  DashboardUserForm,
  DashboardUserEditPage,
  DashboardUsersPage,
  DashboardPostsPage,
  DashboardPostPage,
  DashboardAssetsPage,
  DashboardAssetPage,
  DashboardSyncPage,
  DashboardSettingsPage,
  DashboardPageTypesPage,
  DashboardPageTypeEditPage,
  DashboardPageTypeCreatePage
} from 'grommet-cms/containers';

export const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.login.loggedIn) {
      // Not authenticated, redirect to login page.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/dashboard'
      });
    }
  };

  return (
    <Router history={browserHistory}>
      <Redirect from="/" to="/dashboard" />
      <Route path="/dashboard" component={DashboardContainer}>
        <IndexRoute component={LoginPage} />
        <Route path="assets" component={DashboardAssetsPage} onEnter={authRequired} />
        <Route path="asset/:id" component={DashboardAssetPage} onEnter={authRequired} />
        <Route path="homepage" component={DashboardHomePage} onEnter={authRequired} />
        <Route path="users" component={DashboardUsersPage} onEnter={authRequired} />
        <Route path="user/create" component={DashboardUserForm} onEnter={authRequired} />
        <Route path="users/:id" component={DashboardUserEditPage} onEnter={authRequired} />
        <Route path="posts/:type" component={DashboardPostsPage} onEnter={authRequired} />
        <Route path="post/:id" component={DashboardPostPage} onEnter={authRequired} />
        <Route path="sync" component={DashboardSyncPage} onEnter={authRequired} />
        <Route path="settings" component={DashboardSettingsPage} onEnter={authRequired} />
        <Route path="pageTypes" component={DashboardPageTypesPage} onEnter={authRequired} />
        <Route path="pageType/:id" component={DashboardPageTypeEditPage} onEnter={authRequired} />
        <Route path="pageTypes/create" component={DashboardPageTypeCreatePage} onEnter={authRequired} />
        <Redirect from="post/:id" to="/posts/post/:id" />
      </Route>
    </Router>
  );
};

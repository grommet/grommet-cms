import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import createLocation from 'history/lib/createLocation';
import env from 'node-env-file';
import path from 'path';
import { match } from 'react-router';
import 'isomorphic-fetch';
import { getRoutes } from '../src/js/routes';
import configureStore from '../src/js/store';

// Load environment variables
env(path.join(__dirname, '..', '.env'));

export default function isomorphicRender(req, res) {
  const location = createLocation(req.url);
  const authStatus = req.isAuthenticated();
  const user = (authStatus && req.user)
    ? {
      _id: req.user._id,
      username: req.user.username,
      role: (req.user.role === 0) ? 0 : 1
    } : undefined;
  console.log(user);
  const store = configureStore({
    api: {
      url: process.env.API_URL
    },
    login: {
      loggedIn: authStatus,
      loginRequest: false,
      loginError: '',
      user
    }
  });

  match({
    routes: getRoutes(store),
    location
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found...');
    }

    const promises = renderProps.components.map((component) => {
      if (!component || !component.fetchData) {
        return false;
      }

      const title = (renderProps.params.title)
        ? renderProps.params.title
        : null;

      return store.dispatch(component.fetchData(title));
    });

    return Promise.all(promises).then(() => {
      const initialState = JSON.stringify(store.getState());
      const InitialComponent = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialComponent);
      const head = Helmet.rewind();

      res.render('index.ejs', {
        title: head.title.toString(),
        content: componentHTML,
        meta: head.meta.toString(),
        initialState,
        assetPrefix: '/dashboard-assets'
      });
    });
  });
}

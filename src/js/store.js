import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import promiseMiddleware from '../../server/promiseMiddleware';
import rootReducer from './reducers';

const middlewareBuilder = () => {
  const universalMiddleware = [thunk, promiseMiddleware];
  const middleware = applyMiddleware(...universalMiddleware);
  let allComposeElements = [
    middleware
  ];

  if (process.browser) {
    allComposeElements = [
      ...allComposeElements,
      reduxReactRouter({
        createHistory
      })
    ];
  }

  return allComposeElements;
};

const finalCreateStore = compose(
  ...middlewareBuilder(),
  (process.env.NODE_ENV !== 'production'
    && typeof(window) !== 'undefined'
    && window.devToolsExtension)
    ? window.devToolsExtension()
      : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
};

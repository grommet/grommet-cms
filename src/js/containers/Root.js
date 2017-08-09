import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { getRoutes } from '../routes';

export default class Root extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={getRoutes(store)}
          render={applyRouterMiddleware(useScroll())}
          onUpdate={this._logPageView}
        />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

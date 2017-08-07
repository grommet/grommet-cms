// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetApp from 'grommet/components/App';
import Helmet from 'react-helmet';
import { Nav, Footer } from 'grommet-cms/components';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Helmet
          title="Home"
          titleTemplate="Grommet | %s" />
        <Nav {...this.context.config.frontend} />
        <main>
          {this.props.children}
        </main>
        <Footer {...this.context.config.frontend} />
      </GrommetApp>
    );
  }
}

App.contextTypes = {
  config: React.PropTypes.shape({
    frontend: React.PropTypes.shape({
      title: React.PropTypes.string,
      logo: React.element,
      contact: {
        copyright: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        phone: React.PropTypes.string.isRequired,
        website: React.PropTypes.string.isRequired
      },
      leftNavLinks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          label: React.PropTypes.string,
          path: React.PropTypes.string.isRequired
        })
      ).isRequired,
      rightNavLinks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          label: React.PropTypes.string,
          path: React.PropTypes.string.isRequired
        })
      ).isRequired
    })
  }).isRequired
};

export default App;

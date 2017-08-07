import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'grommet-cms/containers/LoginPage/actions';
import { loadData as loadSettings } from 'grommet-cms/containers/Settings/actions';
import { selectData as selectSettings, selectLogo } from 'grommet-cms/containers/Settings/selectors';
import Helmet from 'react-helmet';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import {
  DashboardNav,
  DashboardError,
  BackAnchor
} from 'grommet-cms/components';
import { loadNavRoutes } from './actions';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this._renderNav = this._renderNav.bind(this);
    this._onLogoutClick = this._onLogoutClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadSettings());
    this.props.dispatch(loadNavRoutes());
  }

  _onLogoutClick() {
    this.props.dispatch(logout());
  }

  _renderNav() {
    const { leftNavAnchor, pageMenu, params, user, navLinks, settings, logo, location } = this.props;
    const leftAnchor = leftNavAnchor && leftNavAnchor.title ?
      (
        <BackAnchor
          onClick={leftNavAnchor.onClick}
          title={leftNavAnchor.title}
        />
      )
      :
      null;
    if (this.props.loggedIn) {
      return (
        <DashboardNav
          title={settings && settings.branding ? settings.branding.title : ''}
          logo={React.cloneElement(logo, {
            style: {
              maxWidth: '24px',
              maxHeight: '24px'
            }
          })}
          navLinks={navLinks}
          params={params}
          location={location}
          pageMenu={pageMenu}
          leftAnchor={leftAnchor}
          onLogoutClick={this._onLogoutClick}
          user={user}
        />
      );
    }
    return null;
  }

  render() {
    const error = (this.props.error)
      ? <DashboardError message={this.props.error.message} />
      : null;

    return (
      <GrommetApp className="dashboard" centered={false}>
        <Helmet
          title="Dashboard"
          titleTemplate="Grommet CMS | %s"
        />
        {this._renderNav()}
        {error}
        <Box align="center" justify="center">
          {this.props.children}
        </Box>
      </GrommetApp>
    );
  }
}

Dashboard.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

Dashboard.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.object
  ),
  dispatch: PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    type: React.PropTypes.string
  }),
  leftNavAnchor: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string
  }),
  nav: PropTypes.array,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  logo: PropTypes.node
};

function mapStateToProps(state, props) {
  const { loggedIn, user } = state.login;
  const { loading, error, leftNavAnchor, pageMenu, navLinks } = state.dashboard;
  return {
    settings: selectSettings(state),
    logo: selectLogo(state),
    loggedIn,
    navLinks,
    loading,
    error,
    pageMenu,
    leftNavAnchor,
    user
  };
}

export default connect(mapStateToProps)(Dashboard);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import Box from 'grommet/components/Box';
import { browserHistory } from 'react-router';
import { UserForm } from 'grommet-cms/components';
import { selectLogo } from 'grommet-cms/containers/Settings/selectors';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    this._handleLoggedInUser(loggedIn);
  }

  componentWillReceiveProps({ loggedIn }) {
    this._handleLoggedInUser(loggedIn);
  }

  _onChange(event) {
    const key = event.target.id;
    const val = event.target.value;
    let obj  = {};
    obj[key] = val;
    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state));
  }

  _handleLoggedInUser(loggedIn) {
    if (loggedIn && loggedIn === true) {
      browserHistory.push('/dashboard/homepage');
    }
  }

  render() {
    let loginError = (this.props.loginError !== '')
      ? <span>{this.props.loginError}</span>
      : null;

    let onSubmitClick = (this.state.username && this.state.password)
      ? this._onSubmit
      : null;
    
    const { logo } = this.props;

    return (
      <Box style={{ width: 576 }} full="vertical" pad="large" align="center" justify="center">
        <UserForm
          title="Login"
          username={this.state.username}
          password={this.state.password}
          onChange={this._onChange}
          onSubmit={onSubmitClick}
          logo={(() => {
            let props = {
              style: {
                width: 144,
                height: 'auto',
                maxHeight: 144
              }
            };
            if (logo.type.displayName !== 'Image') {
              props = {
                ...props,
                colorIndex: 'brand'
              };
            }
            return React.cloneElement(logo, props);
          })()}
          hasLogo
        />
          {loginError}
      </Box>
    );
  }
};

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  logo: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  const { loginRequest, loginError, loggedIn } = state.login;
  return {
    logo: selectLogo(state),
    loginRequest,
    loginError,
    loggedIn
  };
};

export default connect(mapStateToProps)(LoginPage);

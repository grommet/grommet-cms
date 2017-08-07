import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { userPost, userRequestError } from './actions';

import Box from 'grommet/components/Box';
import { UserForm } from 'grommet-cms/components';

export class DashboardUserForm extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  _onChange(event) {
    const key = event.target.id;
    const val = event.target.value;
    const obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.dispatch(userPost(this.state));
    } else {
      this.props.dispatch(userRequestError('Enter a username and password.'));
    }
  }

  render() {
    return (
      <Box pad="medium" justify="center" align="center">
        <UserForm
          title="Create User"
          username={this.state.username}
          password={this.state.password}
          onChange={this._onChange}
          onSubmit={this._onSubmit}
        />
        {this.props.error}
      </Box>
    );
  }
}

DashboardUserForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { request, error } = state.user;
  return {
    request,
    error
  };
}

export default connect(mapStateToProps)(DashboardUserForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserEditForm } from 'grommet-cms/components';
import { userPost, getUser } from 'grommet-cms/containers/Dashboard/DashboardUserForm/actions';
import Box from 'grommet/components/Box';

export class DashboardUserEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: '',
      role: {
        value: undefined,
        label: undefined
      },
      error: ''
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getUser(this.props.params.id))
    .then(({ user }) => this.setState({
      role: {
        value: user.role,
        label: (user.role === 0) ? 'Admin' : 'Editor'
      }
    }));
  }

  _onSubmit(data, event) {
    event.preventDefault();
    const { _id, username } = this.props.user;
    const dataToSubmit = {
      ...data,
      _id,
      username,
      role: data.role.value
    };

    this.props.dispatch(userPost(dataToSubmit));
  }

  _onChange({ target, value }) {
    const key = target.id;
    const val = value || target.value;
    let obj  = {};
    obj[key] = val;
    this.setState(obj);
  }

  _validate({ password, passwordConfirm, role }) {
    if (password && !passwordConfirm) return false;
    if (password && passwordConfirm && password !== passwordConfirm) return false;
    return true;
  }

  render() {
    const { error, role } = this.state;
    const submitMethod = this._validate(this.state)
      ? this._onSubmit.bind(this, this.state)
      : undefined;

    return (
      <Box>
        <UserEditForm
          onSubmit={submitMethod}
          onChange={this._onChange}
          role={role}
          loggedInRole={this.props.loggedInUser.role}
          title="User Edit"
          error={error}
        />
      </Box>
    );
  }
};

function mapStateToProps(state) {
  const { user: loggedInUser } = state.login;
  const { user } = state;

  return {
    loggedInUser,
    user
  };
}

export default connect(mapStateToProps)(DashboardUserEditPage);

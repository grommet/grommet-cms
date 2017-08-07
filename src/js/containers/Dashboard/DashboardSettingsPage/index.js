import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import { PageHeader } from 'grommet-cms/components';
import { Settings } from 'grommet-cms/containers';
import * as settingsActionCreators from 'grommet-cms/containers/Settings/actions';

export class DashboardSettingsPage extends Component {
  render() {
    return (
      <Box
        primary
        direction="column"
        full="horizontal"
      >
        <PageHeader
          title="Settings"
        />
        <Settings />
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    data: state.settings.data,
    error: state.settings.error,
    isLoading: state.settings.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      settingsActionCreators,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettingsPage);

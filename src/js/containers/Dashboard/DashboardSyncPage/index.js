import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import { Sync } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components';

export class DashboardSyncPage extends Component { // eslint-disable-line
  render() {
    return (
      <Box
        primary
        direction="column"
        full="horizontal"
      >
        <PageHeader
          title="Sync"
        />
        <Sync />
      </Box>
    );
  }
}

export default DashboardSyncPage;

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import AddIcon from 'grommet/components/icons/base/Add';
import { PageHeader } from 'grommet-cms/components';
import { PageTypes } from 'grommet-cms/containers';

class DashboardPageTypesPage extends Component {
  constructor() {
    super();
    this._onAddClick = this._onAddClick.bind(this);
  }

  _onAddClick() {
    browserHistory.push('/dashboard/pageTypes/create');
  }

  render() {
    return (
      <Box
        primary
        direction="column"
        full="horizontal"
      >
        <PageHeader
          title="Page Types"
          controls={
            <Anchor
              icon={<AddIcon size="small" />}
              label="Add Page Type"
              onClick={this._onAddClick}
            />
          }
        />
        <PageTypes />
      </Box>
    );
  }
}

export default DashboardPageTypesPage;

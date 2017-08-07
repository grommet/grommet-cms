// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import { PageHeader } from 'grommet-cms/components';
import { DashboardAssetsList } from 'grommet-cms/containers';

export class DashboardAssetsPage extends Component {
  render() {
    return (
      <Box full="horizontal">
        <PageHeader
          fixed={false}
          title="Assets"
          controls={
            <Button icon={<AddIcon />} path="/dashboard/asset/create">
              Add Asset
            </Button>
          }
        />
        <DashboardAssetsList
          allowMultiSelect
          type="page"
          showControls
          tileSize="small"
        />
      </Box>
    );
  }
};

export default DashboardAssetsPage;

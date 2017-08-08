import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import Anchor from 'grommet/components/Anchor';
import PageTypesForm from 'grommet-cms/containers/PageTypes/form';

class DashboardPageTypeEditPage extends Component { // eslint-disable-line
  render() {
    return (
      <Box
        primary
        direction="column"
        full="horizontal"
      >
        <Header size="small" colorIndex="light-2" style={{ maxHeight: 50 }}>
          <Box direction="row" pad={{ horizontal: 'medium' }}>
            <Anchor
              primary
              icon={<LinkPreviousIcon />}
              path="/dashboard/pageTypes"
            >
              All Page Types
            </Anchor>
          </Box>
        </Header>
        <Box align="center" pad="medium">
          <PageTypesForm params={this.props.params} action="Edit" />
        </Box>
      </Box>
    );
  }
}

export default DashboardPageTypeEditPage;

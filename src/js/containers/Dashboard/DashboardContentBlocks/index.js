import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import DashboardContentBlock from
  'grommet-cms/containers/Dashboard/DashboardContentBlock';
import { blockAddList, blockAdd } from './actions';

export class DashboardContentBlocks extends Component {

  constructor() {
    super();
    this._renderBlocks = this._renderBlocks.bind(this);
    this._onAddBlock = this._onAddBlock.bind(this);
  }

  componentWillMount() {
    // Check if parent component passed in blocks.
    if (this.props.blocks)
      this.props.dispatch(blockAddList(this.props.blocks));
  }

  _onAddBlock() {
    this.props.dispatch(blockAdd());
  }

  _renderBlocks() {
    if (this.props.contentBlocks) {
      if (this.props.contentBlocks.length > 0) {
        return (
          <Box>
            {this.props.contentBlocks.map(({ id }) =>
              <ListItem key={id}>
                <DashboardContentBlock id={id} />
              </ListItem>
            )}
          </Box>
        );
      }
    }
    return (
      <Box align="center" pad="small">
        <Box colorIndex="light-2" pad="large">
          <Heading tag="h3">
            No blocks here yet
          </Heading>
          <Button
            onClick={this._onAddBlock} 
            plain
            label="Add One" 
            icon={<AddIcon />} 
          />
        </Box>
      </Box>
    );
  }

  render() {
    return (
      <List>
        {this._renderBlocks()}
      </List>
    );
  }
};

DashboardContentBlocks.propTypes = {
  blocks: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { contentBlocks } = state;

  return {
    contentBlocks
  };
}

export default connect(mapStateToProps)(DashboardContentBlocks);

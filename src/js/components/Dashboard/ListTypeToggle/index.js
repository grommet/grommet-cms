// @flow
import React from 'react';
import SortIcon from 'grommet/components/icons/base/Sort';
import AppsIcon from 'grommet/components/icons/base/Apps';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import type { ListType } from 'grommet-cms/containers/Dashboard/DashboardAssetsList/flowTypes';

type State = {
  selectedIndex: number
}

type Props = {
  listType: ListType,
  onToggleSelected: (index: number) => void
}

export default class ListTypeToggle extends React.Component {
  props: Props;

  constructor() {
    super();
    this._toggleSelected = this._toggleSelected.bind(this);
    this.state = {
      selectedIndex: 0
    };
  }

  componentWillReceiveProps({ listType }: Props) {
    const selectedIndex = listType === 'Table' ? 0 : 1;
    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex
      });
    }
  }
  
  _toggleSelected: (index: number) => void;
  _toggleSelected(index: number) {
    const oldIndex = this.state.selectedIndex;
    this.setState({
      selectedIndex: index
    });
    if (index !== oldIndex) {
      this.props.onToggleSelected(index);
    }
  }
  
  state: State;
  
  render() {
    const { selectedIndex } = this.state;
    return (
      <Menu
        inline
        responsive={false}
        direction="row"
      >
        <Button
          style={selectedIndex === 0 ? { backgroundColor: '#f5f5f5' } : { backgroundColor: '#ffffff' }}
          onClick={() => this._toggleSelected(0)}
        >
          <Box
            align='center'
            justify='center'
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <SortIcon />
          </Box>
        </Button>
        <Button
          style={selectedIndex === 1 ? { backgroundColor: '#f5f5f5' } : { backgroundColor: '#ffffff' }}
          onClick={() => this._toggleSelected(1)}
        >
          <Box
            align='center'
            justify='center'
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <AppsIcon />
          </Box>
        </Button>
      </Menu>
    );
  }
}

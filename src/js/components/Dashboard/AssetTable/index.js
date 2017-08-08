/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import { TableHeader } from 'grommet-cms/components';
import { ListWrapper } from './styles';
import AssetTableRows from './rows';

type Props = {
  assets: any[],
  sortIndex: number,
  requiresSearch: boolean,
  sortAscending: boolean,
  onSort: (index: number, ascending: boolean) => void,
  onMore: () => void,
  onClickMenu: (action: any, item: any) => void,
  tableHeaders: string[],
  searchTerm: string,
  allowMultiSelect: boolean,
  noAssetsFound: ?Element,
  checkedIndices: number[],
  onClickCheckbox: (index: number, checked: boolean) => void
}

export default class AssetTable extends Component {
  static defaultProps = {
    allowMultiSelect: false
  }

  props: Props;
  render() {
    const {
      assets,
      sortIndex,
      requiresSearch,
      searchTerm,
      sortAscending,
      onSort,
      onMore,
      onClickMenu,
      tableHeaders,
      onClickCheckbox,
      allowMultiSelect,
      noAssetsFound,
      checkedIndices
    } = this.props;
    return (
      <ListWrapper pad={{ horizontal: 'small' }}>
        <Box style={{ width: '100vw', flex: '0 1 auto' }}>
          {!assets.length && noAssetsFound !== null ? noAssetsFound :
          <Table scrollable={false} onMore={onMore}>
            <TableHeader
              sortIndex={sortIndex}
              sortAscending={sortAscending}
              onSort={onSort}
              labels={allowMultiSelect
                ? tableHeaders
                : tableHeaders.slice(0, tableHeaders.length - 1)
              }
            />
            <AssetTableRows
              checkedIndices={checkedIndices}
              assets={assets}
              searchTerm={searchTerm}
              requiresSearch={requiresSearch}
              onClickCheckbox={onClickCheckbox}
              onClickMenu={onClickMenu}
              allowMultiSelect={allowMultiSelect}
            >
              {noAssetsFound}
            </AssetTableRows>
          </Table>
          }
        </Box>
      </ListWrapper>
    );
  }
}

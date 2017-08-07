import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getAssets,
  deleteAsset,
  assetsIncrementPage,
  getAssetsTotalCount,
  assetsClearPosts
} from 'grommet-cms/containers/Dashboard/Assets/actions';
import { selectAssets } from 'grommet-cms/containers/Dashboard/Assets/selectors';
import { toggleFilterReset } from 'grommet-cms/containers/Dashboard/DashboardAssetsList/actions';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import Anchor from 'grommet/components/Anchor';
import { AssetTile, WithLoading, AssetTable, ConfirmLayer } from 'grommet-cms/components';
import { highlightContent, uuid } from 'grommet-cms/utils';
import { selectSearchQuery, selectPostType, selectResetFilter, selectLayer, selectConfirmLayerName } from './selectors';
import { fromIndex } from './tableHeaders';
import AnimatingToolbar from './animatingToolbar';
import { openConfirmLayer, closeConfirmLayer, setCheckBox, clearSelectedIndicies } from './actions';

export class AssetsList extends Component {
  constructor() {
    super();
    this._handleMore = this._handleMore.bind(this);
    this._renderNoAssetsFound = this._renderNoAssetsFound.bind(this);
    this._onClickMenu = this._onClickMenu.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._fetchAssets = this._fetchAssets.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onClickCheckbox = this._onClickCheckbox.bind(this);
    this._onAssetToolbarClick = this._onAssetToolbarClick.bind(this);
    this.state = {
      hasCalledForMore: false
    };
  }

  componentWillMount() {
    const { currentPage, postType, searchTerm } = this.props;
    const page = currentPage || 1;
    this.props.dispatch(getAssets(page, true, postType));
    this.props.dispatch(getAssetsTotalCount(postType, searchTerm));
  }

  componentWillUnmount() {
    this.props.dispatch(assetsClearPosts());
  }

  componentWillReceiveProps(nextProps) {
    const { resetFilter, currentPage, table } = nextProps;
    if (resetFilter === true) {
      this.props.dispatch(assetsClearPosts());
      this._fetchAssets(this.props, true);
      this.props.dispatch(toggleFilterReset());
    }
    if (currentPage > this.props.currentPage) {
      this._fetchAssets(nextProps);
    }
    if (table.ascending !== this.props.table.ascending ||
      table.sortIndex !== this.props.table.sortIndex) {
      this._fetchAssets(nextProps);
    }
  }

  componentDidUpdate({ requiresSearch, assets }) {
    if (!requiresSearch && this.props.requiresSearch) {
      this._handleSearch();
      this.props.onSearchRequest();
    }
    if (assets !== this.props.assets) {
      setTimeout(() => {
        this.setState({ hasCalledForMore: false });
      }, 1000);
    }
  }

  _fetchAssets(props = this.props, showLoading = false) {
    const { currentPage, postType, searchTerm, table } = props;
    const orderBy = fromIndex(table.sortIndex);
    this.props.dispatch(
      getAssets(
        currentPage,
        showLoading,
        postType,
        searchTerm,
        JSON.stringify(table.ascending),
        orderBy
      )
    );
    this.props.dispatch(getAssetsTotalCount(postType, searchTerm, false));
  }

  _onClickCheckbox(index, checked) {
    this.props.dispatch(setCheckBox(index, checked));
  }

  _handleSearch() {
    this._fetchAssets();
    this.props.onSearchRequest();
  }

  _onDeleteClick(asset) {
    this.props.dispatch(openConfirmLayer(asset));
  }

  _onDeleteSubmit() {
    const { asset } = this.props.layer;
    if (asset && asset._id) {
      this._onLayerClose();
      this.props.dispatch(deleteAsset(asset._id));
    } else {
      const { checkedIndices } = this.props.table.checkBoxes;
      if (checkedIndices.length > 0) {
        this.props.dispatch(clearSelectedIndicies());
        this._onLayerClose();
        checkedIndices.forEach((index) => {
          const asset = this.props.assets[index];
          this.props.dispatch(deleteAsset(asset._id));
        });
      }
    }
  }

  _onLayerClose() {
    this.props.dispatch(closeConfirmLayer());
  }

  _onClickMenu(action, asset) {
    if (action === 'DELETE') {
      this._onDeleteClick(asset);
    } else {
      if (this.props.onAssetSelect) {
        this.props.onAssetSelect(asset);
      } else {
        this.context.router.push(`dashboard/asset/${asset._id}`);
      }
    }
  }

  _handleMore() {
    const { currentPage, totalCount, perPage, assets } = this.props;
    if (totalCount > currentPage * perPage) {
      if (assets && assets.length&& !this.state.hasCalledForMore) {
        this.props.dispatch(assetsIncrementPage());
        this.setState({
          hasCalledForMore: true
        });
      }
    }
  }

  _renderNoAssetsFound() {
    const { searchTerm, request, assets, onClear } = this.props;
    if (request || assets.length) {
      return null;
    }
    return (
      <Box pad="medium" align="center">
        <Heading tag="h2">
          {searchTerm !== ''
            ? `No assets found for search term ${searchTerm}`
            : "No assets found."
          }
        </Heading>
        <Box>
          <Heading tag="h5">
            {'Suggestion: '}
            <Anchor onClick={onClear}>reset filters</Anchor>
            {' to see them all.'}
          </Heading>
        </Box>
      </Box>
    );
  }

  _onAssetToolbarClick: () => void;
  _onAssetToolbarClick() {
    const { assets } = this.props;
    const { checkedIndices } = this.props.table.checkBoxes;
    let selectedAssets = assets.filter((_, i) => checkedIndices.includes(i));
    if (this.props.onAssetsSelect) {
      this.props.onAssetsSelect(selectedAssets);
    }
  }

  render() {
    const {
      request,
      onSort,
      assets,
      totalCount,
      requiresSearch,
      tileSize,
      onAssetSelect,
      searchTerm,
      showControls,
      listType,
      layer,
      table,
      isInLayer,
      confirmLayerName,
      allowMultiSelect
    } = this.props;
    const hasMore = assets && assets.length && assets.length < totalCount;
    const assetBlocks = (assets.length > 0 && !request)
      && assets.map((asset) => {
        const { _id, title, path } = asset;
        return (
          <AssetTile
            key={`asset-${_id}-${uuid()}`}
            id={_id}
            showControls={showControls}
            onClick={onAssetSelect ? onAssetSelect.bind(this, { _id, title, path }) : null}
            size={tileSize}
            onDeleteClick={this._onDeleteClick.bind(this, asset)}
            title={searchTerm !== '' ? highlightContent(searchTerm, title) : title}
            path={path}
          />
        );
      }
      );


    return (
      <WithLoading isLoading={request}>
        <Box full="horizontal">
          <AnimatingToolbar
            isVisible={(allowMultiSelect && table.checkBoxes.checkedIndices.length > 0)}
            onClick={isInLayer ?  this._onAssetToolbarClick : this._onDeleteClick.bind(this, null)}
            buttonType={isInLayer ? 'SUBMIT' : 'DELETE'}
          />
          {layer.visible &&
            <ConfirmLayer
              name={confirmLayerName}
              onSubmit={this._onDeleteSubmit}
              onClose={this._onLayerClose}
            />
          }
          {listType === 'Table' ?
            <AssetTable
              requiresSearch={requiresSearch}
              allowMultiSelect={allowMultiSelect}
              onClickCheckbox={this._onClickCheckbox}
              onClickMenu={this._onClickMenu}
              onMore={hasMore ? () => this._handleMore() : null}
              sortIndex={table.sortIndex}
              sortAscending={table.ascending}
              tableHeaders={table.headers}
              onSort={onSort}
              checkedIndices={table.checkBoxes.checkedIndices}
              assets={assets}
              noAssetsFound={this._renderNoAssetsFound()}
              searchTerm={searchTerm}
            />
          :
            <List onMore={hasMore ? () => this._handleMore() : null}>
              <Box
                align="center"
                direction="row"
                wrap={true}
                justify="center"
              >
                {assetBlocks}
              </Box>
              {this._renderNoAssetsFound()}
            </List>
          }
        </Box>
      </WithLoading>
    );
  }
};

AssetsList.propTypes = {
  request: PropTypes.bool.isRequired,
  isInLayer: PropTypes.bool.isRequired,
  assets: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  tileSize: PropTypes.string,
  allowMultiSelect: PropTypes.bool.isRequired,
  onAssetSelect: PropTypes.func,
  onClear: PropTypes.func,
  searchTerm: PropTypes.string,
  postType: PropTypes.string,
  resetFilter: PropTypes.bool,
  table: PropTypes.object.isRequired,
  showControls: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  layer: PropTypes.object.isRequired,
  confirmLayerName: PropTypes.string
};

AssetsList.contextTypes = {
  router: PropTypes.object.isRequired
};

AssetsList.defaultProps = {
  showControls: true,
  isInLayer: false,
  tileSize: 'small'
};

function mapStateToProps(state, props) {
  const { error, request, currentPage, perPage, totalCount } = state.assets;
  return {
    error,
    currentPage,
    totalCount,
    perPage,
    assets: selectAssets(state),
    layer: selectLayer(state),
    confirmLayerName: selectConfirmLayerName(state),
    request,
    resetFilter: selectResetFilter(state),
    searchTerm: selectSearchQuery(state),
    postType: selectPostType(state)
  };
}

export default connect(mapStateToProps)(AssetsList);

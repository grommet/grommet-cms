// @flow
import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import {
  getAssetsPostTypes,
  getAssets
} from 'grommet-cms/containers/Dashboard/Assets/actions';
import { AssetFilterLayer, ListTypeToggle } from 'grommet-cms/components';
import { isLetter } from 'grommet-cms/utils';
import type { Props, State } from './flowTypes';
import * as ActionCreators from './actions';
import AssetsList from './list';
import parseOptions from './parseOptions';

export class DashboardAssetsList extends Component {
  props: Props;
  state: State;

  _interval: ?any;

  constructor() {
    super();
    this._interval = null;
    this._onSearch = this._onSearch.bind(this);
    this._onToggleForm = this._onToggleForm.bind(this);
    this._onChangePostTypes = this._onChangePostTypes.bind(this);
    this._onSubmitFilterForm = this._onSubmitFilterForm.bind(this);
    this._onCancelFilterForm = this._onCancelFilterForm.bind(this);
    this._loadAssetCategories = this._loadAssetCategories.bind(this);
    this._onClearFilters = this._onClearFilters.bind(this);
    this._onSearchPostTypes = this._onSearchPostTypes.bind(this);
    this._onSearchKeyUp = this._onSearchKeyUp.bind(this);
    this._onSearchKeyDown = this._onSearchKeyDown.bind(this);
    this._onToggleListType = this._onToggleListType.bind(this);
    this._onSortTable = this._onSortTable.bind(this);
    this._handleKeyboardShortcut = this._handleKeyboardShortcut.bind(this);
    this._addKeyboardShortcut = this._addKeyboardShortcut.bind(this);
    this.state = {
      requiresSearch: false,
      postTypes: {
        isFiltering: false,
        filteredOptions: []
      }
    };
  }

  componentWillMount() {
    this._loadAssetCategories();
    this._addKeyboardShortcut();
  }

  componentWillReceiveProps({ postTypes, searchTerm }: Props) {
    if (postTypes && postTypes.length && postTypes !== this.props.postTypes) {
      const options = parseOptions(postTypes);
      this.props.actions.setFormOptions(options, 'postTypes');
      this.props.actions.setFormFunctions('postTypes', this._onChangePostTypes);
    }
    if (searchTerm.length < this.props.searchTerm.length) {
      this.setState({ requiresSearch: true });
    }
  }

  componentWillUnmount() {
    this._onClearFilters();
    this._removeKeyboardShortcut();
  }

  _addKeyboardShortcut: () => void;
  _addKeyboardShortcut() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this._handleKeyboardShortcut);
    }
  }

  _removeKeyboardShortcut: () => void;
  _removeKeyboardShortcut() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this._handleKeyboardShortcut);
    }
  }

  _handleKeyboardShortcut: (event: Event) => void;
  _handleKeyboardShortcut(event: Event) {
    if (event.ctrlKey && event.keyCode === 70) {
      this._onToggleForm();
    }
  }

  _loadAssetCategories: () => void;
  _loadAssetCategories() {
    this.props.actions.getAssetsPostTypes();
  }

  _onSubmitFilterForm: () => void;
  _onSubmitFilterForm() {
    this.props.actions.toggleFilterReset();
    this.props.actions.toggleForm();
  }

  _onCancelFilterForm: () => void;
  _onCancelFilterForm() {
    this.props.actions.clearForm();
    this._loadAssetCategories();
    this.props.actions.getAssets();
  }

  _onSearch: (event: Event) => void;
  _onSearch(event: Event) {
    const searchTerm = event.target.value || '';
    this.props.actions.setSearchTerm(searchTerm);
  }

  _onSearchKeyUp: (e: Event) => void;
  _onSearchKeyUp(e: Event) {
    if (isLetter(e)) {
      this._interval = setTimeout(() => {
        this.setState({ requiresSearch: true });
      }, 1000);
    }
  }

  _onSearchKeyDown: (e: Event) => void;
  _onSearchKeyDown(e: Event) {
    if (isLetter(e)) {
      if (typeof this._interval !== null) { // eslint-disable-line
        clearTimeout(this._interval);
      }
    }
  }

  _onSearchPostTypes: (event: Event) => void;
  _onSearchPostTypes(e: Event) {
    const term = (e: any).target.value;
    const re = new RegExp(term, 'gi');
    const { options } = this.props.form.postTypes.fieldProps;
    if (options && options.length) {
      const filteredOptions = options.filter(({ label }) => re.test(label));
      if (term !== '') {
        this.setState({
          postTypes: {
            isFiltering: true,
            filteredOptions
          }
        });
      } else {
        this.setState({
          postTypes: {
            isFiltering: false,
            filteredOptions: []
          }
        });
      }
    }
  }

  _onChangePostTypes: (postType: { value: string }) => void;
  _onChangePostTypes({ value }: { value: string }) {
    this.props.actions.setFormFieldValue(value, 'postTypes');
  }

  _onToggleForm: () => void;
  _onToggleForm() {
    this.props.actions.toggleForm();
  }

  _onClearFilters: () => void;
  _onClearFilters() {
    this.props.actions.setSearchTerm('');
    this._onCancelFilterForm();
  }

  _onToggleListType: () => void;
  _onToggleListType() {
    this.props.actions.toggleListType();
  }

  _onSortTable: (index: number, ascending: boolean) => void;
  _onSortTable(index: number, ascending: boolean) {
    this.props.actions.setSortIndex(index);
    this.props.actions.toggleTableSortOrder(ascending);
  }

  render() {
    const {
      layerVisible,
      form,
      searchTerm,
      onAssetSelect,
      onAssetsSelect,
      tileSize,
      showControls,
      listType,
      table,
      isInLayer,
      allowMultiSelect
    } = this.props;
    return (
      <Box full="horizontal">
        <Box pad="small" direction="row" align="start" responsive={false}>
          <Box flex>
            <Search
              inline
              onKeyUp={this._onSearchKeyUp}
              onKeyDown={this._onSearchKeyDown}
              value={searchTerm}
              placeHolder="Start typing to search assets..."
              onDOMChange={this._onSearch}
            />
          </Box>
          <AssetFilterLayer
            form={form}
            filteredOptions={this.state.postTypes.filteredOptions}
            isFiltering={this.state.postTypes.isFiltering}
            onSearchPostTypes={this._onSearchPostTypes}
            onSubmit={this._onSubmitFilterForm}
            onCancel={this._onCancelFilterForm}
            layerVisible={layerVisible}
            onToggle={this._onToggleForm}
          />
          <ListTypeToggle
            listType={listType}
            onToggleSelected={this._onToggleListType}
          />
        </Box>
        <Article
          className="dashboard--assets-page"
          primary
          align="center"
        >
          <AssetsList
            allowMultiSelect={allowMultiSelect}
            isInLayer={isInLayer}
            listType={listType}
            showControls={showControls}
            table={table}
            onAssetsSelect={onAssetsSelect || null}
            onAssetSelect={onAssetSelect || null}
            onClear={this._onClearFilters}
            requiresSearch={this.state.requiresSearch}
            onSearchRequest={() => this.setState({ requiresSearch: false })}
            searchTerm={searchTerm}
            checkedIndices={table.checkBoxes.checkedIndices}
            tileSize={tileSize || 'small'}
            onSort={this._onSortTable}
          />
        </Article>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  layerVisible: state.assetsList.layerVisible,
  form: state.assetsList.form,
  postTypes: state.assets.postTypes,
  searchTerm: state.assetsList.searchTerm,
  listType: state.assetsList.listType,
  table: state.assetsList.table
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(
    { ...ActionCreators, getAssetsPostTypes, getAssets },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAssetsList);

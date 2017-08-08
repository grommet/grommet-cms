// @flow
import type { GrommetCustomTypes$SelectValueType } from 'grommet';

export type TOGGLE_FORM_TYPE = 'DASH_ASSETS_LIST/TOGGLE_FORM';
export type SET_FORM_OPTIONS_TYPE = 'DASH_ASSETS_LIST/SET_FORM_OPTIONS';
export type SET_SEARCH_TERM_TYPE = 'DASH_ASSETS_LIST/SET_SEARCH_TERM';
export type SET_FORM_FUNCTIONS_TYPE = 'DASH_ASSETS_LIST/SET_FORM_FUNCTIONS';
export type SET_FORM_FIELD_VALUE_TYPE = 'DASH_ASSETS_LIST/SET_FORM_FIELD_VALUE';
export type CLEAR_FORM_TYPE = 'DASH_ASSETS_LIST/CLEAR_FORM';
export type TOGGLE_LIST_TYPE_TYPE = 'DASH_ASSETS_LIST/TOGGLE_LIST_TYPE';
export type TOGGLE_FILTER_RESET_TYPE = 'DASH_ASSETS_LIST/TOGGLE_FILTER_RESET';
export type TOGGLE_TABLE_SORT_ORDER_TYPE = 'DASH_ASSETS_LIST/TOGGLE_TABLE_SORT_ORDER';
export type SET_SORT_INDEX_TYPE = 'DASH_ASSETS_LIST/SET_SORT_INDEX';
export type SET_CHECK_BOX_TYPE = 'DASH_ASSETS_LIST/SET_CHECK_BOX'
export type OPEN_CONFIRM_LAYER_TYPE = 'DASH_ASSETS_LIST/OPEN_CONFIRM_LAYER';
export type CLOSE_CONFIRM_LAYER_TYPE = 'DASH_ASSETS_LIST/CLOSE_CONFIRM_LAYER';
export type CLEAR_SELECTED_INDICIES_TYPE = 'DASH_ASSETS_LIST/CLEAR_SELECTED_INDICIES';

export type ListType = 'Tiles' | 'Table';
export type SortOrder = 'Asc' | 'Desc';

export type Asset = { id: string, name: string };

type DashboardAssetsListFormType = {
  label: string,
  help: string,
  fieldProps: {
    value: string,
    options: GrommetCustomTypes$SelectValueType[],
    inline: boolean,
    multiple: boolean,
    onChange: Function
  }
}

type CheckBoxes = {
  checkedIndices: any[]
}

type Table = {
  ascending: boolean,
  sortIndex: number,
  checkBoxes: CheckBoxes
}

type Layer = {
  visible: boolean,
  asset: ?Asset
}

export type DashboardAssetsListState = {
  searchTerm: string,
  layerVisible: boolean,
  listType: ListType,
  table: Table,
  layer: Layer,
  form: {
    postTypes: DashboardAssetsListFormType
  },
  resetFilter: boolean
}

export type DashboardAssetsListAction = {
  type: TOGGLE_FORM_TYPE | SET_FORM_OPTIONS_TYPE |
    SET_SEARCH_TERM_TYPE | SET_FORM_FIELD_VALUE_TYPE |
      TOGGLE_FILTER_RESET_TYPE | SET_FORM_FUNCTIONS_TYPE |
        CLEAR_FORM_TYPE,
  term?: string,
  options?: GrommetCustomTypes$SelectValueType[],
  form?: 'pageTypes' | 'postTypes',
  checked?: boolean,
  index?: number,
  onChange?: Function,
  value?: any,
  asset?: Asset,
  ascending?: boolean
}

export type State = {
  requiresSearch: boolean,
  postTypes: {
    isFiltering: boolean,
    filteredOptions: ?GrommetCustomTypes$SelectValueType[]
  }
}

export type DashboardAssetsListProps = {
  allowMultiSelect: boolean,
  layerVisible: boolean,
  searchTerm: string,
  isInLayer: boolean,
  table: Table,
  pageTypes: any,
  postTypes: any,
  listType: ListType,
  form: {
    postTypes: DashboardAssetsListFormType
  },
  onAssetSelect?: Function,
  onAssetsSelect?: (assets: Asset[]) => void,
  tileSize?: 'small' | 'medium',
  showControls: boolean,
}

export type DispatchProps = {
  actions: {
    getAssetsPostTypes: Function,
    toggleForm: Function,
    setFormOptions: Function,
    setFormFunctions: Function,
    setFormFieldValue: Function,
    clearForm: Function,
    setSearchTerm: Function,
    toggleFilterReset: Function,
    getAssets: Function,
    toggleListType: Function,
    setSortIndex: Function,
    toggleTableSortOrder: Function,
    setCheckBox: Function,
    openConfirmLayer: Function,
    closeConfirmLayer: Function
  }
}

export type Post = {
  title: string,
  id: string,
}

export type Props = DispatchProps & DashboardAssetsListProps;

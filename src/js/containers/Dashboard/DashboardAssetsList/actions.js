// @flow
import type { GrommetCustomTypes$SelectValueType } from 'grommet';
import type { DashboardAssetsListAction, Asset } from './flowTypes';
import * as ActionTypes from './constants';

export const toggleForm = (): DashboardAssetsListAction => ({
  type: ActionTypes.TOGGLE_FORM
});

export const setFormOptions =
  (
    options: GrommetCustomTypes$SelectValueType[],
    form: 'postTypes'
  ): DashboardAssetsListAction => ({
    type: ActionTypes.SET_FORM_OPTIONS,
    options,
    form
  });

export const setFormFunctions = (
  form: 'postTypes',
  onChange: Function
): DashboardAssetsListAction => ({
  type: ActionTypes.SET_FORM_FUNCTIONS,
  onChange,
  form
});

export const setCheckBox = (index: number, checked: boolean): DashboardAssetsListAction => ({
  type: ActionTypes.SET_CHECK_BOX,
  index,
  checked
});

export const setSearchTerm = (term: string): DashboardAssetsListAction => ({
  type: ActionTypes.SET_SEARCH_TERM,
  term
});

export const toggleListType = (): DashboardAssetsListAction => ({
  type: ActionTypes.TOGGLE_LIST_TYPE
});

export const toggleTableSortOrder = (ascending: boolean) => ({
  type: ActionTypes.TOGGLE_TABLE_SORT_ORDER,
  ascending
});

export const setSortIndex = (index: number) => ({
  type: ActionTypes.SET_SORT_INDEX,
  index
});

export const clearSelectedIndicies = () => ({
  type: ActionTypes.CLEAR_SELECTED_INDICIES
});

export const setFormFieldValue =
  (value: any, form: 'postTypes'): DashboardAssetsListAction => ({
    type: ActionTypes.SET_FORM_FIELD_VALUE,
    form,
    value
  });

export const clearForm = (): DashboardAssetsListAction => ({
  type: ActionTypes.CLEAR_FORM
});

export const toggleFilterReset = (): DashboardAssetsListAction => ({
  type: ActionTypes.TOGGLE_FILTER_RESET
});

export const openConfirmLayer = (asset: Asset): DashboardAssetsListAction => ({
  type: ActionTypes.OPEN_CONFIRM_LAYER,
  asset
});

export const closeConfirmLayer = (): DashboardAssetsListAction => ({
  type: ActionTypes.CLOSE_CONFIRM_LAYER
});

// @flow
import tableHeaders from './tableHeaders';
import * as ActionTypes from './constants';
import type { DashboardAssetsListState, DashboardAssetsListAction } from './flowTypes';

const initialState: DashboardAssetsListState = {
  layerVisible: false,
  searchTerm: '',
  resetFilter: false,
  listType: 'Table',
  table: {
    ascending: false,
    sortIndex: 3,
    headers: tableHeaders,
    checkBoxes: {
      checkedIndices: []
    }
  },
  layer: {
    visible: false,
    asset: null
  },
  form: {
    postTypes: {
      label: 'Page Filter',
      help: 'Select a page to filter assets by the page they are used in.',
      fieldProps: {
        placeHolder: 'Select a page filter',
        value: '',
        options: [],
        inline: false,
        onChange: e => e,
        multiple: false
      }
    }
  }
};

export default function assetsList(
  state: DashboardAssetsListState = initialState,
  action: DashboardAssetsListAction
): DashboardAssetsListState {
  switch (action.type) {
    case ActionTypes.CLEAR_SELECTED_INDICIES:
      return {
        ...state,
        table: {
          ...state.table,
          checkBoxes: {
            checkedIndices: []
          }
        }
      };
    case ActionTypes.SET_CHECK_BOX: {
      if (action.checked) {
        return {
          ...state,
          table: {
            ...state.table,
            checkBoxes: {
              checkedIndices: [
                ...state.table.checkBoxes.checkedIndices,
                action.index
              ]
            }
          }
        };
      }
      return {
        ...state,
        table: {
          ...state.table,
          checkBoxes: {
            checkedIndices: state.table.checkBoxes.checkedIndices
              .filter(item => item !== action.index)
          }
        }
      };
    }
    case ActionTypes.OPEN_CONFIRM_LAYER:
      return {
        ...state,
        layer: {
          visible: true,
          asset: action.asset
        }
      };
    case ActionTypes.CLOSE_CONFIRM_LAYER:
      return {
        ...state,
        layer: {
          visible: false,
          asset: null
        }
      };
    case ActionTypes.TOGGLE_TABLE_SORT_ORDER:
      return {
        ...state,
        table: {
          ...state.table,
          ascending: action.ascending
        }
      };
    case ActionTypes.SET_SORT_INDEX:
      return {
        ...state,
        table: {
          ...state.table,
          sortIndex: action.index
        }
      };
    case ActionTypes.TOGGLE_LIST_TYPE:
      return {
        ...state,
        listType: state.listType === 'Table' ? 'Tiles' : 'Table'
      };
    case ActionTypes.TOGGLE_FILTER_RESET:
      return {
        ...state,
        resetFilter: !state.resetFilter
      };
    case ActionTypes.CLEAR_FORM:
      return initialState;
    case ActionTypes.SET_FORM_FIELD_VALUE: {
      const formAction = action.form || '';
      return {
        ...state,
        form: {
          ...state.form,
          [`${formAction}`]: {
            ...state.form[`${formAction}`],
            fieldProps: {
              ...state.form[`${formAction}`].fieldProps,
              value: action.value
            }
          }
        }
      };
    }
    case ActionTypes.SET_FORM_FUNCTIONS: {
      const formAction = action.form || '';
      return {
        ...state,
        form: {
          ...state.form,
          [`${formAction}`]: {
            ...state.form[`${formAction}`],
            fieldProps: {
              ...state.form[`${formAction}`].fieldProps,
              onChange: action.onChange
            }
          }
        }
      };
    }
    case ActionTypes.SET_FORM_OPTIONS: {
      const formAction = action.form || '';
      return {
        ...state,
        form: {
          ...state.form,
          [`${formAction}`]: {
            ...state.form[`${formAction}`],
            fieldProps: {
              ...state.form[`${formAction}`].fieldProps,
              options: action.options
            }
          }
        }
      };
    }
    case ActionTypes.TOGGLE_FORM:
      return {
        ...state,
        layerVisible: !state.layerVisible
      };
    case ActionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.term
      };
    default:
      return state;
  }
}

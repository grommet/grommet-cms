import initialState from './state';
import * as T from './constants';
import swapItemOrder from './swapItemOrder';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case T.REQUEST_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case T.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data
      };
    case T.CONFIRM_DELETION:
      return {
        ...state,
        layer: {
          isVisible: true,
          itemToDelete: action.index
        }
      };
    case T.CANCEL_DELETION:
      return {
        ...state,
        layer: {
          isVisible: false,
          itemToDelete: null
        }
      };
    case T.DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        layer: {
          isVisible: false,
          itemToDelete: null
        }
      };
    case T.FORM_INPUT:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: {
            value: action.value
          }
        }
      };
    case T.GET_PAGE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        form: {
          ...state.form,
          title: {
            value: action.pageType.title
          },
          description: {
            value: action.pageType.description
          }
        }
      };
    case T.CLEAR_FORM:
      return {
        ...state,
        form: initialState.form
      };
    case T.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case T.REORDER_PAGE_TYPE:
      return {
        ...state,
        data: swapItemOrder(action.index, state.data, action.direction)
      };
    case T.SUBMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default: return state;
  }
}

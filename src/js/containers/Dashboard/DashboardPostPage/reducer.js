/* @flow */
import * as T from './constants';
import type {
  DashboardPostPageAction,
  DashboardPostPageState
} from './flowTypes';
import initialState from './state';

const dashboardPost = (
  state: DashboardPostPageState = initialState,
  action: DashboardPostPageAction
): DashboardPostPageState => {
  switch (action.type) {
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
    case T.POST_TOGGLE_HELP: {
      const formName = action.formName || 'sectionLayoutForm';
      return {
        ...state,
        [`${formName}`]: {
          ...state[`${formName}`],
          showHelp: !state[`${formName}`].showHelp
        }
      };
    }
    case T.POST_TOGGLE_ADVANCED_LAYOUT:
      return {
        ...state,
        sectionLayoutForm: {
          ...state.sectionLayoutForm,
          showAdvancedLayoutOptions: 
            !state.sectionLayoutForm.showAdvancedLayoutOptions
        }
      };
    case T.POST_SECTION_SET_MESSAGE:
      return {
        ...state,
        toastMessage: action.message
      };
    case T.POST_SECTION_CLEAR_MESSAGE:
      return {
        ...state,
        toastMessage: null
      };
    case T.POST_SECTION_FORM_RESET:
      return {
        ...state,
        sectionLayoutForm: initialState.sectionLayoutForm
      };
    case T.POST_BOX_LAYOUT_FORM_RESET:
      return {
        ...state,
        boxLayoutForm: initialState.boxLayoutForm
      };
    case T.SHOW_BOX_LAYOUT_FORM:
      return {
        ...state,
        boxLayoutForm: {
          ...state.boxLayoutForm,
          isVisible: !state.boxLayoutForm.isVisible,
          selectedContentBlockId: action.index
        }
      };
    case T.SHOW_SECTION_FORM:
      return {
        ...state,
        sectionLayoutForm: {
          ...state.sectionLayoutForm,
          isVisible: !state.sectionLayoutForm.isVisible,
          selectedSection: action.index
        }
      };
    case T.POST_SECTION_FORM_INPUT: {
      if (action.name === 'name') {
        return {
          ...state,
          sectionLayoutForm: {
            ...state.sectionLayoutForm,
            name: {
              value: action.value || ''
            }
          }
        };
      } else {
        const field = state.sectionLayoutForm.fields
          .filter((item) => item.name === action.name)[0];
        const index = state.sectionLayoutForm.fields.indexOf(field);
        return {
          ...state,
          sectionLayoutForm: {
            ...state.sectionLayoutForm,
            fields: [
              ...state.sectionLayoutForm.fields.slice(0, index),
              {
                ...state.sectionLayoutForm.fields[index],
                value: action.value || ''
              },
              ...state.sectionLayoutForm.fields.slice(index + 1)
            ]
          }
        };
      }
    }
    case T.POST_BOX_LAYOUT_FORM_INPUT: {
      const field = state.boxLayoutForm.fields
        .filter((item) => item.name === action.name)[0];
      const index = state.boxLayoutForm.fields.indexOf(field);

      return {
        ...state,
        boxLayoutForm: {
          ...state.boxLayoutForm,
          fields: [
            ...state.boxLayoutForm.fields.slice(0, index),
            {
              ...state.boxLayoutForm.fields[index],
              value: action.value
            },
            ...state.boxLayoutForm.fields.slice(index + 1)
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default dashboardPost;

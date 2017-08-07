import initialState from './state';
import * as T from './constants';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case T.REMOVE_LOGO:
      return {
        ...state,
        form: {
          branding: {
            ...state.form.branding,
            logo: null
          }
        }
      };
    case T.CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      };
    case T.SUBMIT_DATA_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.SUBMIT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message
      };
    case T.SUBMIT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case T.LOAD_DATA_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        form: {
          branding: {
            ...state.form.branding,
            logo: action.data.branding.logo,
            title: action.data.branding.title,
            theme: {
              ...state.form.branding.theme,
              value: state.form.branding.theme.options.filter(i => i.value === action.data.branding.theme)[0]
            }
          }
        }
      };
    case T.LOAD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case T.FORM_INPUT: {
      if (action.field === 'theme') {
        return {
          ...state,
          form: {
            ...state.form,
            branding: {
              ...state.form.branding,
              theme: {
                ...state.form.branding.theme,
                value: action.value
              }
            }
          }
        };
      }
      return {
        ...state,
        form: {
          ...state.form,
          [action.formType]: {
            ...state.form[action.formType],
            [action.field]: action.value
          }
        }
      };
    }
    case T.ADD_LOGO_FILE:
      return {
        ...state,
        files: [
          ...state.files,
          action.file
        ]
      };
    case T.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default: return state;
  }
}

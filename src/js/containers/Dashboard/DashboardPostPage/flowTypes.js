// @flow
export type SHOW_SECTION_FORM_TYPE =
  'DASHBOARD_POST_PAGE/SHOW_SECTION_FORM';
export type POST_SECTION_FORM_INPUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_INPUT';
export type POST_SECTION_FORM_RESET_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_RESET';
export type POST_SECTION_SET_MESSAGE_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_SET_MESSAGE';
export type POST_SECTION_CLEAR_MESSAGE_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_CLEAR_MESSAGE';
export type POST_TOGGLE_BOX_LAYOUT_FORM_TYPE =
  'DASHBOARD_POST_PAGE/POST_TOGGLE_BOX_LAYOUT_FORM';
export type POST_BOX_LAYOUT_FORM_INPUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_BOX_LAYOUT_FORM_INPUT';
export type SHOW_BOX_LAYOUT_FORM_TYPE =
  'DASHBOARD_POST_PAGE/SHOW_BOX_LAYOUT_FORM';
export type POST_BOX_LAYOUT_FORM_RESET_TYPE =
  'DASHBOARD_POST_PAGE/POST_BOX_LAYOUT_FORM_RESET';
export type POST_TOGGLE_ADVANCED_LAYOUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_TOGGLE_ADVANCED_LAYOUT';
export type POST_TOGGLE_HELP_TYPE =
  'DASHBOARD_POST_PAGE/POST_TOGGLE_HELP';
export type CONFIRM_DELETION_TYPE =
  'DASHBOARD_POST_PAGE/CONFIRM_DELETION';
export type CANCEL_DELETION_TYPE =
  'DASHBOARD_POST_PAGE/CANCEL_DELETION';

export type PaddingOptions = 'none' | 'small' | 'medium' | 'large';
export type BasisOptions = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' |
  'xxlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'none';

export type SectionFormSubmission = {
  name: string,
  id: string,
  padding: PaddingOptions,
  basis: BasisOptions,
  wrap: boolean
}

export type Layer = {
  isVisible: boolean,
  itemToDelete: ?number
}

export type DashboardPostPageState = {
  layer: Layer,
  toastMessage: ?string,
  sectionLayoutForm: {
    showAdvancedLayoutOptions: boolean,
    showHelp: boolean,
    title: string,
    isVisible: boolean,
    selectedSection: ?number,
    name: {
      value: string
    },
    fields: Array<{
      label: string,
      name: string,
      type: "Select",
      options: Array<string>,
      value: ?string
    }>
  },
  boxLayoutForm: {
    title: string,
    isVisible: boolean,
    showHelp: boolean,
    selectedContentBlockId: ?number,
    fields: Array<{
      label: string,
      name: string,
      type: "Select" | "CheckBox",
      options: ?Array<string>,
      value: ?string
    }>
  },
}

export type DashboardPostPageAction = {
  type: SHOW_SECTION_FORM_TYPE | POST_SECTION_FORM_INPUT_TYPE |
    POST_SECTION_FORM_RESET_TYPE | POST_SECTION_SET_MESSAGE_TYPE |
      POST_SECTION_CLEAR_MESSAGE_TYPE | POST_BOX_LAYOUT_FORM_INPUT_TYPE |
        SHOW_BOX_LAYOUT_FORM_TYPE | POST_BOX_LAYOUT_FORM_RESET_TYPE |
        POST_TOGGLE_ADVANCED_LAYOUT_TYPE | POST_TOGGLE_HELP_TYPE
        | CONFIRM_DELETION_TYPE | CANCEL_DELETION_TYPE,
  name?: string,
  value?: string,
  index?: ?number,
  message?: string,
  formName?: string
}

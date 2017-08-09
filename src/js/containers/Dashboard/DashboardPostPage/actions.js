/* @flow */
import * as T from './constants';
import type { DashboardPostPageAction } from './flowTypes';

export const toggleSectionForm =
  (index: ?number): DashboardPostPageAction => ({
    type: T.SHOW_SECTION_FORM,
    index
  });

export const postSectionFormInput =
  (name?: string, value?: string): DashboardPostPageAction => ({
    type: T.POST_SECTION_FORM_INPUT,
    name: name || '',
    value: value || ''
  });

export const postSectionFormReset =
  (): DashboardPostPageAction => ({
    type: T.POST_SECTION_FORM_RESET
  });

export const postSectionSetToastMessage =
  (message: string): DashboardPostPageAction => ({
    type: T.POST_SECTION_SET_MESSAGE,
    message
  });

export const postSectionClearToastMessage =
  (): DashboardPostPageAction => ({
    type: T.POST_SECTION_CLEAR_MESSAGE
  });

export const toggleBoxLayoutForm = (index: number) => ({
  type: T.SHOW_BOX_LAYOUT_FORM,
  index
});

export const postBoxLayoutFormInput =
  (name?: string, value?: string): DashboardPostPageAction => ({
    type: T.POST_BOX_LAYOUT_FORM_INPUT,
    name: name || '',
    value: value || ''
  });

export const postBoxLayoutFormReset =
  (): DashboardPostPageAction => ({
    type: T.POST_BOX_LAYOUT_FORM_RESET
  });

export const postToggleAdvancedLayout = (): DashboardPostPageAction => ({
  type: T.POST_TOGGLE_ADVANCED_LAYOUT
});

export const postToggleHelp = (formName: string = 'sectionLayoutForm'): DashboardPostPageAction => ({
  type: T.POST_TOGGLE_HELP,
  formName
});

export function confirmDeletion(index: number): DashboardPostPageAction {
  return {
    type: T.CONFIRM_DELETION,
    index
  };
}

export function cancelDeletion(): DashboardPostPageAction {
  return {
    type: T.CANCEL_DELETION
  };
}


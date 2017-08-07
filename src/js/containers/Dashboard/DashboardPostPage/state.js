/* @flow */
import type { DashboardPostPageState } from './flowTypes';

const initialState: DashboardPostPageState = {
  toastMessage: null,
  layer: {
    isVisible: false,
    itemToDelete: null
  },
  sectionLayoutForm: {
    showAdvancedLayoutOptions: true,
    showHelp: false,
    isVisible: false,
    title: "Section Layout",
    subtitle: "Set the layout of the section / flex container",
    selectedSection: null,
    name: {
      value: ''
    },
    fields: [
      {
        label: "Flex Direction",
        help: "How should the content flow?  Row: left to right, Column: top to bottom.",
        name: "direction",
        type: "Select",
        options: ["row", "column"],
        value: 'row'
      }
    ]
  },
  boxLayoutForm: {
    selectedContentBlockId: null,
    isVisible: false,
    showHelp: false,
    title: "Box Layout",
    fields: [
      {
        label: "New Line",
        help: "Should this content block start on a new line?",
        name: "newLine",
        type: "CheckBox",
        options: null,
        value: 'false'
      },
      {
        label: 'Width',
        help: 'Use to acheive a column layout that will scale when responding',
        type: 'Select',
        name: 'basis',
        options: ['1/3', '2/3', 'full'],
        value: '1/3'
      }
    ]
  }
};

export default initialState;

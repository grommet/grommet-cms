import { createSelector } from 'reselect';

export const selectAssetsList = () => state => state.assetsList;

export const selectSearchQuery = createSelector(
  selectAssetsList(),
  assetsList => assetsList.searchTerm
);

export const selectResetFilter = createSelector(
  selectAssetsList(),
  assetsList => assetsList.resetFilter
);

export const selectPostType = createSelector(
  selectAssetsList(),
  assetsList => {
    const { postTypes } = assetsList.form;
    return postTypes.fieldProps.value.value;
  }
);

export const selectTable = createSelector(
  selectAssetsList(),
  assetsList => assetsList.table
);

export const selectLayer = createSelector(
  selectAssetsList(),
  assetsList => assetsList.layer
);

export const selectConfirmLayerName = createSelector(
  selectTable,
  table => {
    if (table.checkBoxes.checkedIndices.length > 0) {
      return `${table.checkBoxes.checkedIndices.length} asset(s)`;
    }
    return 'this asset';
  }
);

import { createSelector } from 'reselect';

export const selectPageTypesState = () => state => state.pageTypes;
export const selectParams = () => (_, props) => props.params;

export const selectIsLoading = createSelector(
  selectPageTypesState(),
  pageTypes => pageTypes.isLoading
);

export const selectError = createSelector(
  selectPageTypesState(),
  pageTypes => pageTypes.error
);

export const selectData = createSelector(
  selectPageTypesState(),
  pageTypes => {
    if (!pageTypes.data) {
      return null;
    }
    return pageTypes.data.sort((a, b) => a.sortOrder - b.sortOrder);
  }
);

export const selectPageTypesList = createSelector(
  selectData,
  data => {
    if (!data) {
      return [];
    }
    return data.map(({ title, slug }) => ({ label: title, value: slug }));
  }
);

export const selectLayer = createSelector(
  selectPageTypesState(),
  pageTypes => pageTypes.layer
);

export const selectForm = createSelector(
  selectPageTypesState(),
  pageTypes => pageTypes.form
);

export const selectFormSubmission = createSelector(
  selectPageTypesState(),
  selectParams(),
  (pageTypes, params) => {
    let formSubmission = {
      title: pageTypes.form.title.value,
      description: pageTypes.form.description.value
    };
    if (params && params.id) {
      formSubmission._id = params.id;
    }
    return formSubmission;
  }
);

export const selectItemToDelete = createSelector(
  selectPageTypesState(),
  pageTypes => {
    const { data } = pageTypes;
    const { itemToDelete } = pageTypes.layer;
    if (itemToDelete === null) {
      return null;
    }
    return data[itemToDelete];
  }
);

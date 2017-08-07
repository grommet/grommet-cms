import { createSelector } from 'reselect';
import { slugify } from 'grommet-cms/utils';

export const selectDashboardPost = () => state => state.dashboardPost;
export const selectPosts = () => state => state.posts;

export const selectPostSectionFormSubmission = createSelector(
  selectDashboardPost(),
  dashboardPost => {
    const { name, fields } = dashboardPost.sectionLayoutForm;
    return {
      name: name.value,
      id: slugify(name.value),
      layout: fields.map((field, i) =>
        ({
          value: field.value,
          name: field.name
        })
      )
    };
  }
);

export const selectLayer = createSelector(
  selectDashboardPost(),
  dashboardPost => dashboardPost.layer
);

export const selectBoxLayoutFormSubmission = createSelector(
  selectDashboardPost(),
  dashboardPost => {
    const { fields } = dashboardPost.boxLayoutForm;
    return fields.map((field, i) =>
      ({
        value: field.value,
        name: field.name
      })
    );
  }
);

export const selectAdvancedLayoutOptions = createSelector(
  selectDashboardPost(),
  dashboardPost => dashboardPost.sectionLayoutForm.showAdvancedLayoutOptions
);


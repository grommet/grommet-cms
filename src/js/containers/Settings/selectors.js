import React from 'react'; // eslint-disable-line
import { createSelector } from 'reselect';
import logoMap from './logoMap';

export const selectSettingsState = () => state => state.settings;

export const selectIsLoading = createSelector(
  selectSettingsState(),
  settings => settings.isLoading
);

export const selectError = createSelector(
  selectSettingsState(),
  settings => settings.error
);

export const selectData = createSelector(
  selectSettingsState(),
  settings => settings.data
);

export const selectLogo = createSelector(
  selectData,
  (data) => {
    let logo = logoMap.HPE;
    if (data && data.branding) {
      if (!data.branding.logo) {
        const theme = data.branding.theme || 'HPE';
        logo = logoMap[theme];
        return logo;
      }
      return logoMap.logo(data.branding.logo);
    }
    return logo;
  }
);

export const selectMessage = createSelector(
  selectSettingsState(),
  settings => settings.message
);

export const selectSettingsForm = createSelector(
  selectSettingsState(),
  settings => settings.form
);

export const selectSubmission = createSelector(
  selectSettingsState(),
  settings => ({
    branding: {
      ...settings.form.branding,
      theme: settings.form.branding.theme.value.value,
      logo: settings.form.branding.logo ? settings.form.branding.logo._id : ''
    }
  })
);

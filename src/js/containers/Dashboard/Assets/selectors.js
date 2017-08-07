import { createSelector } from 'reselect';

export const selectAssetsState = () => state => state.assets;

export const selectAssets = createSelector(
  selectAssetsState(),
  assets => assets.posts
);

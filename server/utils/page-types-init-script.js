#!/usr/bin/env node
import colors from 'colors';
import PageType from '../models/PageType';
import buildPageTypeCollection from './build-page-type-collection';
import buildSettingsCollection from './build-settings-collection';

export default function initScript() {
  PageType.find({}).exec((err, pageTypes) => {
    if (pageTypes.length === 0) {
      console.log(colors.green('Running page type init script'));
      buildPageTypeCollection()
        .then(() => buildSettingsCollection())
        .catch(() => {
          console.error(`An error has occured while running db init script ${JSON.stringify(err)}`);
        });
    }
  });
}

import Settings from '../models/Settings';
import createBanner from './banner';

const initialData = {
  branding: {
    title: 'HPE Opensource',
    theme: 'HPE'
  }
};

const createSettings = (data) =>
  new Promise((res) => {
    Settings.create(
      data,
      (err, savedSettings) => {
        if (err) {
          throw err;
        }
  
        createBanner('Created settings collection');
  
        res(savedSettings);
      }
    );
  });

export default function buildSettings() {
  return new Promise((res, rej) => {
    Settings.findOne({}).exec((err, post) => {
      createBanner('Settings not found, creating new Settings.');

      return createSettings(initialData)
        .then(() => res());
    });
  });
}

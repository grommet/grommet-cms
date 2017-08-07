import PageType from '../models/PageType';
import createBanner from './banner';

const initialPageTypes = [
  {
    title: 'Home',
    description: '',
    slug: 'home'
  }
];

export default function buildPageTypes() {
  createBanner('Starting to build page types');
  return new Promise((res, rej) => {
    PageType.find({}).exec((err, pageTypes) => {
      if (pageTypes.length === 0) {
        setTimeout(() => {
          PageType.create(
            initialPageTypes,
            (err) => {
              if (err) {
                createBanner('Error creating page types', 'red');
                throw err;
              }
              createBanner('Created page type collection');
              res();
            }
          );
        }, 5000);
      } else {
        res();
      }
    });
  });
}

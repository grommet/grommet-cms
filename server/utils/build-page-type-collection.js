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
  return new Promise((res) => {
    PageType.find({}).exec((err, pageTypes) => {
      if (pageTypes.length === 0) {
        setTimeout(() => {
          PageType.create(
            initialPageTypes,
            (pageTypeErr) => {
              if (pageTypeErr) {
                createBanner('Error creating page types', 'red');
                throw pageTypeErr;
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

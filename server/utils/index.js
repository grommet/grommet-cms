import colors from 'colors';
import path from 'path';
import fs from 'fs';

export const baseDir = path.join(__dirname, '..', '..');

export const debug = (location = '', error = '') => {
  if (process.env.DEBUG) {
    return console.log(colors.green('[DEBUG LOG]'), colors.yellow(location, error));
  }

  return undefined;
};

export const apiPrefix = ({ API_PREFIX }) => {
  if (API_PREFIX) {
    return `/${API_PREFIX}/api`;
  }

  return '/api';
};

export const findIdInArray = (id, array) => array.find(item => String(item._id) === id);

export const getFileTimestamp = () => {
  const today = new Date();
  const yy = today.getFullYear().toString().substr(-2);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  if (dd < 10) {
    dd = '0' + dd; // eslint-disable-line
  }
  if (mm < 10) {
    mm = '0' + mm; // eslint-disable-line
  }

  return `${mm}${dd}${yy}`;
};

export const updateAssetPaths = ({ sections, assets }) =>
  new Promise((resolve) => {
    if (sections.length === 0) {
      resolve(sections);
    }

    const updatedSections = sections.slice();

    sections.map(({ contentBlocks }, sectionIndex) => {
      if (contentBlocks && contentBlocks.length > 0) {
        contentBlocks.map((contentBlock, contentBlockIndex) => {
          const { blockType, image, carousel, ctaArray, asset, video } = contentBlock;
          switch (blockType) {
            case "BlockImage":
            case "BlockVideo":
              if (image && image._id) {
                const lookup = findIdInArray(image._id, assets);
                updatedSections[sectionIndex]
                .contentBlocks[contentBlockIndex]
                .image.path = lookup && lookup.path || image.path;
              }
              if (video && video._id) {
                const lookup = findIdInArray(video._id, assets);
                updatedSections[sectionIndex]
                .contentBlocks[contentBlockIndex]
                .video.path = lookup && lookup.path || video.path;
              }
              break;
            case "BlockImageGallery":
            case "BlockCarousel":
            case "BlockCarouselWithContent":
            case "BlockMarquee":
              if (carousel && carousel.length > 0) {
                carousel.map((slide, slideIndex) => {
                  const lookup = findIdInArray(slide.image._id, assets);
                  updatedSections[sectionIndex]
                  .contentBlocks[contentBlockIndex]
                  .carousel[slideIndex].image.path = lookup && lookup.path || image.path;
                });
              }
              break;
            case "BlockParagraphCTAs":
              if (ctaArray && ctaArray.length > 0) {
                ctaArray.map((slide, slideIndex) => {
                  if (slide._id) {
                    const lookup = findIdInArray(slide._id, assets);
                    updatedSections[sectionIndex]
                    .contentBlocks[contentBlockIndex]
                    .ctaArray[slideIndex].path = lookup && lookup.path || slide.path;
                  }
                });
              }
              break;
            case "BlockButton":
              if (asset && contentBlock.assetType === 'path') {
                const lookup = findIdInArray(asset._id, assets);
                updatedSections[sectionIndex]
                .contentBlocks[contentBlockIndex]
                .asset.path = lookup && lookup.path || asset.path;
              }
              break;
          }
        });
      }

      if (sectionIndex === sections.length - 1) {
        resolve(updatedSections);
      }
    });
  });

export const parseAssets = (sections, thumbnail) =>
  new Promise((resolve) => {
    const assetArray = [];

    // Add page's thumbnail image to asset list.
    if (thumbnail) assetArray.push(thumbnail);

    if (sections.length === 0) {
      resolve(assetArray);
    }

    sections.map(({ contentBlocks }, index) => {
      if (contentBlocks && contentBlocks.length > 0) {
        contentBlocks.map((contentBlock) => {
          const { blockType, image, carousel, ctaArray, asset, video } = contentBlock;
          switch (blockType) {
            case "BlockImage":
            case "BlockVideo":
              if (image && image._id) assetArray.push(image._id);
              if (video && video._id) assetArray.push(video._id);
              break;
            case "BlockImageGallery":
            case "BlockCarousel":
            case "BlockCarouselWithContent":
            case "BlockMarquee":
              if (carousel && carousel.length > 0) {
                carousel.map((slide) => {
                  assetArray.push(slide.image._id);
                });
              }
              break;
            case "BlockParagraphCTAs":
              if (ctaArray && ctaArray.length > 0) {
                ctaArray.map((slide) => {
                  // If the slide has id we know it is an asset.
                  if (slide._id) {
                    assetArray.push(slide._id);
                  }
                });
              }
              break;
            case "BlockButton":
              if (asset && contentBlock.assetType === 'path') {
                assetArray.push(asset._id);
              }
              break;
          }
        });
      }

      if (index === sections.length - 1) {
        resolve(assetArray);
      }
    });
  });

export const createFile = (filePath, content) =>
  new Promise((resolve) => {
    fs.writeFile(filePath, content, () => {
      debug('File created', `${filePath}`);
      resolve(filePath);
    });
  });

export const deleteFile = filePath =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      return fs.unlink(filePath, (err) => {
        debug('File deleted', `${filePath}`);
        if (err) return reject(err);
        return resolve(filePath);
      });
    }

    return resolve(filePath);
  });

export const nodeEnv = process.env.NODE_ENV || 'development';

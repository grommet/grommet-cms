import express from 'express';
import { Post } from '../models/Post';
import PageTypes from '../models/PageType';
import groupBy from '../utils/groupBy';

const router = express.Router();

router.get('/pages', (req, res) => {
  Post.find()
    .exec((err, pages) => {
      if (err) {
        return res.status(400).send(err);
      }
      const mappedPages = pages
        .filter(i => i._type !== 'home').map(item =>
        ({
          id: item._id,
          title: item.title
        })
      );
      return res.status(200).send(mappedPages);
    });
});

// Get Posts
router.get('/routes', (req, res) => {
  PageTypes.find()
    .sort({
      sortOrder: 1
    })
    .exec((err, pageTypes) => {
      if (err) {
        return res.status(400).send(err);
      }
      const routes = pageTypes.map(({ title, slug }) => ({ label: title, slug }));
      return res.status(200).send({
        routes
      });
    });
});

router.get('/tiles', (req, res) => {
  const { currentTile } = req.query;
  PageTypes.find()
    .sort({
      sortOrder: 1
    })
    .exec((err, pageTypes) => { // eslint-disable-line
      if (err) {
        return res.status(400).send(err);
      }
      Post
        .find()
        .populate('image')
        .populate('pageType')
        .sort({
          sortOrder: 1
        })
        .exec((err, posts) => { // eslint-disable-line
          if (err) {
            return res.status(400).send({
              message: err
            });
          }
          const getCategory = item => item.category;
          const mappedPosts = posts
            .filter(i => i.pageType.slug !== 'home').map(item =>
            ({
              title: item.title,
              tileSize: item.tileSize,
              tileTextColor: item.tileTextColor,
              image: item.image,
              category: item.pageType.title
            })
          );

          const postTiles = groupBy(mappedPosts, getCategory);
          const postTileMap = Object.keys(postTiles)
            .sort((a, b) => {
              const first = pageTypes.filter(i => i.title === a)[0];
              const second = pageTypes.filter(i => i.title === b)[0];
              return first.sortOrder - second.sortOrder;
            })
            .map(item =>
              ({
                title: item,
                subtitle: pageTypes.filter(i => i.title === item)[0].description,
                tiles: postTiles[item]
              })
            ).filter(item => item.tiles.length > 0);

          if (currentTile && currentTile !== '') {
            const decodedTitle = decodeURIComponent(currentTile);
            const tileTitleRE = new RegExp(decodedTitle, 'gi');
            const allTiles = [].concat.apply([], postTileMap.map(i => i.tiles)); // eslint-disable-line
            const titleSelector = item => item.title && item.title.includes('-')
              ? item.title.split('-').join(' ')
              : item.title;
            const selectedItem = allTiles
              .filter(i => tileTitleRE.test(titleSelector(i).replace('.', '')))[0];
            const selectedItemIndex = allTiles.indexOf(selectedItem);
            if (selectedItemIndex > -1) {
              const previous = allTiles[selectedItemIndex - 1] || {};
              const next = allTiles[selectedItemIndex + 1] || {};
              const returnVal = {
                previous,
                next
              };
              res.status(200).send(returnVal);
            } else {
              res.status(400).send({
                message: 'Unknown current tile query'
              });
            }
          } else {
            res.status(200).send(postTileMap);
          }
        });
    });
});

export default router;

import express from 'express';
import { Post } from '../models/Post';
import { unslugify } from '../utils/slugify';
import groupBy from '../utils/groupBy';

const router = express.Router();

// Search the post models by title
router.get('/search', (req, res) => {
  if (req.query.query) {
    const { query } = req.query;

    let matchedContentBlocks = new Map();
    Post.find()
    .$where(`this._type !== 'home'`)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (posts && posts.length) {
        const cleanQuery = query.replace(/[^a-zA-Z ]/g, "");
        const re = new RegExp(cleanQuery, 'gi');
        let filteredPosts = [];
        posts.forEach((post) => {
          if (re.test(post.title)) {
            filteredPosts.push(post);
          } else {
            post.sections.forEach((section, i) => {
              section.contentBlocks.forEach((block) => {
                if (re.test(block.content)) {
                  if (filteredPosts.indexOf(post) === -1) {
                    // Post not yet in the array, so push it
                    matchedContentBlocks.set(post.title, block);
                    filteredPosts.push(post);
                  }
                }
              });
            });
          }
        });
        const selectContent = (item) => {
          if (matchedContentBlocks.get(item.title)) {
            return matchedContentBlocks.get(item.title).content;
          }
          if (item.sections && item.sections.length) {
            if (item.sections[0].contentBlocks.length) {
              const firstBlock = item.sections[0].contentBlocks[0].content;
              if (item.sections[0].contentBlocks.length === 1) {
                return firstBlock;
              }
            }
          }
          return '';
        };
        const mappedPages = filteredPosts.map((item) => ({
          title: item.title,
          content: selectContent(item),
          category: unslugify(item._type)
        }));
        const getCategory = (item) => item.category;
        const sortedPages = mappedPages.sort((a, b) => {
          if (a.content === '' && b.content !== '') {
            return -1;
          } else if (a.content !== '' && b.content === '') {
            return 1;
          }
          return 0;
        });
        const groupedPages = groupBy(sortedPages, getCategory);
        const pageMap = Object.keys(groupedPages).map((item) => 
          ({
            title: item,
            results: groupedPages[item]
          })
        );
        const searchResults = [
          {
            title: 'All Results',
            results: mappedPages
          },
          ...pageMap
        ];
        if (!mappedPages.length) {
          const message = `No results found for search term ${req.query.query}`;
          return res.status(200).send({ message });
        }
        return res.status(200).send(searchResults);
      } else {
        const message = `No results found for search term ${req.query.query}`;
        return res.status(200).send({ message });
      }
    });
  }
});

export default router;

import express from 'express';
import PageType from '../models/PageType';
import { Post } from '../models/Post';
import { isAdmin } from '../middleware/auth';
import { slugify } from '../utils/slugify';

const router = express.Router();

// Get PageTypes
router.get('/pageTypes', (req, res) => {
  PageType
    .find()
    .exec((err, pageTypes) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(pageTypes);
    });
});

// Get a pageType by ID
router.get('/pageType/:id', (req, res) => {
  PageType
    .findById(req.params.id)
    .exec((err, pageType) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(pageType);
    });
});

// Create a pageType
router.post('/pageType/create', isAdmin, (req, res) => {
  PageType.create({
    title: req.body.title,
    description: req.body.description,
    slug: slugify(req.body.title)
  }, (err, pageType) => {
    if (err) {
      return res.status(400).send();
    }
    return res.status(200).send(pageType);
  });
});

// Edit / Update a pageType
router.post('/pageType/:id', isAdmin, (req, res) => {
  PageType
    .findById(req.params.id)
    .exec((err, pageType) => {
      pageType.title = req.body.title;
      pageType.description = req.body.description;
      pageType.slug = slugify(pageType.title);
      if (req.body.sortOrder) {
        pageType.sortOrder = req.body.sortOrder;
      }

      return pageType.save(() => {
        if (err) {
          return res.status(400).send();
        }
        return res.status(200).send(pageType);
      });
    });
});

// Delete a page type
router.post('/pageType/:id/delete', isAdmin, (req, res) => {
  PageType.findOne({ _id: req.params.id }).remove().exec((err) => {
    if (err) {
      return res.status(400).send({ message: 'Unauthorized' });
    }

    return Post.find({ pageType: req.params.id })
    .remove()
    .exec((postErr) => {
      if (postErr) {
        return res.status(400).send({ message: 'Unauthorized' });
      }
      return res.status(200).send('success');
    });
  });
});

export default router;

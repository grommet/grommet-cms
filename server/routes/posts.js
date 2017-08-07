import express from 'express';
const router = express.Router();
import { Post } from '../models/Post';
import PageType from '../models/PageType';
import { isAuthed } from '../middleware/auth';
import { parseAssets, updateAssetPaths } from '../utils';
import { slugify } from '../utils/slugify';

// Get Posts
router.get('/posts', function(req, res) {
  const page = (req.query.page)
    ? Number(req.query.page)
    : 0;

  const { type } = req.query || '';
  if (type && type !== '') {
    PageType.findOne({ slug: type })
    .exec((err, pageType) => { // eslint-disable-line consistent-return
      if (err) {
        return res.status(400).send(err);
      }
      const params = pageType ? { pageType: pageType._id } : {};
      if (page === 0) {
        Post
          .find(params)
          .populate('image')
          .sort({
            sortOrder: 1
          })
          .exec((err, posts) => {
            if (err) {
              return res.status(400).send(err);
            }

            return res.status(200).send(posts);
          });
      } else {
        Post.find(params)
          .skip(skip)
          .limit(limit)
          .populate('image')
          .sort({
            sortOrder: 1
          }).exec((err, posts) => {
            if (err) {
              return res.status(400).send(err);
            }

            return res.status(200).send(posts);
          });
      } 
    });
  } else {
    if (page === 0) {
      Post
      .find()
      .populate('image')
      .sort({
        sortOrder: 1
      })
      .exec((err, posts) => {
        if (err) {
          return res.status(400).send(err);
        }

        return res.status(200).send(posts);
      });
    } else {
      Post.find()
        .skip(skip)
        .limit(limit)
        .populate('image')
        .sort({
          sortOrder: 1
        }).exec((err, posts) => {
          if (err) {
            return res.status(400).send(err);
          }

          return res.status(200).send(posts);
        });
    }
  }
});

// Get Posts route list
router.get('/posts/routes', function(req, res) {
  Post.find({}, '_id title slug pageType').populate('pageType').exec(function (err, posts) { // eslint-disable-line consistent-return
    if (err) {
      return res.status(400).send(err);
    }

    // Many pieces of the app rely on the _type property so we need to update this static string
    // property with the new dynamic pageType property.
    const updatedPostTypes = [];
    posts.map((post, postIndex) => { // eslint-disable-line consistent-return
      const postObject = post.toObject();
      postObject._type = postObject.pageType.slug;
      delete postObject.pageType;
      updatedPostTypes.push(postObject);

      if (postIndex === posts.length -1) {
        return res.status(200).send(updatedPostTypes);
      }
    });
  });
});

// Get Post by ID
router.get('/post/:id', function(req, res) {
  Post.findOne({'_id': req.params.id }).populate('image assets').exec(function(err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    return updateAssetPaths(post.toObject())
    .then((sections) => res.status(200).send({ ...post.toObject(), sections }))
    .catch((err) => {
      return res.status(400).send(err);
    });

  });
});

// Get Post by slug
router.get('/post/title/:slug', function(req, res) {
  Post.findOne({'slug': req.params.slug }).populate('image assets').exec(function(err, post) {
    if (!post) {
      return res.status(404).send({ message: 'The requested post was not found' });
    }
    if (err) {
      return res.status(400).send(err);
    }

    return updateAssetPaths(post.toObject())
    .then((sections) => res.status(200).send({ ...post.toObject(), sections }));
  });
});

// Create Post
router.post('/post/create', isAuthed, function(req, res) {
  parseAssets(req.body.sections, req.body.image)
  .then((assets) => {
    PageType.findOne({ slug: req.body._type })
      .exec((err, pageType) => {
        Post.create({
          assets,
          title: req.body.title || '',
          subtitle: req.body.subtitle || '',
          date: new Date(req.body.date).toISOString(),
          slug: slugify(req.body.title),
          image: (req.body.image && req.body.image._id) ? req.body.image._id : '',
          sections: req.body.sections,
          pageType: pageType._id,
          createdAt: Date.now()
        }, function (err, post) {
          if (err) {
            console.log(`Post error: ${err}, ${post}`);
            return res.status(400).send(err);
          }
          return res.status(200).send(post);
        });
      });
  })
  .catch(err => res.status(400).send());
});

// Edit Post
router.post('/post/:id', isAuthed, function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return res.status(400).send(err);
    }

    return parseAssets(req.body.sections, req.body.image)
    .then((assets) => {
      post.title = req.body.title;
      post.subtitle = req.body.subtitle;
      post.slug = slugify(req.body.title);
      post.tileSize = req.body.tileSize;
      post.tileTextColor = req.body.tileTextColor;
      post.sections = req.body.sections;
      post.image = (req.body.image) ? req.body.image._id : undefined;
      post.assets = assets;
      post.createdAt = req.body.createdAt;
      post.sortOrder = req.body.sortOrder;
      post.modifiedAt = new Date();

      return post.save(function(err) {
        if (err) return res.status(400).send(err);
        return res.status(200).send(post);
      });
    })
    .catch(err => res.status(400).send());
  });
});

// Delete Post
router.post('/post/:id/delete', isAuthed, function(req, res) {
  Post.findOne({'_id' : req.params.id }).remove().exec(function(err) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send('success');
  });
});

router.get('/posts/latest', function(req, res) {
  Post.find()
  .$where(`this._type !== 'home'`)
  .populate('image')
  .sort({'modifiedAt': -1}).limit(4)
  .exec(function(err, posts) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(posts);
  });
});

export default router;

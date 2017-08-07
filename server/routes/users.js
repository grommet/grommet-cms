var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var isAuthed = require('../middleware/auth').isAuthed;
var isAdmin = require('../middleware/auth').isAdmin;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Get users route ** auth
router.get('/users', isAdmin, (req, res) => {
  User.find().sort({'_id': -1}).exec((err, users) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(users);
  });
});

router.post('/user/login', passport.authenticate('local'), function(req, res) {
  const userRole =  (req.user.role !== undefined)
    ? req.user.role
    : 1;

  res.status(200).send({
    _id: req.user._id,
    username: req.user.username,
    role: userRole
  });
});

router.get('/user/logout', isAuthed, function(req, res) {
  req.logout();
  res.status(200).send('success');
});

router.get('/user/:id', isAuthed, (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }

    return res.status(200).send(user);
  });
});

router.post('/user/register', isAdmin, (req, res) => {
  User.register(new User({
    username : req.body.username,
    role: 1
  }), req.body.password, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }

    return res.status(200).send(user);
  });
});

router.post('/user/:id/delete', isAdmin, (req, res) => {
  return User.findOne({'_id' : req.params.id }).remove().exec((err) => {
    if (err) {
      return res.status(400).send({ message: 'Unauthorized' });
    }

    return res.status(200).send('success');
  });
});

router.post('/user/:id/edit', isAuthed, (req, res) => {
  if (req.user.role > 0 && req.user._id.toString() !== req.params.id) {
    return res.status(401).send({
      message: 'Unauthorized.'
    });
  }

  return User.findOne({'_id' : req.params.id }).exec((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }

    const { password, passwordConfirm, role } = req.body;
    const saveUser = (userToSave) => 
      userToSave.save((err, savedUser) => {
        if (err) {
          return res.status(400).send({
            message: err
          });
        }
        
        return res.status(200).send(savedUser);
      });

    user.role = role;

    if (password !== '' && passwordConfirm !== '' && password === passwordConfirm) {
      return user.setPassword(password, (data) => saveUser(user));
    } else {
      return saveUser(user);
    }
  });
});

module.exports = router;

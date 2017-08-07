import express from 'express';
import Settings from '../models/Settings';
import updateTheme from '../Theme';
import { nodeEnv } from '../utils';
import { isAdmin } from '../middleware/auth';

const router = express.Router();

// Get Settings
router.get('/settings', (req, res) => {
  Settings
    .findOne()
    .populate('branding.logo')
    .exec((err, settings) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(settings);
    });
});

// Edit / Update Settings
router.post('/settings/edit', isAdmin, (req, res) => {
  Settings
    .findOne()
    .exec((err, settings) => {
      if (err) {
        return res.status(400).send();
      }
      const prevTheme = settings.branding.theme;
      settings.branding.title = req.body.branding.title || "";
      settings.branding.logo = req.body.branding.logo ? req.body.branding.logo : undefined;
      settings.branding.theme = req.body.branding.theme;

      return settings.save((err, savedSettings) => {
        if (err) {
          return res.status(400).send();
        }

        const message = 'Success! The settings were successfully updated!';

        if (prevTheme !== savedSettings.branding.theme) {
          return updateTheme(savedSettings.branding.theme)
          .then((updatedTheme) => {
            return res.status(200).send({
              settings: savedSettings.toObject(),
              updateView: (nodeEnv !== 'production') ? true : false,
              message: (nodeEnv !== 'production')
                ? message
                : 'Success! Grommet CMS is now updating and restarting. This process can take up to 5 minutes.'
            });
          });
        } else {
          return res.status(200).send({
            settings: savedSettings.toObject(),
            updateView: false,
            message
          });
        }
      });
    });
});

export default router;

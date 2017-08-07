import express from 'express';
import path from 'path';
import colors from 'colors';
import { isAdmin } from '../middleware/auth';

const router = express.Router();
const exec = require('child_process').exec;
const baseDir = path.join(__dirname, '..', '..');

const sync = (action, postId, resourceType) =>
  new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    if (action !== 'pull' && action !== 'push') {
      return reject({
        message: 'Invalid action. Push or pull are accepted actions.'
      });
    }

    let singleCmd = '';
    if (postId) {
      singleCmd = ` --single ${postId}`;
    }
    if (resourceType) {
      switch(resourceType) {
        case 'assets':
          singleCmd = ` --assets`;
          break;
        case 'notifications':
          singleCmd = ` --notifications`;
          break;
      }
    }
    const syncScript = exec(`sh ${baseDir}/mongo-sync ${action}${singleCmd}`);
    syncScript.stdout.on('data', (data) => {
      const dataString = data.trim();
      console.log(colors.green(dataString));
      if (dataString === 'Done!') {
        resolve({
          message: 'success'
        });
      }
    });

    syncScript.stderr.on('data', (data) => {
      const dataString = data.trim();
      console.log(colors.cyan(dataString));
      if (dataString === 'Done!') {
        resolve({
          message: 'success'
        });
      }
    });

    syncScript.on('exit', (err) => { // eslint-disable-line consistent-return
      if (err === 1) return reject({
        message: 'Error syncing environments.'
      });
    });
  });

router.post('/sync/:action', isAdmin, (req, res) => {
  const { action } = req.params;
  const { postId, resourceType } = req.query;

  sync(action, postId, resourceType)
  .then(data => res.status(200).send(data))
  .catch(err => res.status(400).send(err));
});

export default router;

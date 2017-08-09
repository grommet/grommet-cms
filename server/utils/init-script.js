import mongoose from 'mongoose';
import colors from 'colors/safe';
import User from '../models/User';
import pageTypeScript from './page-types-init-script';

// Use native promises
mongoose.Promise = global.Promise;

const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
const defaultUsername = 'temp-cms-admin';
const defaultPassword = `temp-cms-password-${randomNumber}`;

function callback(err) {
  if (err) console.log(colors.red('Error creating temp admin: ', err));

  console.log(colors.green(`Created user: "${defaultUsername}" password: "${defaultPassword}"`));
  console.log(colors.green('This user SHOULD be deleted once a new user has been created in the dashboard.'));
}

function generateTempAdminUser() {
  User.find().exec((err, user) => {
    if (err) console.log(colors.red('Error: ', err));

    if (user.length === 0) {
      User.register(new User({
        username: defaultUsername,
        role: 0
      }), defaultPassword, callback);
    }
  });
}

export default function initScript() {
  generateTempAdminUser();
  pageTypeScript();
}

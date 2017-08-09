import colors from 'colors';
import themeMap from '../../src/scss/grommetThemeMap';
import { baseDir, createFile, deleteFile, nodeEnv } from '../utils';
import scssTemplate from './scssTemplate';

const exec = require('child_process').exec;

const rebuildDist = () => {
  const bundleScript = exec(`sh ${baseDir}/server/Theme/build`);
  bundleScript.stdout.on('data', (data) => {
    const dataString = data.trim();
    console.log(colors.green(dataString));
  });

  bundleScript.on('exit', (err) => { // eslint-disable-line consistent-return
    if (err === 1) {
      console.log(colors.red('Error building theme:', err));
    }
  });
};

export const updateTheme = theme =>
  new Promise((resolve) => {
    const stylesDir = `${baseDir}/src/scss`;
    const fullFilePath = `${stylesDir}/index.scss`;
    const themePath = themeMap[theme];
    const content = scssTemplate(themePath);

    deleteFile(fullFilePath)
    .then(() => {
      createFile(fullFilePath, content)
      .then((themeFilePath) => {
        resolve(themeFilePath);
        if (nodeEnv === 'production') rebuildDist();
      });
    });
  });

export default updateTheme;

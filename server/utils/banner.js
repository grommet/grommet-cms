import colors from 'colors/safe';

export default (text = '', color = 'green') => {
  console.log(colors[color]('================================='));
  console.log(colors[color](text));
  console.log(colors[color]('================================= \n'));
};

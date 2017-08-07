export function formatDate(date) {
  if (!date) return null;

  const dateToFormat = new Date(date);
  const slicedDate = dateToFormat.toISOString().slice(0, 10);
  const splitDate = slicedDate.split('-');
  const formattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;

  return formattedDate;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatPrettyDate(date) {
  if (!date) return null;

  const dateToFormat = new Date(date);
  const slicedDate = dateToFormat.toISOString().slice(0, 10);
  const splitDate = slicedDate.split('-');
  const formattedDate =
    `${monthNames[dateToFormat.getMonth()]} ${splitDate[2]}, ${splitDate[0]}`;

  return formattedDate;
}

function combineArrays(arrays) {
  return Array.prototype.concat.apply([], arrays.map(array => array));
}

// This combines and sorts community posts and tweets by date.
export function sortEntries(entriesToSort) {
  const entries = combineArrays(entriesToSort);

  entries.sort((a, b) => {
    // Tweets use "created_at" while posts use "date"
    const aDate = a.created_at || a.date;
    const bDate = b.created_at || b.date;
    return new Date(bDate) - new Date(aDate);
  });

  return entries;
}

// This randomly adds elements to an array after a given index.
export function disperseElements(array, objectsToAdd, afterIndex) {
  const max = array.length;
  const min = afterIndex + 1;
  const dispersedArray = array.slice(0);

  objectsToAdd.map((item, index) => {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    dispersedArray.splice(randomIndex, 0, item);
  });

  return dispersedArray;
}

// Twitter ID integers are too large for javascript to compute without data loss.
// https://webapplog.com/decreasing-64-bit-tweet-id-in-javascript
export function decStrNum(n) {
  n = n.toString();
  let result = n;
  let i = n.length - 1;

  while (i > -1) {
    if (n[i] === '0') {
      result = `${result.substring(0, i)}9${result.substring(i + 1)}`;
      i--;
    } else {
      result = `${result.substring(0,i)}${(parseInt(n[i],10)-1).toString()}${result.substring(i+1)}`; // eslint-disable-line
      return result;
    }
  }

  return result;
}

export function truncateString(string) {
  let newString = string.match(/^.{0,90}[\S]*/);
  const stringLength = newString[0].length;
  newString = newString[0].replace(/\s$/, '');
  if (stringLength < string.length) { newString += '...'; }
  return newString;
}

export function getYears() {
  const today = new Date();
  const numYears = today.getFullYear() - 1989;
  return Array.from({ length: numYears }, (v, k) => today.getFullYear() - k);
}

export function isImage(path) {
  return (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(path);
}

export function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function unslugify(text = '') {
  if (text.includes('-')) {
    return text.split('-')
      .map(s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
      .join(' ');
  }
  return [text]
    .map(s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)[0];
}

export function isLetter(e) {
  return e.keyCode >= 65 && e.keyCode <= 90;
}

/* eslint-disable */
// from: https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
	};
};
/* eslint-enable */

/* eslint-disable */
// helper to insert mark tags
function insertMarkTag(sourceString, subString) {
  return sourceString.replace(new RegExp("(" + subString + ")", "i"), "<mark>$1</mark>");
}

// helper to get right content snippet containing the search term
function setPreviewSnippet(searchTerm, text){
  /**
    TODO: make sure the text is not sliced in the middle of a <mark> tag
  **/
  let start, end;
  const offset = 200;
  const pos =  text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (pos > offset) {
    start = pos - offset;
    end = pos + offset;
  }else {
    start = 0;
    end = offset + offset - pos;
  }
  return text.slice(start, end);
}

export const highlightContent = (searchTerm, text) => {
  if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
    const formattedText = insertMarkTag(text, searchTerm);
    return setPreviewSnippet(searchTerm, formattedText);
  }
  else {
    return text;
  }
};

export function uuid() {
  var i, random;
  var uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }

    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }

  return uuid;
}

export function shortenText(text, maxLength) {
  var ret = text;
  if (ret.length > maxLength) {
    ret = ret.substr(0,maxLength-3) + "...";
  }
  return ret;
}
 
/* eslint-enable */

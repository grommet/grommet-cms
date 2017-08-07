function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default function makeREFromSearchTerm(searchTerm) {
  return new RegExp(escapeRegex(searchTerm));
}

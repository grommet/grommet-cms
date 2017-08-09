export default function groupBy(array, func) {
  const groups = {};
  array.forEach((item) => {
    const group = func(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return groups;
}

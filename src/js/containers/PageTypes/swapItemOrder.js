/* @flow */

export const diff = (left: any, right: any) => {
  const changed = [];
  left.forEach((l) => {
    right.forEach((r) => {
      if (l.title === r.title) {
        if (l.sortOrder !== r.sortOrder) {
          changed.push(r);
        }
      }
    });
  });
  return changed;
};

type Direction = 'UP' | 'DOWN';

export default (index: number, items: any[], direction: Direction) => {
  const sortOrders = items.map(i => i.sortOrder);
  const min = Math.min(...sortOrders);
  const max = Math.max(...sortOrders);
  const currentItemOrder = sortOrders[index];
  if (direction === 'UP') {
    if (currentItemOrder > min) {
      return [
        ...items.slice(0, index - 1),
        {
          ...items[index],
          sortOrder: items[index].sortOrder - 1
        },
        {
          ...items[index - 1],
          sortOrder: items[index].sortOrder
        },
        ...items.slice(index + 1)
      ];
    }
  } else if (direction === 'DOWN') {
    if (currentItemOrder < max) {
      return [
        ...items.slice(0, index),
        {
          ...items[index + 1],
          sortOrder: items[index].sortOrder
        },
        {
          ...items[index],
          sortOrder: items[index].sortOrder + 1
        },
        ...items.slice(index + 2)
      ];
    }
  }
  return items;
};

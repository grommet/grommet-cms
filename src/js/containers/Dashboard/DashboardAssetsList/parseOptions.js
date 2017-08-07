// @flow
import type { GrommetCustomTypes$SelectValueType } from 'grommet';
import type { Post } from './flowTypes';

export default function(postTypes: Post[]): GrommetCustomTypes$SelectValueType[] {
  return [
    {
      value: '',
      label: 'None'
    },
    ...postTypes
      .sort((a, b) => {
        const aValue = a.title.toLowerCase();
        const bValue = b.title.toLowerCase();
        if (aValue < bValue) {
          return -1;
        } else if (aValue > bValue) {
          return 1;
        } else {
          return 0;
        }
      })
      .map(i => ({ value: i.id, label: i.title }))
  ];
}

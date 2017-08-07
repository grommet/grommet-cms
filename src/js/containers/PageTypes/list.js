import React from 'react';
import List from 'grommet/components/List';
import PageTypeListItem from './listItem';

export default function PageTypeList({ pageTypes, onMenuItemClick }) {
  if (!pageTypes || pageTypes && !pageTypes.length) {
    return null;
  }
  return (
    <List style={{ maxWidth: '100vw' }}>
      {pageTypes.map((item, i) =>
        <PageTypeListItem
          key={item.title}
          maxOrder={Math.max(...pageTypes.map(i => i.sortOrder))}
          minOrder={Math.min(...pageTypes.map(i => i.sortOrder))}
          onMenuItemClick={type => onMenuItemClick(type, i)}
          {...item}
        />
      )}
    </List>
  );
}

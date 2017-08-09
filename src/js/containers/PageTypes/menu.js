import React from 'react';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';

export default function PageTypeListItemMenu({ sortOrder, onMenuItemClick, minOrder, maxOrder }) {
  return (
    <Box align="end" justify="center">
      <Menu
        onClick={e => e.stopPropagation()}
        closeOnClick
        direction="row"
        responsive
        inline={false}
        dropAlign={{ right: 'right' }}
      >
        <Anchor
          label="Edit"
          icon={<EditIcon size="small" />}
          onClick={() => onMenuItemClick('EDIT')}
        />
        <Anchor
          label="Delete"
          icon={<TrashIcon size="small" />}
          onClick={() => onMenuItemClick('DELETE')}
        />
        <Anchor
          icon={<UpIcon size="small" />}
          label="Move Up"
          disabled={sortOrder === minOrder}
          onClick={() => onMenuItemClick('MOVE_UP')}
        />
        <Anchor
          icon={<DownIcon size="small" />}
          label="Move Down"
          disabled={sortOrder === maxOrder}
          onClick={() => onMenuItemClick('MOVE_DOWN')}
        />
      </Menu>
    </Box>
  );
}

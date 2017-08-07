/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import ListItem from 'grommet/components/ListItem';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import ArticleIcon from 'grommet/components/icons/base/Article';
import DuplicateIcon from 'grommet/components/icons/base/Duplicate';
import EditIcon from 'grommet/components/icons/base/Edit';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import unescape from 'unescape';

type Item = {
  name: string,
  id: string,
  order: number
}
export default function PostListItem(props: {
  item: Item,
  onMenuItemClick: (name: string) => void,
  minOrder: number,
  maxOrder: number
}) {
  const { item, onMenuItemClick, minOrder, maxOrder } = props;
  return (
    <ListItem separator="horizontal">
      <Box
        full="horizontal"
        pad={{ horizontal: 'medium' }}
        direction="row"
        justify="between"
      >
        <Box style={{ flexBasis: '90%' }} direction="column">
          <Heading tag="h3">{unescape(item.name)}</Heading>
          <Heading tag="h5">{item.id}</Heading>
        </Box>
        <Box align="end" justify="center">
          <Menu
            onClick={e => e.stopPropagation()}
            closeOnClick
            responsive
            inline={false}
            dropAlign={{ right: 'right' }}
          >
            <Anchor
              icon={<ArticleIcon size="small" />}
              label="Edit Content"
              onClick={() => onMenuItemClick('EDIT_CONTENT')}
            />
            <Anchor
              icon={<EditIcon size="small" />}
              label="Edit Section"
              onClick={() => onMenuItemClick('EDIT_SECTION')}
            />
            <Anchor
              icon={<DuplicateIcon size="small" />}
              label="Duplicate Section"
              onClick={() => onMenuItemClick('DUPLICATE')}
            />
            <Anchor
              icon={<TrashIcon size="small" />}
              label="Delete Section"
              onClick={() => onMenuItemClick('DELETE')}
            />
            <Anchor
              icon={<UpIcon size="small" />}
              label="Move Up"
              disabled={item.order === minOrder}
              onClick={() => onMenuItemClick('MOVE_UP')}
            />
            <Anchor
              icon={<DownIcon size="small" />}
              label="Move Down"
              disabled={item.order === maxOrder}
              onClick={() => onMenuItemClick('MOVE_DOWN')}
            />
          </Menu>
        </Box>
      </Box>
    </ListItem>
  );
}

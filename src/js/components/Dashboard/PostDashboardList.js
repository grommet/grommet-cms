import React from 'react';
import Box from 'grommet/components/Box';
import ListItem from 'grommet/components/ListItem';
import List from 'grommet/components/List';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import ArticleIcon from 'grommet/components/icons/base/Article';
import Image from 'grommet/components/Image';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';
import Anchor from 'grommet/components/Anchor';
import Label from 'grommet/components/Label';
import unescape from 'unescape';

export default function PostDashboardList({
  list, 
  titleKey, 
  links, 
  onMenuItemClick, 
  showControls = true,
  route
}) {
  return (
    <Box full="horizontal" align="center" direction="column">
      <List style={{ width: '100%' }}>
        {list && list.map((item, i) =>
          <ListItem
            key={i}
            onClick={() => onMenuItemClick('EDIT_CONTENT', i)} 
          >
            <Box
              full="horizontal"
              pad="medium"
              direction="row"
              justify="between"
              responsive={false}
            >
              <Box direction="column">
                <Box direction="row" responsive={false} align="center">
                  <Box pad="small">
                    <Image size="thumb" src={
                      item.image ? item.image.path : '/dashboard-assets/img/dashboard/missingImage.png'
                    } />
                  </Box>
                  <Box direction="column" justify="center" responsive={false}>
                    <Heading margin="none" tag="h3">
                      {unescape(item.title)}
                    </Heading>
                    <Label margin="none">
                      {item.slug}
                    </Label>
                  </Box>
                </Box>
              </Box>
              {showControls ?
                <Box align="end" justify="center">
                  <Menu
                    closeOnClick
                    responsive={true}
                    inline={false}
                    onClick={(e) => e.stopPropagation()}
                    dropAlign={{ right: 'right'}}
                  >
                    <Anchor
                      icon={<ArticleIcon size="small" />}
                      label="View Sections"
                      onClick={() => onMenuItemClick('EDIT_CONTENT', i)}
                    />
                    <Anchor
                      icon={<EditIcon size="small" />}
                      label="Edit Page Details"
                      onClick={() => onMenuItemClick('EDIT_PAGE', i)}
                    />
                    <Anchor
                      icon={<TrashIcon size="small" />}
                      label="Delete"
                      onClick={() => onMenuItemClick('DELETE', i)}
                    />
                    <Anchor
                      icon={<UpIcon size="small" />}
                      label="Move Up"
                      disabled={item.sortOrder === Math.min(...list.map(i => i.sortOrder))}
                      onClick={() => onMenuItemClick('MOVE_UP', i)}
                    />
                    <Anchor
                      icon={<DownIcon size="small" />}
                      label="Move Down"
                      disabled={item.sortOrder === Math.max(...list.map(i => i.sortOrder))}
                      onClick={() => onMenuItemClick('MOVE_DOWN', i)}
                    />
                  </Menu>
                </Box>
              :
                null
              }
            </Box>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

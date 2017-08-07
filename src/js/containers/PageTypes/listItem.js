// @flow
import React from 'react';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import PageTypeListItemMenu from './menu';

type Props = {
  title: String,
  slug: String,
  description: String,
  onMenuItemClick: (type: String) => void,
  sortOrder: Number,
  maxOrder: Number,
  minOrder: Number
}

export default function PageTypeListItem({ 
  title,
  slug,
  sortOrder,
  description,
  onMenuItemClick,
  ...orderProps
}: Props) {
  return (
    <ListItem separator="horizontal">
      <Box
        full="horizontal"
        pad={{ horizontal: "medium" }}
        direction="row"
        justify="between"
      >
        <Box style={{ flexBasis: '90%' }} direction="column">
          <Heading margin="none" tag="h3">{title}</Heading>
          {description ?
            <Label style={{ maxWidth: '60vw' }} truncate margin="none">{description}</Label>
            :
            <div style={{ height: 24 }} />
          }
        </Box>
      </Box>
      <PageTypeListItemMenu
        {...orderProps}
        sortOrder={sortOrder}
        onMenuItemClick={onMenuItemClick}
      />
    </ListItem>
  );
}

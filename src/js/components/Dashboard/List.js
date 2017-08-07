import React from 'react';
import { Link } from 'react-router';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Trash from 'grommet/components/icons/base/Trash';
import Heading from 'grommet/components/Heading';

export default function List(props) {
  const postsList = (props.list) ?
    props.list.map((item, key) => {
      const itemId = typeof item._id !== 'undefined' ? item._id : key;
      let itemTitle = item[props.titleKey];
      if (props.showId) {
        itemTitle = `${item._id}: ${itemTitle}`;
      }

      const title = (props.links)
        ? <Link 
            to={`/dashboard/${props.route}/${itemId}`}
            style={{textDecoration:'none'}}>
            {itemTitle}
          </Link>
        : <span>{itemTitle}</span>;

      const onClickDelete = (props.onDelete)
        ? props.onDelete.bind(this, itemId)
        : null;

      const deleteButton = (props.onDelete)
        ? <Button label="delete" icon={<Trash />} onClick={onClickDelete} />
        : null;

      return (
        <Box key={`item-${itemId}`} className="posts-list__post" separator="bottom" 
          direction="row" flex="grow" pad="medium" full="horizontal">
          <Box flex="grow">
            <Heading tag="h3">{title}</Heading>
          </Box>
          <Box direction="row">
            {deleteButton}
          </Box>
        </Box>
      );
    })
    : null;

  return (
    <Box className="posts-list" align="center" direction="column">
      {postsList}
    </Box>
  );
};

import React, { PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import Up from 'grommet/components/icons/base/Up';
import Down from 'grommet/components/icons/base/Down';
import Close from 'grommet/components/icons/base/Close';
import Upload from 'grommet/components/icons/base/Upload';
import SpinningIcon from 'grommet/components/icons/Spinning';

export default function EntryOrderList (props) {
  const listItems = props.entries.map((item, index) => 
    <ListItem key={`list-item-${index}`} justify="between" pad="medium">
      <Box style={{paddingRight:'24px'}}>
        <Heading tag="h3" margin="none">{item.name || item.title}</Heading>
      </Box>
      <Box direction="row" responsive={false} className="secondary" 
        pad={{ between: 'small' }}>
        <Button plain={true} 
          onClick={props.onListButtonClick.bind(this, item, "increment", index)}>
          <Up size="small" />
        </Button>
        <Button plain={true} 
          onClick={props.onListButtonClick.bind(this, item, "decrement", index)}>
          <Down size="small" />
        </Button>
      </Box>
    </ListItem>
  );

  const content = (!props.request) 
    ?  <Box pad="none">
        <List>
          {listItems}
        </List>
        <Box direction="row" responsive={false} 
          pad={{ horizontal: 'medium', vertical: 'medium', between: 'medium' }}
          justify="center" align="center">
          <Button label="save" icon={<Upload />} onClick={props.onSubmit} />
          <Button label="cancel" icon={<Close />} onClick={props.onCancel} />
        </Box>
      </Box>
    : <Box justify="center" align="center" pad="small">
        <SpinningIcon /> loading
      </Box>;

  return (
    <Box pad="small">
      {content}
    </Box>
  );
}

EntryOrderList.propTypes = {
  entries: PropTypes.array,
  onSubmit: PropTypes.func,
  onListButtonClick: PropTypes.func,
  onCancel: PropTypes.func
};

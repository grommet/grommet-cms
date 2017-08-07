import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';

export const SyncLayer = ({ request, success, error, onClose }) => {
  let body = (!error.message && request)
    ? (<Box align="center">
        <Heading tag="h3">
            Syncing
          </Heading>
        <Spinning size="medium" />
      </Box>)
    : (<Box align="center">
        <Heading tag="h3">
            Syncing Error
          </Heading>
        <Paragraph>
          {error.message}
        </Paragraph>
        <Footer>
          <Button label="close" onClick={onClose} />
        </Footer>
      </Box>);

  if (success) {
    body = (
      <Box align="center">
        <Heading tag="h3">
          Syncing Complete
        </Heading>
        <Footer justify="center">
          <Button label="okay" onClick={onClose} />
        </Footer>
      </Box>);
  }

  return (
    <Layer>
      <Box 
        pad="medium"
        align="center"
        justify="center"
      >
        {body}
      </Box>
    </Layer>
  );
};

export default SyncLayer;

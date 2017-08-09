import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function NoneFound({
  type = 'page',
  message
}) {
  return (
    <Box pad="medium" align="center">
      <Heading tag="h2">
        {`No ${type}s found`}
      </Heading>
      {message &&
        <Heading tag="h4">
          {message}
        </Heading>
      }
    </Box>
  );
}

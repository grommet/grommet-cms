/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import SpinningIcon from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';

export default function LoadingIndicator(props: { message: string }) {
  return (
    <Box
      style={{ marginTop: 20 }}
      align="center"
      justify="center"
    >
      <Box
        align="center"
        justify="center"
      >
        <SpinningIcon />
        <Heading tag="h3" align="center">{props.message}</Heading>
      </Box>
    </Box>
  );
}

LoadingIndicator.defaultProps = {
  message: 'Loading'
};

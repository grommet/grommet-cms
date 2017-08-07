/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

export default function BackAnchor(props: {
  title: string,
  onClick: Function
}) {
  return (
    <Box>
      <Anchor
        label={props.title}
        onClick={props.onClick}
        icon={<LinkPreviousIcon />}
      />
    </Box>
  );
}

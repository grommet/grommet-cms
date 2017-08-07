/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Markdown from 'grommet/components/Markdown';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import { PageHeader } from 'grommet-cms/components';
import helpText from './flexbox.md';

export default function FlexBoxHelpLayer(props: {
  onClose: Function,
  isVisible: boolean
}) {
  const { isVisible, onClose } = props;
  return (
    <Layer
      flush
      hidden={!isVisible}
      onClose={onClose}
      closer={false}
      align="center"
    >
      <Box full="horizontal">
        <PageHeader
          title="Flex Box Help"
          controls={
            <Anchor
              onClick={onClose}
              icon={<CloseIcon />}
            />
          }
        />
        <Article pad="large" style={{ maxHeight: 'calc(100vh - 24px)', overflow: 'scroll' }}>
          <Markdown content={helpText} />
        </Article>
      </Box>
    </Layer>
  );
}


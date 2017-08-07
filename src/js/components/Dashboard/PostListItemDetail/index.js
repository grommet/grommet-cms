/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';
import { DashboardContentBlocks } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components';
import recursivelyUnescape from 'recursive-unescape';
import unescape from 'unescape';
import { shortenText } from 'grommet-cms/utils';

export default function PostListItemDetail(props: {
  item: {
    order: number,
    id: string,
    name: string,
    contentBlocks: Array<{}>
  },
  onSubmit: Function,
  onCreateBlockClick: Function,
}) {
  const { item, onSubmit, onCreateBlockClick } = props;
  const unescapedBlocks = recursivelyUnescape(item.contentBlocks);
  const name = unescape(shortenText(item.name, 30));
  return (
    <Box full="horizontal">
      <PageHeader
        title={`Edit ${name} Content`}
        controls={
          <Anchor
            icon={<AddIcon size="small" />}
            label="Add Content Block"
            onClick={onCreateBlockClick}
          />
        }
      />
      <Section>
        <DashboardContentBlocks blocks={unescapedBlocks} />
        <Footer align="center" justify="center" pad="large">
          <Menu
            className="dashboard--content-blocks__button-footer"
            direction="row"
            inline
            responsive={false}
          >
            <Button
              label="done"
              onClick={onSubmit}
              primary={true}
              type="submit"
            />
          </Menu>
        </Footer>
      </Section>
    </Box>
  );
}

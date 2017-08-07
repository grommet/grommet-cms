/* @flow */
import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';

type NavLinks = Array<{ 
  label: string,
  path: string
}>;

export default function Nav (props: {
  rightNavLinks: NavLinks,
  leftNavLinks: NavLinks,
  title?: string,
  logo?: HTMLElement | React$Element<any>
}) {
  const { leftNavLinks, rightNavLinks, logo, title } = props;
  const titleElement = (title || logo) ?
    (
      <Box direction="column" justify="center">
        <Anchor
          icon={logo}
          path="/"
        />
      </Box>
    )
  : 
    null;
  return (
    <Header className="mobile-hide" size="large" colorIndex="neutral-4"
      justify="center" separator="bottom" pad={{ horizontal: 'medium' }}>
      <Box full="horizontal" direction="row" justify="between" responsive={false}>
        <Box direction="row">
          {titleElement}
          <Menu inline={true} direction="row" responsive={false} align="center">
            {leftNavLinks.map((item, i) =>
              <Anchor
                {...item}
                key={i}
              />
            )}
          </Menu>
        </Box>
        <Menu inline={true} direction="row" responsive={false} align="center">
          {rightNavLinks.map((item, i) =>
            <Anchor
              {...item}
              key={i}
            />
          )}
        </Menu>
      </Box>
    </Header>
  );
};

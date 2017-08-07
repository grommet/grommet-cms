/* @flow */
import React from 'react';
import FooterComponent from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';

export default function Footer(props: {
  logo: HTMLElement | React$Element<any>,
  contact: {
    copyright: string,
    email: string,
    website: string
  }
}) {
  const { logo, contact } = props;
  return (
    <FooterComponent primary colorIndex="brand">
      <Box direction="row" pad="large" full="horizontal">
        <Box basis="1/3" justify="center">
          {logo}
        </Box>
        <Box basis="1/3" justify="center">
          <Heading 
            className="post-feed-item--header"
            align="center"
            tag="h3"
          >
            {contact.copyright}
          </Heading>
        </Box>
        <Box basis="1/3" justify="center">
          <Anchor align="end" href={`mailto:${contact.email}`}>
            Get in touch
          </Anchor>
          <Anchor align="end" href={contact.website}>{contact.website}</Anchor>
        </Box>
      </Box>
    </FooterComponent>
  );
}

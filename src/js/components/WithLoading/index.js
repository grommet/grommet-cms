/* @flow */
import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import { LoadingIndicator } from 'grommet-cms/components';

export default function WithLoading(props: {
  isLoading: boolean,
  fullHeight: boolean,
  children: any
}) {
  const { isLoading, children, fullHeight } = props;
  if (!isLoading) {
    return <div>{children}</div>;
  } else {
    return (
      <Box>
        {isLoading &&
          <Section
            full={fullHeight}
            justify="center"
            align="center"
          >
            <LoadingIndicator />
          </Section>
        }
      </Box>
    );
  }
}

WithLoading.propTypes = {
  fullHeight: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

WithLoading.defaultProps = {
  fullHeight: false
};

/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import DownIcon from 'grommet/components/icons/base/Down';
import UpIcon from 'grommet/components/icons/base/Up';
import Button from 'grommet/components/Button';

export default function ViewMoreViewLess(props: {
  children: React$Element<any> | HTMLElement,
  isShowingMore: boolean,
  onShowMore: Function
}) {
  const { children, isShowingMore, onShowMore } = props;
  if (isShowingMore) {
    return (
      <div>
        <Box align="center">
          <Button
            plain
            onClick={onShowMore}
            label="View Less"
            icon={<UpIcon size="small" />}
          />
        </Box>
        {children}
      </div>
    );
  }
  return (
    <Box align="center">
      <Button
        plain
        onClick={onShowMore}
        label="View More" 
        icon={<DownIcon size="small" />} 
      />
    </Box>
  );
}


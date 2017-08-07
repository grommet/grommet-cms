/* @flow */
import React from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import TrashIcon from 'grommet/components/icons/base/Trash';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Toolbar from './toolbar';

type Props = {
  onClick: (e: Event) => void,
  buttonType?: 'DELETE' | 'SUBMIT'
}

export default function CmsToolbar({
  onClick,
  buttonType
}: Props): React$Element<*> {
  const type = buttonType || 'SUBMIT';
  return (
    <Toolbar>
      <Box colorIndex="light-2" pad="medium" align="end">
        <Button
          icon={type === 'SUBMIT' ? <CheckmarkIcon /> : <TrashIcon />}
          primary={type === 'SUBMIT'}
          className={type === 'DELETE' ? 'grommetux-button--critical' : ''}
          label={`${type === 'DELETE' ? 'delete' : 'use'} selected assets`}
          onClick={onClick}
        />
      </Box>
    </Toolbar>
  );
}


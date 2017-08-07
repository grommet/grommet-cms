// @flow
import React from 'react';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';

type Action = 'EDIT' | 'DELETE';

type Props = {
  onClick: (action: Action) => void
}

export default function AssetTableMenu({
  onClick
}: Props) {
  return (
    <Menu
      onClick={e => e.stopPropagation()}
      inline
      responsive={false}
      direction="row"
      justify="center"
      align="center"
      style={{ width: '100%' }}
    >
      <Button
        style={{ padding: 5 }}
        plain
        icon={<EditIcon />}
        onClick={() => onClick('EDIT')}
      />
      <Button
        style={{ padding: 5 }}
        plain
        onClick={() => onClick('DELETE')}
        icon={<TrashIcon />}
      />
    </Menu>
  );
}

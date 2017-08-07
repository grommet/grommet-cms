// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import Timestamp from 'grommet/components/Timestamp';
import { SmartImage } from 'grommet-cms-content-blocks';
import { TableRow } from './styles';
import AssetTableMenu from './menu';
import Td from './td';

type Props = {
  title: string,
  path: string,
  fullPath: string,
  onClickMenu: (action: 'DELETE' | 'EDIT') => void,
  createdAt: string,
  createdBy: string,
  checked: boolean,
  allowMultiSelect: boolean,
  onClickCheckbox: (checked: boolean) => void
}

export default function AssetTableRow({
  title,
  path,
  fullPath,
  onClickMenu,
  createdAt,
  createdBy,
  checked,
  onClickCheckbox,
  allowMultiSelect
}: Props) {
  return (
    <TableRow onClick={() => onClickMenu('EDIT')}>
      <Td minWidth={84}>
        <SmartImage
          image={{ path: fullPath, title }}
          size="thumb"
        />
      </Td>
      <Td>
        <Box>
          <span
            dangerouslySetInnerHTML={{ __html: `<h4 style="margin:unset">${title}</h4>` }}
          />
        </Box>
      </Td>
      <Td>
        <Box>
          <span
            dangerouslySetInnerHTML={{ __html: `<h4 style="margin:unset">${path}</h4>` }}
          />
        </Box>
      </Td>
      <Td>
        <Timestamp value={createdAt} fields={['date', 'month', 'year']} />
      </Td>
      <Td>
        <Box>
          <Heading tag="h4" margin="none">
            {createdBy || ''}
          </Heading>
        </Box>
      </Td>
      <Td>
        <AssetTableMenu onClick={onClickMenu} />
      </Td>
      {allowMultiSelect ?
        <Td width={50} onClick={e => e.stopPropagation()}>
          <CheckBox
            checked={checked || false}
            onChange={({ target }) => onClickCheckbox(target.checked)}
          />
        </Td>
      :
        null
      }
    </TableRow>
  );
}

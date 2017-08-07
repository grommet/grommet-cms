import styled from 'styled-components';
import GrommetTableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';

export const TableRow = styled(GrommetTableRow)`
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  border-bottom: 1px solid #eee;
`;

export const ListWrapper = styled(Box)`
  min-height: 750px;
  max-width: 100vw !important;
  box-sizing: border-box;
  tr {
    min-height: 1px;
  }
  thead {
    z-index: 10;
  }
`;

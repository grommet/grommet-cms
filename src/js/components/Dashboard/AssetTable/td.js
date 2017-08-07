import styled from 'styled-components';

export default styled.td`
  ${props => props.minWidth ? `min-width: ${props.minWidth}px;` : ``}
`;

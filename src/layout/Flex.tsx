import styled, { css } from 'styled-components';

interface FlexProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}
export default styled.div<FlexProps>`
  display: flex;
  ${(props) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}
  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}
`;

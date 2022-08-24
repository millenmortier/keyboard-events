import styled, { css } from 'styled-components';
import Flex from './Flex';

type HStackProps = { gap: number };
export default styled(Flex)<HStackProps>`
  ${(props) =>
    css`
      gap: ${props.gap * 4}px;
    `}
`;

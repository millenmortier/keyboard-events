import styled, { css } from 'styled-components';
import styles from '../styles';

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default styled.div<ContainerProps>`
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  box-sizing: border-box;

  ${(props) =>
    props.size &&
    css`
      max-width: ${styles.breakpoints[props.size]} !important;
    `}

  ${Object.values(styles.breakpoints).map(
    (size) => css`
      @media (min-width: ${size}) {
        max-width: ${size};
      }
    `
  )}
`;

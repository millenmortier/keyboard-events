import styled from 'styled-components';
import styles from '../styles';

const LogoStyle = styled.span`
  font-size: 2rem;
  font-weight: 900;

  @media (min-width: ${styles.breakpoints.sm}) {
    font-size: 2.5rem;
  }

  @media (min-width: ${styles.breakpoints.md}) {
    font-size: 3rem;
  }

  @media (min-width: ${styles.breakpoints.lg}) {
    font-size: 4rem;
  }
`;

const GradientText = styled.span`
  background: var(--gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Logo() {
  return (
    <LogoStyle>
      <GradientText>Keyboard Events</GradientText>{' '}
      <span style={{ position: 'relative', top: 6 }}>⌨️</span>
    </LogoStyle>
  );
}

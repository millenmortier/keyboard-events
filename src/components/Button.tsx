import styled, { css } from 'styled-components';

export default styled.button<{ small?: boolean }>`
  appearance: none;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 100%;
  font-family: inherit;
  font-weight: bold;
  background-color: var(--color-n-300);
  color: white;
  box-shadow: 0 2px 4px var(--color-brand-quaternary);
  background: linear-gradient(
    135deg,
    var(--color-brand-tertiary),
    var(--color-brand-quaternary)
  );
  cursor: pointer;
  transition: 0.15s box-shadow;

  :hover {
    box-shadow: 0 3px 8px var(--color-brand-quaternary);
  }

  ${(props) =>
    props.small &&
    css`
      padding: 0.25rem 0.75rem;
    `};
`;

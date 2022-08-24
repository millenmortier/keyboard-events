import styled, { css } from 'styled-components';

export default styled.table<{ columns?: number }>`
  table-layout: fixed;
  width: 100%;
  border: 1px solid var(--light-border-color);
  background-color: var(--background-color);
  box-shadow: 0 16px 80px -16px var(--shadow-color);
  border-radius: 1rem;

  th {
    color: var(--color-n-500);
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;

    border-bottom: 1px solid var(--light-border-color);
  }

  td,
  th {
    padding: 0.5rem 0.75rem;
    text-align: center;
    min-width: 5rem;
    ${(props) =>
      props.columns
        ? css`
            width: calc(100% / ${props.columns});
          `
        : css`
            width: auto;
          `}
  }

  tfoot td {
    border-top: 1px solid var(--light-border-color);
    padding: 0.75rem 0;
  }
`;

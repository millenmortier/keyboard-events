import styled from 'styled-components';

export default styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text-color);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.15s border-color;

  :hover {
    border-color: var(--color-brand-primary);
  }
`;

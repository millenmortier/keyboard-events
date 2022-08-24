import { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

const VisualCheckbox = styled.span<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;

  ${(props) =>
    props.checked &&
    css`
      border-color: white;
      background-color: var(--color-brand-quaternary);
    `}
`;

const Checkmark = styled.span`
  display: inline-block;
  width: 4px;
  height: 8px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  margin-bottom: 2px;
`;

const Wrapper = styled.span`
  display: inline-flex;

  input {
    width: 0;
    margin: 0;
    height: 16px;
    opacity: 0;
  }
`;

export default function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Wrapper>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <VisualCheckbox checked={checked}>
        {checked && <Checkmark />}
      </VisualCheckbox>
    </Wrapper>
  );
}

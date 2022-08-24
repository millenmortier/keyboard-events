import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface SelectOptions {
  value: string;
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | Option[];
}

const StyledSelect = styled.select`
  appearance: none;
  min-width: 8rem;
  height: 40px;
  padding: 0 1.25rem;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.15s border-color;

  :hover {
    border-color: var(--color-brand-primary);
  }
`;

const StyledIcon = styled(FiChevronDown)`
  position: absolute;
  right: 12px;
  top: 12px;
  pointer-events: none;
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`;

export default function Select({ options, value, onChange }: SelectOptions) {
  let _options = options;
  if (options.length && typeof options[0] === 'string') {
    _options = (options as string[]).map((option: string) => ({
      value: option,
      label: option,
    }));
  }

  return (
    <Wrapper>
      <StyledSelect value={value} onChange={onChange}>
        {(_options as Option[]).map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </StyledSelect>
      <StyledIcon />
    </Wrapper>
  );
}

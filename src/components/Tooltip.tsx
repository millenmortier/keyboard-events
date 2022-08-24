import { useState } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { usePopper } from 'react-popper';

const backgroundColor = 'var(--text-color)';

const TooltipArrow = styled.div`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;

  ::before {
    content: ' ';
    display: inline-block;
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${backgroundColor};
    transform: rotate(45deg);
  }
`;

const TooltipContent = styled.div`
  background-color: ${backgroundColor};
  color: var(--background-color);
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  opacity: 0;
  transition: 0.15s opacity;

  /* color: var(--text-color); */
  font-size: 0.875rem;
  font-weight: normal;
  text-transform: none;
  text-align: left;

  pointer-events: none;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  :hover ${TooltipContent} {
    opacity: 1;
    pointer-events: all;
  }

  [data-popper-placement^='top'] > ${TooltipArrow} {
    bottom: -0.25rem;
  }

  [data-popper-placement^='bottom'] > ${TooltipArrow} {
    top: -0.25rem;
  }

  [data-popper-placement^='left'] > ${TooltipArrow} {
    right: -0.25rem;
  }

  [data-popper-placement^='right'] > ${TooltipArrow} {
    left: -0.25rem;
  }
`;

const TooltipTrigger = styled.div``;

export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

  return (
    <TooltipContainer>
      <TooltipTrigger ref={setReferenceElement}>{children}</TooltipTrigger>
      <TooltipContent
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {label}
        <TooltipArrow ref={setArrowElement} style={styles.arrow} />
      </TooltipContent>
    </TooltipContainer>
  );
}

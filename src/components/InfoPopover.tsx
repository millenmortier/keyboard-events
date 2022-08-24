import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { usePopper } from 'react-popper';
import { FiX } from 'react-icons/fi';

const InfoIcon = styled.span`
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  color: var(--medium-text-color);
  border-radius: 50%;
  cursor: pointer;

  :hover {
    border-color: var(--medium-text-color);
  }
`;

const InfoPopoverContent = styled.div<{ show: boolean }>`
  opacity: 0;
  padding: 1rem 1.5rem;
  width: 15rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: 1rem;
  pointer-events: none;
  box-shadow: 0 4px 16px var(--shadow-color);

  color: var(--text-color);
  font-size: 1rem;
  font-weight: normal;
  text-transform: none;
  text-align: left;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;

const InfoPopoverCloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--light-background-color);
  color: var(--text-color);
  background-color: var(--light-background-color);
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-color: var(--background-color);
    border-color: var(--border-color);
  }
`;

const InfoPopoverArrow = styled.div`
  ::before {
    content: ' ';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: var(--background-color);
    transform: rotate(45deg);
    border: 1px solid var(--border-color);
  }
`;

const InfoPopoverContainer = styled.div`
  position: relative;
  display: inline-block;

  [data-popper-placement^='top'] > ${InfoPopoverArrow} {
    bottom: -0.5rem;
  }
  [data-popper-placement^='top'] > ${InfoPopoverArrow}::before {
    border-top-color: transparent;
    border-left-color: transparent;
  }

  [data-popper-placement^='bottom'] > ${InfoPopoverArrow} {
    top: -0.5rem;
  }
  [data-popper-placement^='bottom'] > ${InfoPopoverArrow}::before {
    border-bottom-color: transparent;
    border-right-color: transparent;
  }

  [data-popper-placement^='left'] > ${InfoPopoverArrow} {
    right: -0.5rem;
  }
  [data-popper-placement^='left'] > ${InfoPopoverArrow}::before {
    border-bottom-color: transparent;
    border-left-color: transparent;
  }

  [data-popper-placement^='right'] > ${InfoPopoverArrow} {
    left: -0.5rem;
  }
  [data-popper-placement^='right'] > ${InfoPopoverArrow}::before {
    border-top-color: transparent;
    border-right-color: transparent;
  }
`;

export default function InfoPopover({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [showPopover, setShowPopover] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'offset', options: { offset: [0, 12] } },
      {
        name: 'arrow',
        options: { element: arrowElement },
      },
    ],
  });

  useEffect(() => {
    const handleDocumentClick = (ev: MouseEvent) => {
      if (!ev.composedPath().includes(rootRef.current as EventTarget)) {
        setShowPopover(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <InfoPopoverContainer ref={rootRef}>
      <InfoIcon
        ref={setReferenceElement}
        onClick={() => setShowPopover(!showPopover)}
      >
        ?
      </InfoIcon>
      <InfoPopoverContent
        ref={setPopperElement}
        show={showPopover}
        style={styles.popper}
        {...attributes.popper}
      >
        <InfoPopoverCloseButton onClick={() => setShowPopover(false)}>
          <FiX />
        </InfoPopoverCloseButton>

        {children}

        <InfoPopoverArrow ref={setArrowElement} style={styles.arrow} />
      </InfoPopoverContent>
    </InfoPopoverContainer>
  );
}

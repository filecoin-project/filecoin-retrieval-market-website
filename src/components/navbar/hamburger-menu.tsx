
/**
 * Module dependencies.
 */

import { color, units } from '@untile/react-components';
import { ifProp, theme } from 'styled-tools';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

/**
 * Constants.
 */

const duration = '0.5s';
const easing = 'ease-in-out';

/**
 * `Props` type.
 */

type Props = {
  className?: string,
  isOpen: boolean,
  onClick: () => void
};

/**
 * `Button` styled component.
 */

const Button = styled.button.attrs({ as: 'div' })<{ active: boolean }>`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  appearance: none;
  background: none;
  border: 0;
  color: ${color('white')};
  cursor: pointer;
  display: flex;
  height: 26px;
  justify-content: center;
  margin: 7px 5px 7px auto;
  outline: none;
  padding: 0;
  position: relative;
  transform: rotate(0);
  transition: transform ${duration} ${easing};
  width: 30px;
  z-index: ${theme('zIndex.hamburgerMenu')};

  > span {
    &:nth-of-type(1) {
      top: 0;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      top: 10px;
    }

    &:nth-of-type(4) {
      top: ${units(2.5)};
    }
  }

  ${ifProp('active', css`
    > span {
      &:nth-of-type(1),
      &:nth-of-type(4) {
        left: 50%;
        top: 10px;
        width: 0;
      }

      &:nth-of-type(2) {
        transform: rotate(45deg);
      }

      &:nth-of-type(3) {
        transform: rotate(-45deg);
      }
    }
  `)}
`;

/**
 * `Lines` styled component.
 */

const Lines = styled.span`
  background-color: ${color('white')};
  border-radius: ${units(0.5)};
  height: 2px;
  left: 0;
  opacity: 1;
  position: absolute;
  transform: rotate(0);
  transition: 0.25s ${easing};
  width: 100%;
`;

/**
 * `HamburgerMenu` component.
 */

const HamburgerMenu = (props: Props): ReactElement => {
  const { className, isOpen, onClick } = props;

  return (
    <Button
      active={isOpen}
      className={className}
      onClick={onClick}
    >
      <Lines />

      <Lines />

      <Lines />

      <Lines />
    </Button>
  );
};

/**
 * Export `HamburgerMenu` component.
 */

export default HamburgerMenu;

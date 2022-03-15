
/**
 * Module dependencies.
 */

import { Svg } from '@untile/react-components';
import { theme } from 'styled-tools';
import React, { ReactElement } from 'react';
import arrowIcon from 'src/assets/svg/arrow.svg';
import styled from 'styled-components';

/**
 * `VisibleArrow` styled component.
 */

const VisibleArrow = styled(Svg)`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: ${theme('animations.defaultTransition')};
  transition-delay: 0.25s;
  transition-property: opacity, transform;
`;

/**
 * `HiddenArrow` styled component.
 */

const HiddenArrow = styled(VisibleArrow)`
  transform: translate(-150%, 50%);
  transition-delay: 0s;
`;

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 30px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  width: 30px;

  &:focus,
  &:hover {
    ${VisibleArrow} {
      transform: translate(50%, -150%);
      transition-delay: 0s;
    }

    ${HiddenArrow} {
      transform: translate(-50%, -50%);
      transition-delay: 0.25s;
    }
  }
`;

/**
 * `Arrow` component.
 */

const Arrow = (): ReactElement => {
  return (
    <Wrapper>
      <VisibleArrow
        icon={arrowIcon}
        size={'30px'}
      />

      <HiddenArrow
        icon={arrowIcon}
        size={'30px'}
      />
    </Wrapper>
  );
};

/**
 * Export `Arrow` component.
 */

export default Arrow;

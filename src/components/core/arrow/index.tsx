
/**
 * Module dependencies.
 */

import { Svg, media, units } from '@untile/react-components';
import { ifProp, theme } from 'styled-tools';
import React, { ReactElement } from 'react';
import arrowIcon from 'src/assets/svg/arrow.svg';
import styled, { css } from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  isSmall?: boolean,
  size?: string
};

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

const Wrapper = styled.div<{ isSmall?: boolean }>`
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
  text-decoration: none;

  ${ifProp('isSmall', css`
    height: 10px;
    width: 10px;

    ${media.min('ms')`
      height: ${units(2.5)};
      width: ${units(2.5)};
    `}
  `, css`
    height: 30px;
    width: 30px;
  `)}

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

const Arrow = ({ isSmall, size }: Props): ReactElement => {
  return (
    <Wrapper isSmall={isSmall}>
      <VisibleArrow
        icon={arrowIcon}
        size={size ?? '30px'}
      />

      <HiddenArrow
        icon={arrowIcon}
        size={size ?? '30px'}
      />
    </Wrapper>
  );
};

/**
 * Export `Arrow` component.
 */

export default Arrow;

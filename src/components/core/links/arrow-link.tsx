
/**
 * Module dependencies.
 */

import { Svg, color, isExternalUrl } from '@untile/react-components';
import { theme } from 'styled-tools';
import React, { ReactElement } from 'react';
import RouterLink from './router-link';
import arrowIcon from 'src/assets/svg/arrow.svg';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  href: string
};

/**
 * `VisibleArrow` styled component.
 */

const VisibleArrow = styled(Svg)`
  color: ${color('dark')};
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
 * `Link` styled component.
 */

const Link = styled.a.attrs(({ href }) => ({
  as: href && !isExternalUrl(href) && RouterLink || 'a'
}))`
  color: ${color('dark')};
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
 * `ArrowLink` component.
 */

const ArrowLink = ({ href }: Props): ReactElement => {
  return (
    <Link
      href={href}
      {...href && isExternalUrl(href) && {
        rel: 'noopener',
        target: '_blank'
      }}
    >
      <VisibleArrow
        icon={arrowIcon}
        size={'30px'}
      />

      <HiddenArrow
        icon={arrowIcon}
        size={'30px'}
      />
    </Link>
  );
};

/**
 * Export `ArrowLink` component.
 */

export default ArrowLink;

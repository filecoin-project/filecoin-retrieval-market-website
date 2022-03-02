
/**
 * Module dependencies.
 */

import { color, isExternalUrl } from '@untile/react-components';
import { switchProp, theme } from 'styled-tools';
import React, { ReactElement, ReactNode } from 'react';
import RouterLink from './router-link';
import styled, { css } from 'styled-components';

/**
 * Export `UnderlineLinkSize` type.
 */

export type UnderlineLinkSize = 'default' | 'small';

/**
 * `Props` type.
 */

type Props = {
  children: ReactNode,
  href: string,
  size?: UnderlineLinkSize
};

/**
 * `Link` styled component.
 */

const Link = styled.a.attrs(({ href }) => ({
  as: href && !isExternalUrl(href) && RouterLink || 'a'
}))<{ size?: UnderlineLinkSize }>`
  color: ${color('textColor')};
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  width: max-content;

  &::after {
    background-color: ${color('textColor')};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    transform-origin: bottom left;
    width: 100%;
    will-change: transform;
  }

  ${switchProp('size', {
    default: css`
      ${theme('typography.styles.h2')}

      letter-spacing: -0.03px;

      &::after {
        height: 2.5px;
      }
    `,
    small: css`
      ${theme('typography.styles.h5')}

      &::after {
        height: 1px;
      }
    `
  })}

  &:focus,
  &:hover {
    &::after {
      animation: ${theme('keyframes.horizontalScale')} 0.5s linear;
    }
  }
`;

/**
 * `UnderlineLink` component.
 */

const UnderlineLink = (props: Props): ReactElement => {
  const { children, href, size } = props;

  return (
    <Link
      href={href}
      size={size ?? 'default'}
    >
      {children}
    </Link>
  );
};

/**
 * Export `UnderlineLink` component.
 */

export default UnderlineLink;

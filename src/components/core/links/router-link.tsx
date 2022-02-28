
/**
 * Module dependencies.
 */

import NextLink, { LinkProps as RouterLinkProps } from 'next/link';
import React, {
  FC,
  ReactElement,
  ReactNode,
  forwardRef
} from 'react';

import styled from 'styled-components';

/**
 * Export `LinkProps` interface.
 */

export interface LinkProps extends RouterLinkProps {
  children: ReactNode;
  className?: string;
}

/**
 * `StyledLink` styled component.
 */

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

/**
 * `RouterLink` component.
 */

const RouterLink: FC<LinkProps> = forwardRef<any, LinkProps>((props: LinkProps, ref: any): ReactElement => {
  const { children, className, ...rest } = props;

  return (
    <NextLink
      passHref
      {...rest}
    >
      <StyledLink
        className={className}
        ref={ref}
      >
        {children}
      </StyledLink>
    </NextLink>
  );
});

/**
 * `RouterLink` display name.
 */

RouterLink.displayName = 'RouterLink';

/**
 * Export `RouterLink` component.
 */

export default RouterLink;

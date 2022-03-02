
/**
 * Module dependencies.
 */

import { color, states, units } from '@untile/react-components';
import { ifProp, theme } from 'styled-tools';
import { isExternalUrl } from '@untile/react-components/dist/utils';
import React, {
  ElementType,
  FC,
  ReactElement,
  ReactNode,
  forwardRef
} from 'react';

import RouterLink from 'src/components/core/links/router-link';
import styled, { css } from 'styled-components';

/**
 * Export `ButtonProps` interface.
 */

export interface ButtonProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.button.attrs<ButtonProps>(props => {
  const { as, href, type } = props;
  const isExternal = isExternalUrl(href);
  const element = as || href && !isExternal && RouterLink || href && isExternal && 'a' || 'button';

  return {
    as: element,
    type: type || (element === 'button' ? 'button' : null)
  };
})`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 1px solid ${color('white')};
  border-radius: 19px;
  color: ${color('white')};
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.02px;
  line-height: 20px;
  min-height: 30px;
  outline: none;
  padding: ${units(0.5)} ${units(1.5)};
  position: relative;
  transition: ${theme('animations.defaultTransition')};
  transition-property: background-color, color, opacity;
  white-space: nowrap;
  width: max-content;

  &:focus,
  &:hover {
    background-color: ${color('white')};
    color: ${color('black')};
  }

  ${states.action`
    outline: none;
    text-decoration: none;
  `}

  ${ifProp('disabled', css`
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  `)}
`;

/**
 * `Button` component.
 */

const Button: FC<ButtonProps> = forwardRef<any, ButtonProps>((props: ButtonProps, ref: any): ReactElement => {
  const { children, disabled, ...rest } = props;

  return (
    <Wrapper
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
    </Wrapper>
  );
});

/**
 * `Button` display name.
 */

Button.displayName = 'Button';

/**
 * Export `Button` component.
 */

export default Button;

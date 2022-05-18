
/**
 * Module dependencies.
 */

import { color, states, units } from '@untile/react-components';
import { ifProp, switchProp, theme } from 'styled-tools';
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
 * Export `ButtonColorTheme` type.
 */

export type ButtonColorTheme = 'primary' | 'secondary';

/**
 * Export `ButtonProps` interface.
 */

export interface ButtonProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  colorTheme?: ButtonColorTheme;
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
  border: 1px solid;
  color: ${color('white')};
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.02px;
  line-height: 20px;
  min-height: 30px;
  outline: none;
  position: relative;
  transition: ${theme('animations.defaultTransition')};
  transition-property: background-color, border-color, color, opacity;
  white-space: nowrap;
  width: max-content;

  ${switchProp('colorTheme', {
    primary: css`
      background-color: transparent;
      border-color: ${color('white')};
      border-radius: 19px;
      padding: ${units(0.5)} ${units(1.5)};

      &:focus,
      &:hover {
        background-color: ${color('white')};
        color: ${color('black')};
      }
    `,
    secondary: css`
      background-color: ${color('blue500')};
      border-color: ${color('blue500')};
      border-radius: 30px;
      padding: 15px ${units(4.5)};

      &:focus,
      &:hover {
        background-color: ${color('white')};
        border-color: ${color('white')};
        color: ${color('blue500')};
      }
    `
  })}

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
  const {
    children,
    colorTheme = 'primary',
    disabled,
    ...rest
  } = props;

  return (
    <Wrapper
      colorTheme={colorTheme}
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

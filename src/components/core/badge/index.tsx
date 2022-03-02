
/**
 * Module dependencies.
 */

import { color, units } from '@untile/react-components';
import { prop, switchProp } from 'styled-tools';
import styled, { css } from 'styled-components';

/**
 * Export `BadgeVariant` type.
 */

export type BadgeVariant = 'fill' | 'outline';

/**
 * Export `BadgeProps` interface.
 */

export interface BadgeProps {
  colorTheme?: string;
  variant?: BadgeVariant;
}

/**
 * `Badge` styled component.
 */

export const Badge = styled.div<BadgeProps>`
  align-items: center;
  border: 1px solid;
  border-color: ${prop('colorTheme', color('white'))};
  border-radius: 19px;
  display: inline-block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.02px;
  line-height: 20px;
  min-height: 30px;
  padding: ${units(0.5)} ${units(1.5)};
  position: relative;
  white-space: nowrap;
  width: max-content;

  ${switchProp('variant', {
    fill: css`
      background-color: ${prop('colorTheme', color('white'))};
      color: ${color('dark')};
    `,
    outline: css`
      background-color: transparent;
      color: ${prop('colorTheme', color('white'))};
    `
  })}
`;

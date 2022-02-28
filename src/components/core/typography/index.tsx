
/**
 * Module dependencies.
 */

import { Box } from '@untile/react-components';
import { theme } from 'styled-tools';
import styled from 'styled-components';

/**
 * `TypeBaseComponent` styled component.
 */

const TypeBaseComponent = styled(Box)`
  font-feature-settings: 'calt', 'clig', 'kern', 'liga', 'locl', 'rlig';
`;

/**
 * `Display1` styled component.
 */

const Display1 = styled(TypeBaseComponent)`
  ${theme('typography.otherStyles.display1')}
`;

/**
 * `Display2` styled component.
 */

const Display2 = styled(TypeBaseComponent)`
  ${theme('typography.otherStyles.display2')}
`;

/**
 * Export `Type` component.
 */

export { Display1, Display2 };

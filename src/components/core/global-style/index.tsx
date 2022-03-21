
/**
 * Module dependencies.
 */

import { color } from '@untile/react-components';
import { createGlobalStyle } from 'styled-components';
import { typography } from 'src/styles/type';

/**
 * Export `GlobalStyle` component.
 */

export default createGlobalStyle`
  body {
    ${typography.styles.p}
    
    background-color: ${color('blue900')};
    color: ${color('textColor')};
  }
`;

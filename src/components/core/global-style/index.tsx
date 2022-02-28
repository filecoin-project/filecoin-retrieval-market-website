
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
    
    background: linear-gradient(180deg, #050c1b 0%, #2c61cf 89.85%);
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: ${color('textColor')};
  }
`;

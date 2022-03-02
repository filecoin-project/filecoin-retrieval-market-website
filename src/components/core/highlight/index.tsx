
/**
 * Module dependencies.
 */

import { color } from '@untile/react-components';
import { theme } from 'styled-tools';
import styled from 'styled-components';

/**
 * `Highlight` styled component.
 */

const Highlight = styled.span`
  color: inherit;
  transition: ${theme('animations.defaultTransition')};

  &:focus,
  &:hover {
    color: ${color('blue200')};
    text-shadow: 1px 1px 4px ${color('blue300')};
  }
`;

/**
 * Export `Highlight` component.
 */

export default Highlight;


/**
 * Module dependencies.
 */

import { Container as DefaultContainer, media } from '@untile/react-components';
import { theme } from 'styled-tools';
import styled from 'styled-components';

/**
 * `Container` component.
 */

const Container = styled(DefaultContainer)`
  min-height: inherit;
  padding: 0 ${theme('grid.gutterMobile')}px;

  ${media.min('lg')`
    padding: 0 ${theme('grid.gutter')}px;
  `}
`;

/**
 * Export `Container` component.
 */

export default Container;

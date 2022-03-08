
/**
 * Module dependencies.
 */

import { color } from '@untile/react-components';
import { prop, theme } from 'styled-tools';
import styled from 'styled-components';

/**
 * `DotsGrid` styled component.
 */

const DotsGrid = styled.div<{ colorTheme?: string }>`
  background-image: radial-gradient(${prop('colorTheme', color('white'))} 7%, transparent 8%);
  background-position: center;
  background-size: 40px 40px;
  bottom: 0;
  left: ${theme('grid.gutterMobile')}px;
  position: absolute;
  right: ${theme('grid.gutterMobile')}px;
  top: 0;
`;

/**
 * Export `DotsGrid` component.
 */

export default DotsGrid;

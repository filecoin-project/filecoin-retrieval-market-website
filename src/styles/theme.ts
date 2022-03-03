
/**
 * Module dependencies.
 */

import { animations } from './animations';
import { colors } from './colors';
import { dimensions } from './dimensions';
import { keyframes } from './keyframes';
import { typography } from './type';
import { zIndex } from './z-index';

/**
 * Export `theme` config.
 */

export const theme = {
  animations,
  colors,
  dimensions,
  grid: {
    gutter: 40,
    gutterMobile: 15
  },
  keyframes,
  typography,
  zIndex
};

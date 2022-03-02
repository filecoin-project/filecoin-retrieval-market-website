
/**
 * Module dependencies.
 */

import { keyframes as keyframe } from 'styled-components';

/**
 * `horizontalScale` keyframes.
 */

const horizontalScale = keyframe`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

/**
 * Export `keyframe`.
 */

export const keyframes = {
  horizontalScale
};

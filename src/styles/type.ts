
/**
 * Module dependencies.
 */

import { css } from 'styled-components';
import { setFontStyle } from '@untile/react-components';

/**
 * Font families.
 */

const fontFamily = {
  sansSerif: '"DM Sans", sans-serif'
};

/**
 * Type sizes.
 */

const typeSizes = {
  display1: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 350,
    fontSizeMax: 350,
    fontSizeMin: 200,
    fontWeight: 400,
    letterSpacing: -0.08,
    lineHeight: 350
  },
  display2: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 200,
    fontSizeMax: 200,
    fontSizeMin: 150,
    fontWeight: 400,
    letterSpacing: -0.08,
    lineHeight: 260
  },
  h1: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 100,
    fontSizeMax: 100,
    fontSizeMin: 45,
    fontWeight: 400,
    letterSpacing: -0.03,
    lineHeight: 100
  },
  h2: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 50,
    fontSizeMax: 50,
    fontSizeMin: 25,
    fontWeight: 400,
    letterSpacing: -0.01,
    lineHeight: 50
  },
  h3: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 25,
    fontSizeMax: 25,
    fontSizeMin: 18,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 30
  },
  h4: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: -0.03,
    lineHeight: 20
  },
  h5: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 15,
    fontSizeMax: 15,
    fontSizeMin: 14,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 18
  },
  paragraph: {
    fontFamily: fontFamily.sansSerif,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.01,
    lineHeight: 16
  }
};

/**
 * `display1` style.
 */

const display1 = css`
  ${setFontStyle(typeSizes.display1)}
`;

/**
* `display2` style.
*/

const display2 = css`
  ${setFontStyle(typeSizes.display2)}
`;

/**
 * `h1` style.
 */

const h1 = css`
  ${setFontStyle(typeSizes.h1)}
`;

/**
 * `h2` style.
 */

const h2 = css`
  ${setFontStyle(typeSizes.h2)}
`;

/**
 * `h3` style.
 */

const h3 = css`
  ${setFontStyle(typeSizes.h3)}
`;

/**
 * `h4` style.
 */

const h4 = css`
  ${setFontStyle(typeSizes.h4)}
`;

/**
 * `h5` style.
 */

const h5 = css`
  ${setFontStyle(typeSizes.h5)}
`;

/**
 * `paragraph` style.
 */

const paragraph = css`
  ${setFontStyle(typeSizes.paragraph)}
`;

/**
 * Export types to be generated.
 */

const styles = {
  h1,
  h2,
  h3,
  h4,
  h5,
  p: paragraph // eslint-disable-line id-length
};

/**
 * Export `type`.
 */

export const typography = {
  fontFamily,
  otherStyles: {
    display1,
    display2
  },
  styles
};

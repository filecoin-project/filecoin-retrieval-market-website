
/**
 * Module dependencies.
 */

import { colors } from 'src/styles/colors';
import HeaderSection from 'src/components/sections/header-section';
import React, { ReactElement } from 'react';

/**
 * `Home` page.
 */

const Home = (): ReactElement => (
  <HeaderSection dotsColor={colors.blue600} />
);

/**
 * Export `Home` page.
 */

export default Home;

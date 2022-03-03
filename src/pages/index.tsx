
/**
 * Module dependencies.
 */

import { media, units } from '@untile/react-components';
import { sectionsIds } from 'src/core/content-config/navbar';
import { theme } from 'styled-tools';
import Container from 'src/components/core/layout/container';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

/**
 * `Section` styled component.
 */

const Section = styled.section`
  min-height: 100vh;
  padding-top: calc(${theme('dimensions.navbarHeightMobile')}px + ${units(4)});

  ${media.min('md')`
    padding-top: calc(${theme('dimensions.navbarHeight')}px + ${units(2.5)});
  `}
`;

/**
 * `Home` page.
 */

const Home = (): ReactElement => (
  <Container>
    <Section>
      {'Onda website'}
    </Section>

    <Section id={sectionsIds.sectionWhyNow}>
      {'Section Why Now'}
    </Section>

    <Section id={sectionsIds.sectionWhatWeDo}>
      {'Section What we do'}
    </Section>

    <Section id={sectionsIds.sectionProgress}>
      {'Section Progress'}
    </Section>

    <Section id={sectionsIds.sectionProjectsAndOpportunities}>
      {'Section Projects and opportunities'}
    </Section>

    <Section id={sectionsIds.sectionTeams}>
      {'Section Teams'}
    </Section>

    <Section id={sectionsIds.sectionRoadmap}>
      {'Section Roadmap'}
    </Section>

    <Section id={sectionsIds.sectionContact}>
      {'Section Contact'}
    </Section>
  </Container>
);

/**
 * Export `Home` page.
 */

export default Home;

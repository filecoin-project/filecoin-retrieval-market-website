
/**
 * Module dependencies.
 */

import { APIResponse } from 'src/types/api';
import { GetStaticProps } from 'next';
import { colors } from 'src/styles/colors';
import { getRecords } from 'src/core/api/airtable';
import { sectionsIds } from 'src/core/content-config/navbar';
import Container from 'src/components/core/layout/container';
import DotsGridSection from 'src/components/sections/dots-grid-section';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

/**
 * `Section` styled component.
 */

const Section = styled.section`
  min-height: 100vh;
`;

/**
 * `Props` type.
 */

type Props = {
  data: APIResponse
}

/**
 * `Home` page.
 */

const Home = ({ data }: Props): ReactElement => {
  console.log(data); // eslint-disable-line no-console

  return (
    <Container>
      <Section id={sectionsIds.sectionDotsGrid}>
        <DotsGridSection dotsColor={colors.blue600} />
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
};

/**
 * Export `getStaticProps`.
 */

export const getStaticProps: GetStaticProps = async () => {
  const data = await getRecords();

  return {
    props: {
      data
    }
  };
};

/**
 * Export `Home` page.
 */

export default Home;

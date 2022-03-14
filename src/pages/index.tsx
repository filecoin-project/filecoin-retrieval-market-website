
/**
 * Module dependencies.
 */

import { APIResponse } from 'src/types/api';
import { GetStaticProps } from 'next';
import { color } from '@untile/react-components';
import { getRecords } from 'src/core/api/airtable';
import { sectionsIds } from 'src/core/content-config/navbar';
import ContactsSection from 'src/components/sections/contacts-section';
import Container from 'src/components/core/layout/container';
import IntroSection from 'src/components/sections/intro-section';
import Metatags from 'src/components/core/metatags';
import React, { ReactElement } from 'react';
import RoadmapSection from 'src/components/sections/roadmap-section';
import TeamsSection from 'src/components/sections/teams-section';
import WhatWeDoSection from 'src/components/sections/what-we-do-section';
import WhyNowSection from 'src/components/sections/why-now-section';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: APIResponse
}

/**
 * `Section` styled component.
 */

const Section = styled.section`
  min-height: 100vh;
  position: relative;
`;

/**
 * `BodyGradient` styled component.
 */

const BodyGradient = styled.div`
  background: linear-gradient(180deg, ${color('blue900')} 0%, ${color('blue400')} 89.85%);
  background-repeat: no-repeat;
`;

/**
 * `Home` page.
 */

const Home = ({ data }: Props): ReactElement => {
  return (
    <>
      <Metatags
        description={'The Filecoin Retrieval Market facilitates a decentralized and trustless CDN for content addressed data.'}
      />

      <BodyGradient>
        <IntroSection
          nextSectionId={sectionsIds.sectionWhyNow}
          title={data?.content?.homeDescription}
        />

        <WhyNowSection
          id={sectionsIds.sectionWhyNow}
          title={data?.content?.whyNowDescription}
        />

        <WhatWeDoSection id={sectionsIds.sectionWhatWeDo} />

        <Section id={sectionsIds.sectionProgress}>
          <Container>
            {'Section Progress'}
          </Container>
        </Section>

        <Section id={sectionsIds.sectionProjectsAndOpportunities}>
          <Container>
            {'Section Projects and opportunities'}
          </Container>
        </Section>

        <TeamsSection
          data={data?.teams}
          id={sectionsIds.sectionTeams}
        />

        <RoadmapSection
          data={data?.roadmap}
          id={sectionsIds.sectionRoadmap}
        />
      </BodyGradient>

      <ContactsSection
        data={data?.settings}
        id={sectionsIds.sectionContact}
      />
    </>
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

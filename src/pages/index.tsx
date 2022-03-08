
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
import NodesSection from 'src/components/sections/nodes-section';
import React, { ReactElement } from 'react';
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

        <Section id={sectionsIds.sectionWhyNow}>
          <Container>
            {'Section Why Now'}
          </Container>
        </Section>

        <Section id={sectionsIds.sectionWebNodes}>
          <NodesSection />
        </Section>

        <Section id={sectionsIds.sectionWhatWeDo}>
          <Container>
            {'Section What we do'}
          </Container>
        </Section>

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

        <Section id={sectionsIds.sectionTeams}>
          <Container>
            {'Section Teams'}
          </Container>
        </Section>

        <Section id={sectionsIds.sectionRoadmap}>
          <Container>
            {'Section Roadmap'}
          </Container>
        </Section>
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

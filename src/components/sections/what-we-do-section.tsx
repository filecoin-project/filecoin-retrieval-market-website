
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { Box, Type, media, units, useBreakpoint } from '@untile/react-components';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  id?: string
};

/**
 * `Section` styled component.
 */

const Section = styled.section`
  padding: ${units(14.5)}  0 ${units(2.5)};
  position: relative;

  ${media.min('md')`
    padding: clamp(${units(17.5)}, 9.5vw, 9.5vw) 0 ${units(5)};
  `}
`;

/**
 * `StyledBadge` styled component.
 */

const StyledBadge = styled(Badge)`
  margin-bottom: ${units(7)};
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div`
  ${media.min('md')`
    display: grid;
    grid-column-gap: ${units(2)};
    grid-template-areas:
      'title title       .'
      '.     description description';
    grid-template-columns: 5fr 2fr 5fr;
  `}
`;

/**
 * `WhatWeDoSection` component.
 */

const WhatWeDoSection = ({ id }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');

  return (
    <Section id={id}>
      {!isTablet && <StaticNavbar activeItem={id} />}

      <Container>
        {isTablet && (
          <FadeInUpAnimation
            options={{
              distance: '100%',
              transitionTime: 1
            }}
          >
            <StyledBadge variant={'outline'}>
              {'What we do'}
            </StyledBadge>
          </FadeInUpAnimation>
        )}

        <Grid>
          <Box
            gridAreaMd={'title'}
            marginBottom={units(3.5)}
            marginBottomMd={units(4.5)}
          >
            <FadeInUpAnimation
              options={{
                distance: '50%',
                transitionTime: 1
              }}
            >
              <Type.H2>
                {'The Filecoin Retrieval Market initiative is building a decentralised CDN for the Filecoin Network.'}
              </Type.H2>
            </FadeInUpAnimation>
          </Box>

          <Box gridAreaMd={'description'}>
            <FadeInUpAnimation
              options={{
                distance: '50%',
                transitionTime: 1
              }}
            >
              <Type.H3>
                {'The approach to do this is in a modular way with many teams contributing. The Retrieval Market Working Group (RMWG) consists of teams tackling challenging problems in the space, ranging from ultra fast payments, to data transfer protocol enhancements and cryptoeconomic models for data retrieval.'}
              </Type.H3>
            </FadeInUpAnimation>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
};

/**
 * Export `WhatWeDoSection` component.
 */

export default WhatWeDoSection;


/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { Box, Type, media, units, useBreakpoint } from '@untile/react-components';
import { Element } from 'react-scroll';
import { WhatWeDoProps } from 'src/types/api';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: WhatWeDoProps
  name?: string,
};

/**
 * `Section` styled component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  padding: ${units(15)}  0 ${units(2.5)};
  position: relative;

  ${media.min('md')`
    padding: 150px 0 0;
  `}

  ${media.min('lg')`
    padding-bottom: ${units(12.5)};
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

const WhatWeDoSection = ({ data, name }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');

  return (
    <Section name={name}>
      {!isTablet && <StaticNavbar activeItem={name} />}

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
                {data?.title}
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
                {data?.subtitle}
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

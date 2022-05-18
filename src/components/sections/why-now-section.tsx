
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import {
  Box,
  RawHtml,
  Type,
  color,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { Element } from 'react-scroll';
import { WhyNowProps } from 'src/types/api';
import { ifProp, theme } from 'styled-tools';
import { useInView } from 'react-intersection-observer';
import Button from 'src/components/core/buttons/button';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import NodesSection from './nodes-section';
import React, { ReactElement } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: WhyNowProps,
  name?: string
};

/**
 * `Section` styled component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  min-height: 100vh;
  padding: ${units(17.5)} 0 ${units(2.5)};
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
      'title        title            .'
      '.            descriptionOne   descriptionOne'
      'dots         dots             dots'
      '.            descriptionTwo   descriptionTwo'
      'nodesSection nodesSection     nodesSection'
      '.            descriptionThree descriptionThree';
    grid-template-columns: 5fr 2fr 5fr;
  `}
`;

/**
 * `AnimatedGridWrapper` styled component.
 */

const AnimatedGridWrapper = styled.div`
  grid-area: dots;
  margin-bottom: ${units(7)};

  ${media.min('md')`
    margin-bottom: ${units(12)};
  `}
`;

/**
 * `AnimatedGrid` styled component.
 */

const AnimatedGrid = styled.div<{ isVisible: boolean }>`
  max-width: max-content;
  overflow: hidden;
  position: relative;
  transition-duration: 2s;
  transition-property: width;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  width: ${ifProp('isVisible', '100%', '0')};

  ${media.min('lg')`
    transition-duration: 4s;
  `}
`;

/**
 * `SmallImage` styled component.
 */

const SmallImage = styled.img`
  display: block;
  max-width: 50vw;
  width: 469px;
`;

/**
 * `BigImage` styled component.
 */

const BigImage = styled.img`
  display: block;
  max-width: calc(100vw - (${theme('grid.gutterMobile')}px * 2));
  width: 900px;
`;

/**
 * `MobileImage` styled component.
 */

const MobileImage = styled.img`
  display: block;
  max-width: calc(100vw - (${theme('grid.gutterMobile')}px * 2));
  width: max-content;
`;

/**
 * `BigImageWrapper` styled component.
 */

const BigImageWrapper = styled.div`
  position: relative;

  ${media.min('md')`
    align-items: center;
    display: flex;
    grid-gap: ${units(4)};
  `}
`;

/**
 * `Highlight` styled component.
 */

const Highlight = styled(Type.H3)`
  > span {
    cursor: default;
    transition: ${theme('animations.defaultTransition')};

    &:focus,
    &:hover {
      color: ${color('blue200')};
      text-shadow: 1px 1px 4px ${color('blue300')};
    }
  }
`;

/**
 * `ButtonsWrapper` styled component.
 */

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${units(2.5)};
  padding-top: 46px;

  ${media.min('sm')`
    flex-direction: row;
  `}
`;

/**
 * `WhyNowSection` component.
 */

const WhyNowSection = ({ data, name }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true
  });

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
              {'Why Now'}
            </StyledBadge>
          </FadeInUpAnimation>
        )}

        <Grid>
          <Box
            gridAreaMd={'title'}
            marginBottom={units(3)}
            marginBottomMd={units(12)}
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

          <Box
            gridAreaMd={'descriptionOne'}
            marginBottom={units(7)}
            marginBottomMd={units(6)}
          >
            <FadeInUpAnimation
              options={{
                distance: '100%',
                transitionTime: 1
              }}
            >
              <RawHtml element={Highlight}>
                {data?.subtitle}
              </RawHtml>

              {(data?.buttonOneUrl || data?.buttonTwoUrl) && (
                <ButtonsWrapper>
                  {data?.buttonOneUrl && (
                    <Button
                      colorTheme={'secondary'}
                      href={data?.buttonOneUrl}
                    >
                      {data?.buttonOneLabel}
                    </Button>
                  )}

                  {data?.buttonTwoUrl && (
                    <Button
                      colorTheme={'secondary'}
                      href={data?.buttonTwoUrl}
                    >
                      {data?.buttonTwoLabel}
                    </Button>
                  )}
                </ButtonsWrapper>
              )}
            </FadeInUpAnimation>
          </Box>

          <AnimatedGridWrapper>
            {!isTablet && (
              <AnimatedGrid
                isVisible={inView}
                ref={ref}
              >
                <SmallImage
                  alt={'By 2025 the global CDN market is expected to be twice as large as the cloud object storage market.'}
                  src={'/static/images/pattern-small.png'}
                />

                <BigImageWrapper>
                  <BigImage
                    alt={'By 2025 the global CDN market is expected to be twice as large as the cloud object storage market.'}
                    src={'/static/images/pattern-big.png'}
                  />
                </BigImageWrapper>
              </AnimatedGrid>
            )}

            {isTablet && (
              <AnimatedGrid
                isVisible={inView}
                ref={ref}
              >
                <MobileImage
                  alt={'By 2025 the global CDN market is expected to be twice as large as the cloud object storage market.'}
                  src={'/static/images/pattern-mobile.png'}
                />
              </AnimatedGrid>
            )}
          </AnimatedGridWrapper>

          <Box
            gridAreaMd={'descriptionTwo'}
            marginBottom={units(7)}
            marginBottomMd={units(11)}
          >
            <FadeInUpAnimation
              options={{
                distance: '100%',
                transitionTime: 1
              }}
            >
              <Type.H3>
                {data?.how}
              </Type.H3>
            </FadeInUpAnimation>
          </Box>

          <Box
            gridAreaMd={'nodesSection'}
            marginBottom={units(7)}
            marginBottomMd={units(18.5)}
          >
            <FadeInUpAnimation
              options={{
                distance: '50%',
                threshold: 0.1,
                transitionTime: 1
              }}
            >
              <NodesSection />
            </FadeInUpAnimation>
          </Box>

          <Box gridAreaMd={'descriptionThree'}>
            <FadeInUpAnimation
              options={{
                distance: '100%',
                transitionTime: 1
              }}
            >
              <Type.H3>
                {data?.why}
              </Type.H3>
            </FadeInUpAnimation>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
};

/**
 * Export `WhyNowSection` component.
 */

export default WhyNowSection;


/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import {
  Box,
  Type,
  color,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { Element } from 'react-scroll';
import { LearnMoreProps } from 'src/types/api';
import { theme } from 'styled-tools';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import StaticNavbar from 'src/components/static-navbar';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: LearnMoreProps,
  name?: string
};

/**
 * `Section` styled component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  padding: ${units(15)} 0 ${units(17)};
  position: relative;

  ${media.min('md')`
    padding-top: 150px;
  `}

  ${media.min('lg')`
    padding-bottom: ${units(36)};
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
      'title    title    .     .'
      '.        video    video .'
      'subtitle subtitle .     .';
    grid-template-columns: 1fr 6fr 4fr 1fr;
  `}
`;

/**
 * `VideoWrapper` styled component.
 */

const VideoWrapper = styled.div`
  margin: 0 auto;
  max-width: 1015px;
  position: relative;

  ${media.max('lg')`
    padding-bottom: 48%;
  `}

  ${media.max('sm')`
    padding-bottom: 60%;
  `}

  ${media.min('lg')`
    height: 517px;
  `}
`;

/**
 * `Iframe` styled component.
 */

const Iframe = styled.iframe`
  height: 100%;
  position: absolute;
  width: 100%;
`;

/**
 * `Subtitle` styled component.
 */

const Subtitle = styled(Type.H2)`
  p {
    margin: 0;
  }

  a {
    color: inherit;
    position: relative;
    text-decoration: none;
    white-space: nowrap;
    width: max-content;

    &::after {
      background-color: ${color('textColor')};
      bottom: 4px;
      content: '';
      height: 2.5px;
      left: 0;
      position: absolute;
      transform-origin: bottom left;
      width: 100%;
      will-change: transform;

      ${media.min('md')`
        bottom: 7px;
      `}
    }

    &:focus,
    &:hover {
      &::after {
        animation: ${theme('keyframes.horizontalScale')} 0.5s linear;
      }
    }
  }
`;

/**
 * `LearnMoreSection` component.
 */

const LearnMoreSection = ({ data, name }: Props): ReactElement => {
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
              {'Learn More'}
            </StyledBadge>
          </FadeInUpAnimation>
        )}

        <Grid>
          <Box
            gridAreaMd={'title'}
            marginBottom={'35px'}
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
            gridAreaMd={'video'}
            marginBottom={'50px'}
          >
            <FadeInUpAnimation
              options={{
                distance: '50%',
                transitionTime: 1
              }}
            >
              <VideoWrapper>
                <Iframe
                  allowFullScreen
                  frameBorder={'0'}
                  height={'100%'}
                  src={`${data?.videoUrl}?rel=0`}
                  title={data?.title}
                  width={'100%'}
                />
              </VideoWrapper>
            </FadeInUpAnimation>
          </Box>

          <Box gridAreaMd={'subtitle'}>
            <FadeInUpAnimation
              options={{
                distance: '50%',
                transitionTime: 1
              }}
            >
              <Subtitle>
                <ReactMarkdown
                  // eslint-disable-next-line react/no-children-prop
                  children={data?.subtitle}
                  linkTarget={'_blank'}
                  remarkPlugins={[remarkGfm]}
                />
              </Subtitle>
            </FadeInUpAnimation>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
};

/**
 * Export `LearnMoreSection` component.
 */

export default LearnMoreSection;

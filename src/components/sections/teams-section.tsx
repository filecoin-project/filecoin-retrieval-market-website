
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { Box, Type, media, units, useBreakpoint } from '@untile/react-components';
import { Element } from 'react-scroll';
import { TeamProps } from 'src/types/api';
import { theme } from 'styled-tools';
import Card from 'src/components/card';
import Carousel, { Slide } from 'src/components/carousel';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import filter from 'lodash/filter';
import map from 'lodash/map';
import size from 'lodash/size';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: TeamProps[],
  name?: string
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
    padding-bottom: ${units(7.5)};
  `}
`;

/**
 * `BadgeWrapper` styled component.
 */

const BadgeWrapper = styled.div`
  margin-bottom: ${units(7)};
  padding: 0 ${theme('grid.gutterMobile')}px;
  
  ${media.min('md')`
    padding: 0 0 0 ${theme('grid.gutter')}px;
  `}
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div`
  ${media.min('md')`
    display: grid;
    grid-column-gap: ${units(2)};
    grid-template-areas: 'title .';
    grid-template-columns: repeat(2, 1fr);
  `}
`;

/**
 * Carousel config.
 */

const carouselConfig = {
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 18
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 18
    },
    576: {
      slidesPerView: 1.75,
      spaceBetween: 18
    },
    768: {
      slidesPerView: 2.3,
      spaceBetween: 18
    },
    992: {
      slidesPerView: 2.75,
      spaceBetween: 18
    },
    1200: {
      slidesPerView: 3.2,
      spaceBetween: 30
    },
    1440: {
      slidesPerView: 3.9,
      spaceBetween: 50
    },
    1920: {
      slidesPerView: 4.1,
      spaceBetween: 50
    }
  }
};

/**
 * `TeamsSection` component.
 */

const TeamsSection = ({ data, name }: Props): ReactElement | null => {
  const isTablet = useBreakpoint('lg', 'max');
  const { activeCard } = useMemo(() => ({
    activeCard: filter(data, { active: true })
  }), [data]);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>();
  const slideRef = useRef<HTMLDivElement>(null);
  const total = size(activeCard);

  if (total === 0) {
    return null;
  }

  return (
    <Section
      name={name}
      ref={sectionRef}
    >
      {!isTablet && <StaticNavbar activeItem={name} />}

      {isTablet && (
        <FadeInUpAnimation
          options={{
            distance: '100%',
            transitionTime: 1
          }}
        >
          <BadgeWrapper>
            <Badge variant={'outline'}>
              {'Teams'}
            </Badge>
          </BadgeWrapper>
        </FadeInUpAnimation>
      )}

      <Grid>
        <Box
          gridAreaMd={'title'}
          marginBottom={units(2)}
          marginBottomMd={units(4.5)}
          padding={'0 15px'}
          paddingMd={'0 0 0 40px'}
        >
          <FadeInUpAnimation
            options={{
              distance: '100%',
              transitionTime: 1
            }}
          >
            <Type.H2>
              {'Many teams are already working on Retrieval Markets.'}
            </Type.H2>
          </FadeInUpAnimation>
        </Box>
      </Grid>

      <FadeInUpAnimation
        options={{
          distance: '50%',
          threshold: 0.1,
          transitionTime: 1
        }}
      >
        <Carousel
          activeSlide={activeSlide}
          carouselConfig={carouselConfig}
          containerModifierClass={'teams'}
          onSetActiveSlide={setActiveSlide}
          ref={sliderRef}
          totalItems={total}
        >
          {map(activeCard, (props : TeamProps, index: number) => (
            <Slide
              key={index}
              // @ts-ignore
              ref={slideRef}
            >
              <Card
                description={props?.description}
                iconImage={props?.iconImage}
                subtitle={props?.subtitle}
                title={props?.title}
                url={props?.url}
              />
            </Slide>
          ))}
        </Carousel>
      </FadeInUpAnimation>
    </Section>
  );
};

/**
 * Export `TeamsSection` component.
 */

export default TeamsSection;

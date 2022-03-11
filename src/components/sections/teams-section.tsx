
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { TeamProps } from 'src/types/api';
import { Type, media, units, useBreakpoint } from '@untile/react-components';
import { theme } from 'styled-tools';
import Card from 'src/components/card';
import Carousel, { Slide } from 'src/components/carousel';
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
 * `BadgeWrapper` styled component.
 */

const BadgeWrapper = styled.div`
  padding: 0 ${theme('grid.gutterMobile')}px;
  
  ${media.min('md')`
    padding: 0 0 0 ${theme('grid.gutter')}px;
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
    grid-template-areas: 'title .';
    grid-template-columns: repeat(2, 1fr);
  `}
`;

/**
 * `Title` styled component.
 */

const Title = styled(Type.H2)`
  grid-area: title;
  margin-bottom: ${units(2)};
  padding: 0 ${theme('grid.gutterMobile')}px;
  
  ${media.min('md')`
    margin-bottom: ${units(4.5)};
    padding: 0 0 0 ${theme('grid.gutter')}px;
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

const TeamsSection = ({ data, id }: Props): ReactElement | null => {
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
      id={id}
      ref={sectionRef}
    >
      {!isTablet && <StaticNavbar activeItem={id} />}

      {isTablet && (
        <BadgeWrapper>
          <StyledBadge variant={'outline'}>
            {'Teams'}
          </StyledBadge>
        </BadgeWrapper>
      )}

      <Grid>
        <Title>
          {'Many teams are already working on Retrieval Markets.'}
        </Title>
      </Grid>

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
    </Section>
  );
};

/**
 * Export `TeamsSection` component.
 */

export default TeamsSection;

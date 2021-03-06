
/**
 * Module depenencies.
 */

import { Badge } from 'src/components/core/badge';
import { Display1 } from 'src/components/core/typography';
import { Element } from 'react-scroll';
import { RoadmapProps } from 'src/types/api';
import { Svg, Type, media, units, useBreakpoint } from '@untile/react-components';
import { theme } from 'styled-tools';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import Slider, { Slide } from 'src/components/slider';
import StaticNavbar from 'src/components/static-navbar';
import arrowRightIcon from 'src/assets/svg/arrow-right-long.svg';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import map from 'lodash/map';
import size from 'lodash/size';
import slice from 'lodash/slice';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: RoadmapProps[],
  name?: string
};

/**
 * `slideTransition`.
 */

const slideTransition = 1000;

/**
 * `Section` component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  padding: ${units(12.5)} 0 ${units(12)};
  position: relative;

  ${media.min('md')`
    padding: 130px 0 0;
  `}

  ${media.min('lg')`
    padding-bottom: ${units(12.5)};
  `}
`;

/**
 * `Gallery` styled component.
 */

const Gallery = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'month       month month'
    'year        year  year'
    'year        year  year'
    'description .     .';
  grid-template-columns: 5fr 1fr 4fr;
  grid-template-rows: max-content 38px repeat(2, max-content) ${units(2)};

  ${media.min('xs')`
    grid-template-rows: max-content 38px repeat(2, max-content) ${units(4.5)};
  `}

  ${media.min('lg')`
    grid-template-areas:
      '. month       month month .'
      '. year        year  year  .'
      '. year        year  year  .'
      '. description .     .     .';
    grid-template-columns: 1fr 4fr repeat(2, 3fr) 1fr;
    grid-template-rows: max-content ${units(7)} 1fr max-content ${units(6)};
    margin-bottom: ${units(5)};
  `}

  ${media.min('xl')`
    grid-template-rows: max-content ${units(7)} 1fr max-content ${units(7)};
    margin-bottom: ${units(4)};
  `}

  ${media.min('xxl')`
    grid-template-areas:
      '. month       month month .'
      '. year        year  year  .'
      '. year        year  year  .'
      '. description .     .     .';
    grid-template-columns: 1fr 4fr repeat(2, 3fr) 1fr;
  `}
`;

/**
 * `Title` styled component.
 */

const Title = styled(Display1)`
  letter-spacing: -12px;
  padding-right: ${units(1)};

  ${media.min('ms')`
    letter-spacing: -16px;
  `}

  ${media.min('lg')`
    margin-left: -${units(2.5)};
  `}

  ${media.min('xl')`
    margin-left: -${units(3.5)};
    letter-spacing: -28px;
  `}

  @media only screen and (max-width: 374px) {
    font-size: 140px;
    line-height: 150px;
  }
`;

/**
 * `Year` styled component.
 */

const Year = styled(Title)`
  @media only screen and (min-width: 823px) and (max-width: 1500px) {
    font-size: 22vw;
  }

  @media only screen and (max-width: 374px) {
    font-size: 140px;
    line-height: 150px;
  }
`;

/**
 * `BadgeWrapper` styled component.
 */

const BadgeWrapper = styled.div`
  margin-bottom: ${units(2)};
  padding: 0 ${theme('grid.gutterMobile')}px;

  ${media.min('ms')`
    margin-bottom: ${units(7)};
  `}
  
  ${media.min('md')`
    padding: 0 0 0 ${theme('grid.gutter')}px;
  `}
`;

/**
 * `SwipeWrapper` styled component.
 */

const SwipeWrapper = styled.div`
  align-items: center;
  bottom: -${units(4.5)};
  display: flex;
  grid-gap: ${units(2)};
  height: 35px;
  position: absolute;
  right: 0;

  ${media.min('sm')`
    bottom: -70px;
  `}

  ${media.min('lg')`
    bottom: 0;
  `}
`;

/**
 * `RoadmapSection` component.
 */

const RoadmapSection = ({ data, name }: Props): ReactElement | null => {
  const isMobile = useBreakpoint('md', 'max');
  const isTablet = useBreakpoint('lg', 'max');
  const sliderRef = useRef<any>();
  const { activeItem } = useMemo(() => ({
    activeItem: filter(data, { active: true })
  }), [data]);

  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <>
      <Section name={name}>
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
                {'Roadmap'}
              </Badge>
            </BadgeWrapper>
          </FadeInUpAnimation>
        )}

        <Container>
          <FadeInUpAnimation
            options={{
              distance: '50%',
              threshold: 0.1,
              transitionTime: 1
            }}
          >
            <Gallery>
              <Slider
                activeSlide={activeSlide}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: true
                }}
                // @ts-ignore
                containerModifierClass={'roadmap'}
                onSetActiveSlide={setActiveSlide}
                parallax
                ref={sliderRef}
                showScrollbar
                slidesPerView={1}
                speed={slideTransition}
                totalItems={size(activeItem)}
              >
                {map(activeItem, (props: RoadmapProps, index: number) => {
                  const { description, month, year } = props;

                  return (
                    <Slide key={index}>
                      <Grid>
                        <Title
                          data-swiper-parallax={-100}
                          gridArea={'month'}
                          gridRow={'1 / 3'}
                          textAlignMd={'left'}
                          textAlignXxl={'right'}
                        >
                          {isMobile && month.length > 3 ? concat(slice(month, 0, 3), '.') : month}
                        </Title>

                        <Year
                          data-swiper-parallax={-750}
                          gridArea={'year'}
                          gridRow={'2 / 4'}
                          gridRowLg={'2 / 6'}
                          marginBottom={units(1)}
                          marginBottomLg={0}
                          marginBottomMs={units(6.5)}
                          textAlign={'right'}
                        >
                          {year}
                        </Year>

                        <Type.H2
                          gridArea={'description'}
                          gridRow={'4 / 5'}
                        >
                          {description}
                        </Type.H2>
                      </Grid>
                    </Slide>
                  );
                })}
              </Slider>

              <SwipeWrapper>
                <Type.H4>
                  {'Swipe'}
                </Type.H4>

                <Svg
                  icon={arrowRightIcon}
                  size={units(7.5)}
                />
              </SwipeWrapper>
            </Gallery>
          </FadeInUpAnimation>
        </Container>
      </Section>
    </>
  );
};

/**
 * Export `RoadmapSection` component.
 */

export default RoadmapSection;

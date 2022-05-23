
/**
 * Module dependencies.
 */

import { EventProps } from 'src/types/api';
import { Link } from 'react-scroll';
import {
  Svg,
  Type,
  color,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { colors } from 'src/styles/colors';
import { ifProp, theme } from 'styled-tools';
import { useRouter } from 'next/router';
import Container from 'src/components/core/layout/container';
import DotsGrid from 'src/components/dots-grid';
import DotsGridSection from './dots-grid-section';
import EventSection from './event-section';
import FadeInAnimation from 'src/components/core/animations/fade-in';
import FadeInUpAnimation from '../core/animations/fade-in-up';
import React, { ReactElement } from 'react';
import arrowDown from 'src/assets/svg/arrow-down.svg';
import isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  eventData?: EventProps,
  id?: string,
  nextSectionId?: string,
  title: string
};

/**
 * `Section` styled component.
 */

const Section = styled.section`
  min-height: 100vh;
  position: relative;

  ${media.min('lg')`
    margin-bottom: 150px;
  `}
`;

/**
 * `backgroundStyle`.
 */

const backgroundStyle = css`
  &::after {
    background: linear-gradient(180deg, ${color('blue900')} 0%, transparent 100%);
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

/**
 * `StyledDotsGridSection` styled component.
 */

const StyledDotsGridSection = styled(DotsGridSection)`
  ${backgroundStyle}
`;

/**
 * `DotsGridWrapper` styled component.
 */

const DotsGridWrapper = styled.div`
  ${backgroundStyle}
`;

/**
 * `Content` styled component.
 */

const Content = styled.div`
  padding: ${units(12)} 0 ${units(12.5)};

  ${media.min('md')`
    padding: ${units(15)} 0 ${units(5)};
  `}
`;

/**
 * `Title` styled component.
 */

const Title = styled(Type.H1)`
  pointer-events: none;
  position: relative;
  z-index: 1;

  ${media.min('md')`
    text-indent: ${units(13.5)};
  `}
`;

/**
 * `VisibleLabel` styled component.
 */

const VisibleLabel = styled(Type.H4)`
  opacity: 1;
  position: absolute;
  transform: translateY(0);
  transition: ${theme('animations.defaultTransition')};
  transition-property: opacity, transform;
`;

/**
 * `HiddenLabel` styled component.
 */

const HiddenLabel = styled(VisibleLabel)`
  opacity: 0;
  transform: translateY(-100%);
`;

/**
 * `ScrollDown` styled component.
 */

const ScrollDown = styled(Link)<{ hasLink?: boolean }>`
  align-items: flex-end;
  bottom: 30px;
  display: flex;
  grid-gap: 18px;
  position: absolute;
  right: 30px;

  ${media.min('md')`
    bottom: ${units(5)};
    grid-gap: 38px;
    right: ${units(5)};
  `}

  &:focus,
  &:hover {
    ${VisibleLabel} {
      opacity: 0;
      transform: translateY(100%);
    }

    ${HiddenLabel} {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${ifProp('hasLink', css`
    cursor: pointer;
  `)}
`;

/**
 * `LabelWrapper` styled component.
 */

const LabelWrapper = styled.div`
  height: ${units(2.5)};
  overflow: hidden;
  position: relative;
  width: ${units(5.5)};
`;

/**
 * `StyledFadeInUpAnimation` styled component.
 */

const StyledFadeInUpAnimation = styled(FadeInUpAnimation)`
  pointer-events: none;
`;

/**
 * `IntroSection` component.
 */

const IntroSection = ({
  eventData,
  id,
  nextSectionId,
  title
}: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');
  const { isReady } = useRouter();

  return (
    <Section id={id}>
      {!isTablet ? <StyledDotsGridSection dotsColor={colors.blue600} /> : (
        <DotsGridWrapper>
          <DotsGrid colorTheme={colors.blue600} />
        </DotsGridWrapper>
      )}

      <Content>
        {isReady && (
          <>
            {eventData && eventData?.active && (
              <FadeInUpAnimation
                options={{
                  distance: '25%',
                  transitionDelay: 0.7,
                  transitionTime: 1
                }}
              >
                <EventSection data={eventData} />
              </FadeInUpAnimation>
            )}

            <StyledFadeInUpAnimation
              options={{
                distance: '25%',
                transitionDelay: 0.7,
                transitionTime: 1
              }}
            >
              <Container>
                <Title>
                  {title}
                </Title>
              </Container>
            </StyledFadeInUpAnimation>
          </>
        )}
      </Content>

      {isReady && (
        <FadeInAnimation
          options={{
            transitionDelay: 0.5,
            transitionTime: 1
          }}
        >
          <ScrollDown
            hasLink={!isEmpty(nextSectionId)}
            smooth={'easeOutQuad'}
            to={nextSectionId}
          >
            <LabelWrapper>
              <HiddenLabel>
                {'Scroll'}
              </HiddenLabel>

              <VisibleLabel>
                {'Scroll'}
              </VisibleLabel>
            </LabelWrapper>

            <Svg
              icon={arrowDown}
              size={'14px'}
            />
          </ScrollDown>
        </FadeInAnimation>
      )}
    </Section>
  );
};

/**
 * Export `IntroSection` component.
 */

export default IntroSection;

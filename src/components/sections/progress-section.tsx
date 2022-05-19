
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { Display2 } from 'src/components/core/typography';
import { Element } from 'react-scroll';
import { ProgressProps } from 'src/types/api';
import { Type, media, units, useBreakpoint } from '@untile/react-components';
import { useInView } from 'react-intersection-observer';
import AnimatedNumber from 'react-animated-number';
import Border from 'src/components/border';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import filter from 'lodash/filter';
import map from 'lodash/map';
import styled from 'styled-components';
import times from 'lodash/times';

/**
 * `Props` type.
 */

type Props = {
  data: ProgressProps[],
  name?: string
};

/**
 * `Section` styled component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  padding: ${units(14.5)} 0 ${units(2.5)};
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
 * `Item` styled component.
 */

const Item = styled.div`
  min-height: ${units(30)};
  overflow: hidden;

  ${media.min('md')`
    display: grid;
    grid-template-columns: 5fr 7fr;
    min-height: ${units(27.5)};
  `}
`;

/**
 * `Amount` styled component.
 */

const Amount = styled(Display2)`
  ${media.min('xl')`
    line-height: 200px;
  `}

  ${media.max('xs')`
    font-size: 130px;
  `}

  @media only screen and (max-width: 374px) {
    font-size: 115px;
  }
`;

/**
 * `Description` styled component.
 */

const Description = styled.div`
  ${media.max('md')`
    position: relative;
    top: -22px;
  `}

  ${media.min('md')`
    padding: 18px 0;
  `}
`;

/**
 * `BorderGrid` styled component.
 */

const BorderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

/**
 * `ListItem` component.
 */

const ListItem = ({ amount, description }): ReactElement => {
  const [isAnimatedNumber, setAnimatedNumber] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const duration = useMemo<number>(() => {
    if (amount <= 100) {
      return 750;
    }

    if (amount > 100 && amount < 1000) {
      return 1250;
    }

    return 1750;
  }, [amount]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedNumber(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <li ref={ref}>
      <BorderGrid>
        {times(7, (borderIndex: number) => (
          <FadeInUpAnimation
            key={borderIndex}
            options={{
              distance: '60px',
              threshold: 0.5,
              transitionDelay: 0.1 * borderIndex,
              transitionTime: 1
            }}
          >
            <Border />
          </FadeInUpAnimation>
        ))}
      </BorderGrid>

      <Item>
        <Amount>
          {isAnimatedNumber && inView ? (
            <AnimatedNumber
              duration={duration}
              stepPrecision={0}
              value={amount}
            />
          ) : 0}
        </Amount>

        <Description>
          <FadeInUpAnimation
            options={{
              distance: '100%',
              threshold: 0.5,
              transitionDelay: 0.3,
              transitionTime: 1
            }}
          >
            <Type.H3>
              {description}
            </Type.H3>
          </FadeInUpAnimation>
        </Description>
      </Item>
    </li>
  );
};

/**
 * `ProgressSection` component.
 */

const ProgressSection = ({ data, name }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');
  const { activeItem } = useMemo(() => ({
    activeItem: filter(data, { active: true })
  }), [data]);

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
              {'Progress'}
            </StyledBadge>
          </FadeInUpAnimation>
        )}

        <ul>
          {map(activeItem, ({
            amount,
            description
          }: ProgressProps, index: number) => (
            <ListItem
              amount={amount}
              description={description}
              key={index}
            />
          ))}
        </ul>

        <BorderGrid>
          {times(7, (borderIndex: number) => (
            <FadeInUpAnimation
              key={borderIndex}
              options={{
                distance: '60px',
                threshold: 0.5,
                transitionDelay: 0.1 * borderIndex,
                transitionTime: 1
              }}
            >
              <Border />
            </FadeInUpAnimation>
          ))}
        </BorderGrid>
      </Container>
    </Section>
  );
};

/**
 * Export `ProgressSection` component.
 */

export default ProgressSection;

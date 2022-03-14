
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { Display2 } from 'src/components/core/typography';
import { ProgressProps } from 'src/types/api';
import {
  Type,
  color,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { useInView } from 'react-intersection-observer';
import AnimatedNumber from 'react-animated-number';
import Container from 'src/components/core/layout/container';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import filter from 'lodash/filter';
import map from 'lodash/map';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: ProgressProps[],
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
 * `List` styled component.
 */

const List = styled.ul`
  border-top: 1px solid ${color('white')};
`;

/**
 * `Item` styled component.
 */

const Item = styled.li`
  border-bottom: 1px solid ${color('white')};
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
`;

/**
 * `Description` styled component.
 */

const Description = styled(Type.H3)`
  ${media.max('md')`
    position: relative;
    top: -22px;
  `}

  ${media.min('md')`
    padding: 18px 0;
  `}
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
    <Item ref={ref}>
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
        {description}
      </Description>
    </Item>
  );
};

/**
 * `ProgressSection` component.
 */

const ProgressSection = ({ data, id }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');
  const { activeItem } = useMemo(() => ({
    activeItem: filter(data, { active: true })
  }), [data]);

  return (
    <Section id={id}>
      {!isTablet && <StaticNavbar activeItem={id} />}

      <Container>
        {isTablet && (
          <StyledBadge variant={'outline'}>
            {'Progress'}
          </StyledBadge>
        )}

        <List>
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
        </List>
      </Container>
    </Section>
  );
};

/**
 * Export `ProgressSection` component.
 */

export default ProgressSection;

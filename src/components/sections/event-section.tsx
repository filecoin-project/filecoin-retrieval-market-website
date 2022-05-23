
/**
 * Module dependencies.
 */

import {
  Box,
  Type,
  color,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { EventProps } from 'src/types/api';
import Arrow from 'src/components/core/arrow';
import Container from 'src/components/core/layout/container';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: EventProps,
  name?: string
};

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  background-color: ${color('blue500')};
  margin-bottom: 50px;
  position: relative;

  ${media.min('ms')`
    margin-bottom: 35px;
  `}
`;

/**
 * `ArrowWrapper` styled component.
 */

const ArrowWrapper = styled.div`
  color: ${color('white')};
  grid-area: link;
  margin-bottom: 10px;

  ${media.min('md')`
    justify-self: flex-end;
    margin-bottom: 0;
  `}
`;

/**
 * `Link` styled component.
 */

const Link = styled.a.attrs({
  rel: 'noopener',
  target: '_blank'
})`
  color: ${color('white')};
  display: block;
  padding: ${units(2.5)} 0;
  text-decoration: none;

  &:focus,
  &:hover {
    ${ArrowWrapper} {
      > div {
        > span:first-child {
          transform: translate(50%, -150%);
          transition-delay: 0s;
        }

        > span:last-child {
          transform: translate(-50%, -50%);
          transition-delay: 0.25s;
        }
      }
    }
  }
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'link'
    'title'
    'description';
  grid-template-columns: 1fr;

  ${media.min('md')`
    grid-template-areas: '. title . description link .';
    grid-template-columns: 1fr 4fr 1fr 4fr repeat(2, 1fr);
  `}
`;

/**
 * `Description` styled component.
 */

const Description = styled(Type.Paragraph)`
  font-size: 12px;
  max-width: ${units(55)};

  ${media.min('md')`
    font-size: 16px;
  `}
`;

/**
 * `EventSection` component.
 */

const EventSection = ({ data }: Props): ReactElement => {
  const isMobile = useBreakpoint('ms', 'max');

  return (
    <Wrapper>
      <Link href={data?.link}>
        <Container>
          <Grid>
            <Box gridAreaMd={'title'}>
              <Type.H3
                letterSpacing={'-0.02px'}
                marginBottom={'10px'}
                marginBottomMd={0}
                maxWidth={units(55)}
              >
                {data?.title}
              </Type.H3>
            </Box>

            <Box gridAreaMd={'description'}>
              <Description>
                {data?.description}
              </Description>
            </Box>

            <ArrowWrapper>
              <Arrow
                isSmall
                size={isMobile ? '10px' : '20px'}
              />
            </ArrowWrapper>
          </Grid>
        </Container>
      </Link>
    </Wrapper>
  );
};

/**
 * Export `EventSection` component.
 */

export default EventSection;


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
import { ProjectProps } from 'src/types/api';
import { ifProp } from 'styled-tools';
import Arrow from 'src/components/core/arrow';
import Border from 'src/components/border';
import Container from 'src/components/core/layout/container';
import FadeInUpAnimation from 'src/components/core/animations/fade-in-up';
import React, { ReactElement, useMemo } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import split from 'lodash/split';
import styled, { css } from 'styled-components';
import times from 'lodash/times';

/**
 * `Props` type.
 */

type Props = {
  data: ProjectProps[],
  name?: string
};

/**
 * `Section` styled component.
 */

const Section = styled(Element).attrs({ as: 'section' })`
  padding: ${units(15)} 0 ${units(2.5)};
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
 * `List` styled component.
 */

const List = styled.div<{ hasBottomMargin?: boolean }>`
  ${ifProp('hasBottomMargin', css`
    margin-bottom: ${units(10.5)};

    ${media.min('md')`
      margin-bottom: ${units(17)};
    `}
  `)}
`;

/**
 * `ArrowWrapper` styled component.
 */

const ArrowWrapper = styled.div`
  color: ${color('white')};
`;

/**
 * `Item` styled component.
 */

const Item = styled.a.attrs({
  rel: 'noopener',
  target: '_blank'
})`
  color: ${color('white')};
  display: block;
  padding-bottom: ${units(3)};
  text-decoration: none;

  ${media.min('md')`
    padding-bottom: 50px;
  `}

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
 * `ItemGrid` styled component.
 */

const ItemGrid = styled.div`
  display: grid;
  grid-template-areas:
    'title       title       arrow'
    'description description description'
    'tags        .           status';
  grid-template-columns: 3fr 1fr 2fr;
  grid-template-rows: repeat(2, max-content) ${units(5.5)} max-content;

  ${media.min('md')`
    grid-template-areas:
      'title title . description description arrow'
      'tags  tags  . .           .           status';
    grid-template-columns: repeat(2, 2fr) 1fr 3fr repeat(2, 2fr);
    grid-template-rows: max-content ${units(8)} max-content;
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
 * `Tags` styled component.
 */

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: tags;
  grid-gap: ${units(2.5)};
  grid-row: 4 / span 1;

  ${media.min('md')`
    grid-row: 3 / span 1;
  `}
`;

/**
 * `ItemBadge` styled component.
 */

const ItemBadge = styled(Badge)`
  ${media.max('xs')`
    font-size: 14px;
  `}
`;

/**
 * `ListItem` component.
 */

const ListItem = (props): ReactElement => {
  const {
    description,
    label,
    status,
    statusColor,
    tags,
    title,
    url
  } = props;

  const isTablet = useBreakpoint('lg', 'max');

  return (
    <Item href={url}>
      <BorderGrid>
        {times(7, (borderIndex: number) => (
          <Box
            key={borderIndex}
            marginBottom={units(3)}
            marginBottomMd={units(5)}
          >
            <FadeInUpAnimation
              options={{
                distance: '60px',
                threshold: 0.5,
                transitionDelay: 0.1 * borderIndex,
                transitionTime: 1
              }}
            >
              <Border />
            </FadeInUpAnimation>
          </Box>
        ))}
      </BorderGrid>

      <ItemGrid>
        <Box
          gridArea={'title'}
          gridRowMd={'1 / 3'}
          marginBottom={units(1)}
        >
          {(!isTablet && label || isTablet) && (
            <FadeInUpAnimation
              options={{
                distance: '100%',
                threshold: 0.5,
                transitionDelay: 0.3,
                transitionTime: 1
              }}
            >
              <Type.H3
                minHeight={'22px'}
                textTransform={'uppercase'}
              >
                {label}
              </Type.H3>
            </FadeInUpAnimation>
          )}

          <FadeInUpAnimation
            options={{
              distance: '100%',
              threshold: 0.5,
              transitionDelay: 0.3,
              transitionTime: 1
            }}
          >
            <Type.H2>
              {title}
            </Type.H2>
          </FadeInUpAnimation>
        </Box>

        <Box gridArea={'description'}>
          <FadeInUpAnimation
            options={{
              distance: '100%',
              threshold: 0.5,
              transitionDelay: 0.5,
              transitionTime: 1
            }}
          >
            <Type.H3>
              {description}
            </Type.H3>
          </FadeInUpAnimation>
        </Box>

        {url && (
          <Box
            alignSelf={'flex-start'}
            gridArea={'arrow'}
            justifySelf={'flex-end'}
          >
            <FadeInUpAnimation
              options={{
                distance: '100%',
                threshold: 0.5,
                transitionDelay: 0.7,
                transitionTime: 1
              }}
            >
              <ArrowWrapper>
                <Arrow />
              </ArrowWrapper>
            </FadeInUpAnimation>
          </Box>
        )}

        <Tags>
          {map(split(tags, ','), (tag: string, indexTags: number) => (
            <FadeInUpAnimation
              key={indexTags}
              options={{
                distance: '100%',
                threshold: 0.5,
                transitionDelay: 0.1 * indexTags,
                transitionTime: 1
              }}
            >
              <ItemBadge variant={'fill'}>
                {tag}
              </ItemBadge>
            </FadeInUpAnimation>
          ))}
        </Tags>

        <Box
          alignSelf={'flex-end'}
          alignSelfMd={'flex-start'}
          gridArea={'status'}
          gridRow={'4 / span 1'}
          gridRowMd={'3 / span 1'}
          justifySelf={'flex-end'}
        >
          <FadeInUpAnimation
            options={{
              distance: '100%',
              threshold: 0.5,
              transitionDelay: 0.5,
              transitionTime: 1
            }}
          >
            <ItemBadge
              colorTheme={statusColor}
              variant={'fill'}
            >
              {status}
            </ItemBadge>
          </FadeInUpAnimation>
        </Box>
      </ItemGrid>
    </Item>
  );
};

/**
 * `ProjectsOpportunitiesSection` component.
 */

const ProjectsOpportunitiesSection = ({ data, name }: Props): ReactElement => {
  const isTablet = useBreakpoint('lg', 'max');
  const { opportunities, projects } = useMemo(() => ({
    opportunities: filter(data, { active: true, type: 'opportunity' }),
    projects: filter(data, { active: true, type: 'project' })
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
              {'Projects & Opportunities'}
            </StyledBadge>
          </FadeInUpAnimation>
        )}

        {!isEmpty(projects) && (
          <>
            <Box
              marginBottom={units(3)}
              marginBottomMd={units(4.5)}
            >
              <FadeInUpAnimation
                options={{
                  distance: '100%',
                  transitionTime: 1
                }}
              >
                <Type.H2>
                  {'Grants'}
                </Type.H2>
              </FadeInUpAnimation>
            </Box>

            <List hasBottomMargin={!isEmpty(opportunities)}>
              {map(projects, ({ ...rest }: ProjectProps, indexProjects: number) => (
                <ListItem
                  key={indexProjects}
                  {...rest}
                />
              ))}

              <BorderGrid>
                {times(7, (borderIndex: number) => (
                  <Box key={borderIndex}>
                    <FadeInUpAnimation
                      options={{
                        distance: '60px',
                        threshold: 0.5,
                        transitionDelay: 0.1 * borderIndex,
                        transitionTime: 1
                      }}
                    >
                      <Border />
                    </FadeInUpAnimation>
                  </Box>
                ))}
              </BorderGrid>
            </List>
          </>
        )}

        {!isEmpty(opportunities) && (
          <>
            <Box
              marginBottom={units(3)}
              marginBottomMd={units(4.5)}
            >
              <FadeInUpAnimation
                options={{
                  distance: '100%',
                  transitionTime: 1
                }}
              >
                <Type.H2>
                  {'Opportunities'}
                </Type.H2>
              </FadeInUpAnimation>
            </Box>

            <List>
              {map(opportunities, ({ ...rest }: ProjectProps, indexOpportunities: number) => (
                <ListItem
                  key={indexOpportunities}
                  {...rest}
                />
              ))}

              <BorderGrid>
                {times(7, (borderIndex: number) => (
                  <Box key={borderIndex}>
                    <FadeInUpAnimation
                      options={{
                        distance: '60px',
                        threshold: 0.5,
                        transitionDelay: 0.1 * borderIndex,
                        transitionTime: 1
                      }}
                    >
                      <Border />
                    </FadeInUpAnimation>
                  </Box>
                ))}
              </BorderGrid>
            </List>
          </>
        )}
      </Container>
    </Section>
  );
};

/**
 * Export `ProjectsOpportunitiesSection` component.
 */

export default ProjectsOpportunitiesSection;


/**
 * Module dependencies.
 */

import { Image, Type, color, media, units } from '@untile/react-components';
import { theme } from 'styled-tools';
import Arrow from 'src/components/core/arrow';
import React, { ReactElement } from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  description: string,
  iconImage: Array<{
    id: string,
    url: string
  }>,
  subtitle: string,
  title: string,
  url: string
};

/**
 * `ArrowWrapper` styled component.
 */

const ArrowWrapper = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  margin-right: ${units(2.5)};
`;

/**
 * `Link` styled component.
 */

const Link = styled.a.attrs({
  rel: 'noopener',
  target: '_blank'
})`
  background-color: ${color('white')};
  border-radius: ${units(5)};
  color: ${color('dark')};
  display: grid;
  grid-template-rows: max-content 1fr 50px;
  height: 100%;
  padding: ${units(2.5)};
  text-decoration: none;
  transition: ${theme('animations.defaultTransition')};
  transition-property: box-shadow;

  &:focus,
  &:hover {
    box-shadow: 10px 10px 8px ${color.transparentize('black', 0.25)};

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
 * `StyledImage` styled component.
 */

const StyledImage = styled(Image)`
  height: 80px;
  margin-bottom: ${units(9)};
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: minmax(100px, max-content) max-content;

  ${media.min('md')`
    grid-template-rows: minmax(150px, max-content) max-content;
  `}

  ${media.min('lg')`
    grid-template-rows: minmax(190px, max-content) max-content;
  `}
`;

/**
 * `Card` component.
 */

const Card = (props: Props): ReactElement => {
  const { description, iconImage, subtitle, title, url } = props;

  return (
    <Link href={url}>
      {map(iconImage, ({ id, url }) => url && (
        <StyledImage
          defaultUrl={url}
          key={id}
        />
      ))}

      <Content>
        <div>
          <Type.H2 marginBottom={'6px'}>
            {title}
          </Type.H2>

          <Type.H3 marginBottom={units(3)}>
            {subtitle}
          </Type.H3>
        </div>

        <Type.Paragraph marginBottom={units(2.5)}>
          {description}
        </Type.Paragraph>
      </Content>

      <ArrowWrapper>
        <Arrow />
      </ArrowWrapper>
    </Link>
  );
};

/**
 * Export `Card` component.
 */

export default Card;

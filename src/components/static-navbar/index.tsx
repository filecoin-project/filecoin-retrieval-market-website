
/**
 * Module dependencies.
 */

import { Badge } from 'src/components/core/badge';
import { ifProp, theme } from 'styled-tools';
import { media, units } from '@untile/react-components';
import { navbarLinks } from 'src/core/content-config/navbar';
import React from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  activeItem: string
};

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  align-items: flex-start;
  display: grid;
  grid-gap: ${units(4)};
  grid-template-areas: '. content';
  grid-template-columns: ${units(7.5)} 1fr;
  height: ${theme('dimensions.navbarHeightMobile')}px;
  left: 0;
  padding: 18px ${theme('grid.gutterMobile')}px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  ${media.min('md')`
    grid-template-columns: 70px 1fr;
    height: ${theme('dimensions.navbarHeight')}px;
    padding-bottom: 10px;
    padding-top: ${units(5)};
  `}

  ${media.min('lg')`
    padding-left: ${theme('grid.gutter')}px;
    padding-right: ${theme('grid.gutter')}px;
  `}
`;

/**
 * `Content` styled component.
 */

const Content = styled.div`
  display: flex;
  grid-area: content;
  justify-content: space-between;
  margin-left: auto;
  max-width: 1170px;
  width: 100%;
`;

/**
 * `StyledBadge` styled component.
 */

const StyledBadge = styled(Badge)<{ visible: boolean }>`
  opacity: ${ifProp('visible', 1, 0)};
  pointer-events: none;
  visibility: ${ifProp('visible', 'visible', 'hidden')};
`;

/**
 * `StaticNavbar` component.
 */

const StaticNavbar = ({ activeItem }: Props) => {
  return (
    <Wrapper>
      <Content>
        {map(navbarLinks, ({ id, label }) => (
          <StyledBadge
            key={label}
            variant={'outline'}
            visible={activeItem === id}
          >
            {label}
          </StyledBadge>
        ))}
      </Content>
    </Wrapper>
  );
};

/**
 * Export `StaticNavbar` component.
 */

export default StaticNavbar;

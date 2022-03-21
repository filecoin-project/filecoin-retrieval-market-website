
/**
 * Module dependencies.
 */

import { Fill, color, states } from '@untile/react-components';
import { ifProp, prop, theme } from 'styled-tools';
import { navbarLinks } from 'src/core/content-config/navbar';
import Container from 'src/components/core/layout/container';
import React, { ReactElement } from 'react';
import map from 'lodash/map';
import styled, { css } from 'styled-components';

/**
 * Constants.
 */

const delay = 100;
const startDelay = 250;

/**
 * `Props` type.
 */

type Props = {
  isOpen: boolean,
  onClickHandle: (id: string) => void
};

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled(Fill)<{ visible: boolean }>`
  min-height: 100vh;
  opacity: 1;
  overflow: hidden;
  padding-top: ${theme('dimensions.navbarHeightMobile')}px;
  position: fixed;
  transition: visibility 0s 0.85s;

  ${ifProp('visible', css`
    transition-delay: 0s;
    visibility: visible;
  `, css`
    pointer-events: none;
    visibility: hidden;
  `)}
`;

/**
 * `Background` styled component.
 */

const Background = styled(Fill)<{ visible: boolean }>`
  background-color: ${color.transparentize('blue900', 0.5)};
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform ${theme('animations.easeOutQuadTransition')};

  &::before {
    background: linear-gradient(180deg, #060D1C 0%, #0B1832 100%);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform ${theme('animations.easeOutQuadTransition')};
  }

  ${ifProp('visible', css`
    transform: scaleX(1);
    transition-delay: 0.15s;

    &::before {
      transform: scaleX(1);
      transition-delay: 0.25s;
    }
  `)}
`;

/**
 * `Gradient` styled component.
 */

const Gradient = styled.div<{ visible: boolean }>`
  background-image: radial-gradient(${color('blue500')} 7%, transparent 8%);
  background-position: center;
  background-size: 40px 40px;
  bottom: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity ${theme('animations.fastTransition')};
  transition-delay: 0s;
  width: 100%;

  &::after {
    background: linear-gradient(180deg, #060D1C 0%, transparent 100%);
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
  }

  ${ifProp('visible', css`
    opacity: 1;
    transition-delay: 0.65s;
  `)}
`;

/**
 * `StyledContainer` styled component.
 */

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: ${theme('dimensions.navbarHeightMobile')}px;
  position: relative;
  scroll-snap-type: y mandatory;
`;

/**
 * `MenuWrapper` styled component.
 */

const MenuWrapper = styled.div`
  padding: 60px 0;
`;

/**
 * `List` styled component.
 */

const List = styled.div<{ visible?: boolean }>`
  display: flex;
  flex-direction: column;
  grid-row-gap: 35px;
  opacity: ${ifProp('visible', 1, 0)};
  overflow: hidden;
  pointer-events: ${ifProp('visible', 'auto', 'none')};
  transition: ${theme('animations.fastTransition')};
  transition-delay: 0s;
  transition-property: opacity;
  width: 100%;

  ${ifProp('visible', css`
    transition-delay: 0.6s;
  `)}
`;

/**
 * `NavbarLink` styled component.
 */

const NavbarLink = styled.button<{
  delay: number,
  visible?: boolean
}>`
  appearance: none;
  background-color: transparent;
  border: 0;
  color: ${color('textColor')};
  cursor: pointer;
  font-size: 30px;
  letter-spacing: -0.02px;
  line-height: 33px;
  opacity: ${ifProp('visible', 1, 0)};
  padding: 0;
  text-align: left;
  text-decoration: none;
  transform: translateX(${ifProp('visible', '0', '-100%')});
  transition: ${theme('animations.menuTransition')};

  ${states.action`
    outline: none;
  `}

  ${ifProp('visible', css`
    transition-delay: ${prop('delay', 0)}ms;
  `)}
`;

/**
 * `Sidebar` component.
 */

const Sidebar = ({ isOpen, onClickHandle }: Props): ReactElement => (
  <Wrapper visible={isOpen}>
    <Background visible={isOpen} />

    <Gradient visible={isOpen} />

    <StyledContainer>
      <MenuWrapper>
        <List visible={isOpen}>
          {map(navbarLinks, ({ id, label }, index: number) => (
            <NavbarLink
              delay={(index + 1) * delay + startDelay}
              key={label}
              onClick={() => onClickHandle(id)}
              visible={isOpen}
            >
              {label}
            </NavbarLink>
          ))}
        </List>
      </MenuWrapper>
    </StyledContainer>
  </Wrapper>
);

/**
 * Export `Sidebar` component.
 */

export default Sidebar;

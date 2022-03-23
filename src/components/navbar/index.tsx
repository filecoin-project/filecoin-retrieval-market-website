
/**
 * Module dependencies.
 */

import {
  Image,
  color,
  media,
  units,
  useBodyScroll,
  useBreakpoint
} from '@untile/react-components';

import { Link } from 'react-scroll';
import { navbarLinks } from 'src/core/content-config/navbar';
import { routes } from 'src/core/routes';
import { theme } from 'styled-tools';
import Button from 'src/components/core/buttons/button';
import Container from 'src/components/core/layout/container';
import HamburgerMenu from './hamburger-menu';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import RouterLink from 'src/components/core/links/router-link';
import Sidebar from './sidebar';
import map from 'lodash/map';
import size from 'lodash/size';
import styled from 'styled-components';

/**
 * `Nav` styled component.
 */

const Nav = styled.nav`
  align-items: center;
  height: ${theme('dimensions.navbarHeightMobile')}px;
  left: 0;
  padding: 18px 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${theme('zIndex.navbar')};

  ${media.min('md')`
    height: ${theme('dimensions.navbarHeight')}px;
    padding: ${units(5)} 0 10px;
  `}
`;

/**
 * `ContentWrapper` styled component.
 */

const ContentWrapper = styled.div`
  align-items: flex-start;
  display: grid;
  grid-gap: ${units(4)};
  grid-template-columns: max-content 1fr;
`;

/**
 * `LogoLink` styled component.
 */

const LogoLink = styled(RouterLink)`
  color: ${color('white')};
  height: ${units(6)};
  transition: opacity ${theme('animations.defaultTransition')};
  z-index: ${theme('zIndex.menuLogo')};

  ${media.max('sm')`
    position: relative;
  `}

  &:focus,
  &:hover {
    opacity: 0.7;
    transition-delay: 0s;
  }
`;

/**
 * `StyledImage` styled component.
 */

const StyledImage = styled(Image)`
  width: ${units(7.5)};

  ${media.min('lg')`
    width: 70px;
  `}
`;

/**
 * `Actions` styled component.
 */

const Actions = styled.div<{ size: number }>`
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;
  max-width: 1170px;
  width: 100%;
`;

/**
 * `StyledButton` styled component.
 */

const StyledButton = styled(Button)`
  &:focus {
    background-color: transparent;
    color: ${color('white')};
  }
`;

/**
 * `StyledLink` styled component.
 */

const StyledLink = styled(Link)`
  &.active {
    ${StyledButton} {
      background-color: ${color('white')};
      color: ${color('black')};
    }
  }
`;

/**
 * `StyledSidebar` styled component.
 */

const StyledSidebar = styled(Sidebar)`
  z-index: 1;
`;

/**
 * `Navbar` component.
 */

const Navbar = (): ReactElement => {
  const isMobile = useBreakpoint('lg', 'max');
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>();
  const handleSidebar = useCallback(() => {
    if (isSidebarOpen) {
      setTimeout(() => {
        setSidebarOpen(false);
      }, 100);
    }
  }, [isSidebarOpen]);

  useBodyScroll({ off: isSidebarOpen });

  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  return (
    <Nav>
      <Container>
        <ContentWrapper>
          <LogoLink href={routes.home}>
            <StyledImage defaultUrl={'/static/images/logo.png'} />
          </LogoLink>

          <Actions size={size(navbarLinks)}>
            {!isMobile ? map(navbarLinks, ({ id, label }) => (
              <StyledLink
                duration={1000}
                key={label}
                smooth={'easeOutQuad'}
                spy
                to={id}
              >
                <StyledButton>
                  {label}
                </StyledButton>
              </StyledLink>
            )) : (
              <HamburgerMenu
                isOpen={isSidebarOpen}
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              />
            )}
          </Actions>
        </ContentWrapper>
      </Container>

      <StyledSidebar
        isOpen={isSidebarOpen}
        onClickHandle={handleSidebar}
      />
    </Nav>
  );
};

/**
 * Export `Navbar` component.
 */

export default Navbar;

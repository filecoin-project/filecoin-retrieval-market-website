
/**
 * Module dependencies.
 */

import {
  media,
  units,
  useBodyScroll,
  useBreakpoint
} from '@untile/react-components';

import { navbarLinks } from 'src/core/content-config/navbar';
import { theme } from 'styled-tools';
import Button from 'src/components/core/buttons/button';
import Container from 'src/components/core/layout/container';
import HamburgerMenu from './hamburger-menu';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
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
  const handleClicMenuLink = useCallback((id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

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
          <Actions size={size(navbarLinks)}>
            {!isMobile ? map(navbarLinks, ({ id, label }) => (
              <Button
                key={label}
                onClick={() => handleClicMenuLink(id)}
              >
                {label}
              </Button>
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
        onClickHandle={handleClicMenuLink}
      />
    </Nav>
  );
};

/**
 * Export `Navbar` component.
 */

export default Navbar;

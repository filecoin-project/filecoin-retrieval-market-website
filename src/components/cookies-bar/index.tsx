
/**
 * Module dependencies.
 */

import { SettingProps } from 'src/types/api';
import { Svg, Type, color, media, units } from '@untile/react-components';
import { parseCookies, setCookie } from 'nookies';
import { switchProp, theme } from 'styled-tools';
import Button from 'src/components/core/buttons/button';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import Transition from 'react-transition-group/Transition';
import UnderlineLink from 'src/components/core/links/underline-link';
import closeIcon from 'src/assets/svg/close.svg';
import filter from 'lodash/filter';
import head from 'lodash/head';
import styled, { css } from 'styled-components';

/**
 * Cookie name.
 */

const cookieName = 'accept-cookies';

/**
 * Duration.
 */

const duration = 500;

/**
 * `Props` type.
 */

type Props = {
  data: SettingProps[]
};

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div<{ transitionState: any }>`
  align-items: flex-start;
  backdrop-filter: blur(4px);
  background-color: ${color.transparentize('blue500', 0.85)};
  bottom: 0;
  display: grid;
  grid-gap: ${units(2)};
  grid-template-areas: 'content close';
  grid-template-columns: 1fr 42px;
  left: 0;
  opacity: 0;
  padding: ${units(2)};
  position: fixed;
  right: 0;
  transform: translateY(100%);
  transition: ${theme('animations.defaultTransition')};
  transition-delay: 0s 0.35s;
  transition-property: transform, opacity;
  z-index: ${theme('zIndex.cookiesBar')};

  ${media.min('md')`
    padding: ${units(5)} ${units(5)} ${units(6)} ${units(6)};
  `}

  ${switchProp('transitionState', {
    entered: css`
      opacity: 1;
      transform: translateY(0);
    `,
    entering: css`
      opacity: 1;
      transform: translateY(0);
    `,
    exited: css`
      opacity: 0;
      transform: translateY(100%);
    `,
    exiting: css`
      opacity: 0;
      transform: translateY(100%);
    `
  })}
`;

/**
 * `Content` styled component.
 */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: content;
  grid-gap: ${units(7)};
`;

/**
 * `ButtonsWrapper` styled component.
 */

const ButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  grid-gap: ${units(5)};
`;

/**
 * `CloseButton` styled component.
 */

const CloseButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  background-color: transparent;
  border: 0;
  color: ${color('white')};
  cursor: pointer;
  grid-area: close;
  outline: none;
  padding: 0;
  transition: color ${theme('animations.defaultTransition')};

  &:focus,
  &:hover {
    color: ${color.transparentize('white', 0.7)};
  }
`;

/**
 * `CookiesBar` component.
 */

const CookiesBar = ({ data }: Props): ReactElement | null => {
  const cookies = parseCookies();
  const [visible, setVisible] = useState<boolean>(false);
  const handleAcceptTerms = useCallback(() => {
    setVisible(false);
    setCookie(null, cookieName, 'true', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
  }, []);

  useEffect(() => {
    if (!cookies[cookieName]) {
      setVisible(true);
    }
  }, [cookies]);

  const { cookiesButtonLink } = useMemo(() => ({
    cookiesButtonLink: head(filter(data, { type: 'cookies-button-link' }))
  }), [data]);

  return (
    <Transition
      in={visible}
      mountOnEnter
      timeout={duration}
      unmountOnExit
    >
      {state => (
        <Wrapper transitionState={state}>
          <Content>
            <Type.H2 maxWidth={units(85)}>
              {'This website uses cookies to improve your experience.'}
            </Type.H2>

            <ButtonsWrapper>
              <Button onClick={handleAcceptTerms}>
                {'Accept'}
              </Button>

              {cookiesButtonLink?.value && (
                <UnderlineLink
                  href={cookiesButtonLink?.value}
                  size={'small'}
                >
                  {cookiesButtonLink?.name}
                </UnderlineLink>
              )}
            </ButtonsWrapper>
          </Content>

          <CloseButton onClick={handleAcceptTerms}>
            <Svg
              icon={closeIcon}
              size={'42px'}
            />
          </CloseButton>
        </Wrapper>
      )}
    </Transition>
  );
};

/**
 * Export `CookiesBar` component.
 */

export default CookiesBar;


/**
 * Module dependencies.
 */

import {
  Box,
  Svg,
  Type,
  color,
  isExternalUrl,
  media,
  units,
  useBreakpoint
} from '@untile/react-components';

import { SettingProps } from 'src/types/api';
import { colors } from 'src/styles/colors';
import { theme } from 'styled-tools';
import Button from 'src/components/core/buttons/button';
import Container from 'src/components/core/layout/container';
import DotsGrid from 'src/components/dots-grid';
import DotsGridSection from './dots-grid-section';
import React, { ReactElement, useMemo } from 'react';
import StaticNavbar from 'src/components/static-navbar';
import UnderlineLink from 'src/components/core/links/underline-link';
import arrowRight from 'src/assets/svg/arrow-right.svg';
import filter from 'lodash/filter';
import head from 'lodash/head';
import map from 'lodash/map';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  data: SettingProps[],
  id?: string
};

/**
 * `Section` styled component.
 */

const Section = styled.section`
  background-color: ${color('blue400')};
  position: relative;
`;

/**
 * `StyledDotsGridSection` styled component.
 */

const StyledDotsGridSection = styled(DotsGridSection)`
  &::after {
    background: linear-gradient(180deg, ${color('blue400')} 0%, transparent 50%, ${color('blue400')} 100%);
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

/**
 * `DotsGridWrapper` styled component.
 */

const DotsGridWrapper = styled.div`
  &::after {
    background: linear-gradient(180deg, ${color('blue400')} 0%, transparent 50%, ${color('blue400')} 100%);
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'meetingLink meetingLink'
    'footerLinks footerLinks'
    'contactLink socialNetworks'
    'author      socialNetworks';
  grid-template-columns: 8fr 4fr;
  grid-template-rows: max-content 1fr repeat(2, max-content);
  padding: ${units(17)} 0 38px;

  ${media.max('ms')`
    min-height: 100vh;
  `}

  ${media.min('ms')`
    grid-template-areas:
      'meetingLink footerLinks'
      'contactLink socialNetworks'
      'author      socialNetworks';
    grid-template-rows: max-content 1fr max-content;
  `}

  ${media.min('md')`
    grid-template-areas:
      'meetingLink footerLinks'
      'contactLink contactLink'
      'author      socialNetworks';
    grid-template-columns: repeat(2, 1fr);
    min-height: 100vh;
    padding-top: ${units(19.5)};
  `}
`;

/**
 * `HiddenSvg` styled component.
 */

const HiddenSvg = styled(Svg)`
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-200%, -50%);
  transition: ${theme('animations.defaultTransition')};
  transition-property: opacity, transform;
`;

/**
 * `VisibleSvg` styled component.
 */

const VisibleSvg = styled(HiddenSvg)`
  opacity: 1;
  transform: translate(-50%, -50%);
`;

/**
 * `ArrowLink` styled component.
 */

const ArrowLink = styled.a.attrs({
  rel: 'noopener',
  target: '_blank'
})`
  background-color: ${color('white')};
  border-radius: 50%;
  color: ${color('blue400')};
  display: table;
  height: ${units(10)};
  position: relative;
  width: ${units(10)};

  &:focus,
  &:hover {
    ${HiddenSvg} {
      opacity: 1;
      transform: translate(-50%, -50%);
    }

    ${VisibleSvg} {
      opacity: 0;
      transform: translate(200%, -50%);
    }
  }
`;

/**
 * `ContactLink` styled component.
 */

const ContactLink = styled.a.attrs({
  rel: 'noopener',
  target: '_blank'
})`
  color: ${color('white')};
  display: table;
  position: relative;
  text-decoration: none;
  transition: color ${theme('animations.defaultTransition')};
  z-index: 1;

  &:focus,
  &:hover {
    color: ${color.transparentize('white', 0.7)};

    & ~ ${ArrowLink} {
      ${HiddenSvg} {
        opacity: 1;
        transform: translate(-50%, -50%);
      }

      ${VisibleSvg} {
        opacity: 0;
        transform: translate(200%, -50%);
      }
    }
  }
`;

/**
 * `ContactLabel` styled component.
 */

const ContactLabel = styled(Type.H2)`
  margin-bottom: ${units(3)};
  position: relative;
  width: max-content;
  z-index: 1;

  ${media.min('md')`
    margin-bottom: ${units(2.5)};
  `}
`;

/**
 * `FooterLinksWrapper` styled component.
 */

const FooterLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: footerLinks;
  grid-gap: 22px;

  ${media.max('md')`
    margin-bottom: 78px;
  `}

  ${media.min('ms')`
    margin-left: auto;
  `}

  ${media.min('md')`
    grid-gap: 50px;
    padding: 0 50px;
  `}
`;

/**
 * `SmallLabel` styled component.
 */

const SmallLabel = styled(Type.H5)`
  position: relative;
  z-index: 1;
`;

/**
 * `MailLabel` styled component.
 */

const MailLabel = styled(Type.H3)`
  position: relative;
  z-index: 1;
`;

/**
 * `SocialNetworksWrapper` styled component.
 */

const SocialNetworksWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  grid-area: socialNetworks;
  grid-gap: 30px;

  ${media.min('md')`
    align-items: center;
    flex-direction: row;
    grid-gap: ${units(4)};
    justify-content: flex-end;
  `}
`;

/**
 * `AuthorWrapper` styled component.
 */

const AuthorWrapper = styled.div`
  grid-area: author;

  ${media.max('md')`
    margin-top: auto;
  `}
`;

/**
 * `ContactsSection` component.
 */

const ContactsSection = ({ data, id }: Props): ReactElement => {
  const isMobile = useBreakpoint('ms', 'max');
  const isTablet = useBreakpoint('lg', 'max');
  const { emailContact, footerLinks, socialNetworks } = useMemo(() => ({
    emailContact: head(filter(data, { type: 'email' })),
    footerLinks: filter(data, { type: 'footer-link' }),
    socialNetworks: filter(data, { type: 'social-network' })
  }), [data]);

  return (
    <Section id={id}>
      <Container>
        {!isTablet && (
          <>
            <StaticNavbar activeItem={id} />

            <StyledDotsGridSection dotsColor={colors.white} />
          </>
        )}

        {isTablet && (
          <DotsGridWrapper>
            <DotsGrid />
          </DotsGridWrapper>
        )}

        <Grid>
          <Box
            gridArea={'meetingLink'}
            marginBottom={'78px'}
            marginBottomMd={'114px'}
          >
            <ContactLink href={'https://filecoin.io/slack'}>
              <Type.H2 marginBottom={'10px'}>
                {'Join the Retrieval market Community on Filecoin Slack, #retreival-market'}
              </Type.H2>
            </ContactLink>

            {!isMobile && (
              <ArrowLink href={'https://filecoin.io/slack'}>
                <VisibleSvg
                  icon={arrowRight}
                  size={'30px'}
                />

                <HiddenSvg
                  icon={arrowRight}
                  size={'30px'}
                />
              </ArrowLink>
            )}
          </Box>

          <FooterLinksWrapper>
            {map(footerLinks, ({ name, value }, index: number) => value && (
              <UnderlineLink
                href={value}
                key={index}
              >
                {name}
              </UnderlineLink>
            ))}
          </FooterLinksWrapper>

          <Box gridArea={'contactLink'}>
            <ContactLabel>
              {'Contacts'}
            </ContactLabel>

            {emailContact?.value && (
              <ContactLink href={`mailto:${emailContact.value}`}>
                <MailLabel>
                  {emailContact?.name}
                </MailLabel>
              </ContactLink>
            )}
          </Box>

          <AuthorWrapper>
            <SmallLabel>
              {'Made by '}

              <UnderlineLink
                href={'https://www.ondastudio.co/'}
                size={'small'}
              >
                {'Onda'}
              </UnderlineLink>
            </SmallLabel>
          </AuthorWrapper>

          <SocialNetworksWrapper>
            {map(socialNetworks, ({ name, value }, index: number) => value && (
              <Button
                href={value}
                {...value && isExternalUrl(value) && {
                  rel: 'noopener',
                  target: '_blank'
                }}
                key={index}
              >
                {name}
              </Button>
            ))}
          </SocialNetworksWrapper>
        </Grid>
      </Container>
    </Section>
  );
};

/**
 * Export `ContactsSection` component.
 */

export default ContactsSection;

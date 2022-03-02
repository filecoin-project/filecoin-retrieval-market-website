
/**
 * Module dependencies.
 */

import { Meta } from '@storybook/react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { units } from '@untile/react-components/dist/styles';
import { withDesign } from 'storybook-addon-designs';
import React, { ReactElement } from 'react';
import UnderlineLink, { UnderlineLinkSize } from 'src/components/core/links/underline-link';
import styled from 'styled-components';

/**
 * Export story configuration.
 */

export default {
  decorators: [withDesign, withKnobs],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Jyqz4uiIduzTDulNAs0A0U/Retrieval-Market-(Dev)?node-id=231%3A2'
    }
  },
  title: 'Components/Links'
} as Meta;

/**
 * `Container` styled component.
 */

const Container = styled.div`
  margin: auto;
  padding: ${units(8)};
  width: ${units(56)};
`;

/**
 * `UnderlineLinkSizes` type.
 */

type UnderlineLinkSizes = {
  [key: string]: UnderlineLinkSize
};

/**
 * Underline link size.
 */

const underlineLinkSize: UnderlineLinkSizes = {
  default: 'default',
  small: 'small'
};

/**
 * Export `underlineLink`.
 */

export const underlineLink = (): ReactElement => {
  const label = text('Text', 'Underline link');
  const href = text('Url', 'https://untile.pt/');
  const size = select('Size', underlineLinkSize, 'default');

  return (
    <Container>
      <UnderlineLink
        href={href}
        size={size}
      >
        {label}
      </UnderlineLink>
    </Container>
  );
};

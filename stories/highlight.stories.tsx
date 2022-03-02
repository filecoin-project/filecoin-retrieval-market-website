
/**
 * Module dependencies.
 */

import { Meta } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { units } from '@untile/react-components/dist/styles';
import { withDesign } from 'storybook-addon-designs';
import Highlight from 'src/components/core/highlight';
import React, { ReactElement } from 'react';
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
  title: 'Components/Highlight'
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
 * Export `highlight`.
 */

export const highlight = (): ReactElement => {
  const label = text('Text', 'Highlight');

  return (
    <Container>
      <Highlight>
        {label}
      </Highlight>
    </Container>
  );
};

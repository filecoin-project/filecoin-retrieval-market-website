
/**
 * Module dependencies.
 */

import { Meta } from '@storybook/react';
import { color, units } from '@untile/react-components/dist/styles';
import { withDesign } from 'storybook-addon-designs';
import { withKnobs } from '@storybook/addon-knobs';
import Arrow from 'src/components/core/arrow';
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
  title: 'Components/Arrow'
} as Meta;

/**
 * `Container` styled component.
 */

const Container = styled.div`
  background-color: ${color('white')};
  display: flex;
  justify-content: center;
  margin: auto;
  padding: ${units(8)};
  width: ${units(56)};
`;

/**
 * Export `arrow`.
 */

export const arrow = (): ReactElement => {
  return (
    <Container>
      <Arrow />
    </Container>
  );
};

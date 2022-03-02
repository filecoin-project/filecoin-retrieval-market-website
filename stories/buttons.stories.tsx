
/**
 * Module dependencies.
 */

import { Meta } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { units } from '@untile/react-components/dist/styles';
import { withDesign } from 'storybook-addon-designs';
import Button from 'src/components/core/buttons/button';
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
  title: 'Components/Buttons'
} as Meta;

/**
 * `Container` styled component.
 */

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${units(8)};
  width: ${units(56)};
`;

/**
 * Export `button`.
 */

export const button = (): ReactElement => {
  const title = text('Text', 'Button');
  const disabled = boolean('Disabled', false);

  return (
    <Container>
      <Button disabled={disabled}>
        {title}
      </Button>
    </Container>
  );
};

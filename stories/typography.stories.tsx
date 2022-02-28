
/**
 * Module dependencies.
 */

import { Display1, Display2 } from 'src/components/core/typography';
import { Meta } from '@storybook/react';
import { Type } from '@untile/react-components';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { units } from '@untile/react-components/dist/styles';
import { withDesign } from 'storybook-addon-designs';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

/**
 * Export story configuration.
 */

export default {
  decorators: [withDesign, withKnobs],
  parameters: {
    design: {
      type: 'figma'
    }
  },
  title: 'Components/Typography'
} as Meta;

/**
 * `Container` styled component.
 */

const Container = styled.div`
   margin: 50px ${units(3)} 0;
   width: 100%;
 `;

/**
 * Encode name.
 */

function encodeName(name: string) {
  return name
    .replace('&amp;', '&')
    .replace('&quot;', '"')
    .replace('&#39;', '\'')
    .replace('&lt;', '<')
    .replace('&gt;', '>');
}

/**
 * Types.
 */

const types = {
  display1: 'display1',
  display2: 'display2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  paragraph: 'paragraph'
};

/**
 * Type components.
 */

const typeComponents = {
  display1: Display1,
  display2: Display2,
  h1: Type.H1,
  h2: Type.H2,
  h3: Type.H3,
  h4: Type.H4,
  h5: Type.H5,
  paragraph: Type.Paragraph
};

/**
 * Export `type`.
 */

export const type = (): ReactElement => {
  const name = encodeName(text('Text', 'Lorem Ipsum is dummy text.'));
  const type = select('Type', types, 'h1');
  const Component = typeComponents[type];

  return (
    <Container>
      <Component>
        {`${type}. ${name}`}
      </Component>
    </Container>
  );
};

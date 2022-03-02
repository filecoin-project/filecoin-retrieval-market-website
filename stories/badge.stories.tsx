
/**
 * Module dependencies.
 */

import { Badge, BadgeVariant } from 'src/components/core/badge';
import { Meta } from '@storybook/react';
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
      type: 'figma',
      url: 'https://www.figma.com/file/Jyqz4uiIduzTDulNAs0A0U/Retrieval-Market-(Dev)?node-id=231%3A2'
    }
  },
  title: 'Components/Badge'
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
 * `VariantOptions` type.
 */

type VariantOptions = {
  [key: string]: BadgeVariant
};

/**
 * Variant options.
 */

const variantOptions: VariantOptions = {
  fill: 'fill',
  outline: 'outline'
};

/**
 * Export `badge`.
 */

export const badge = (): ReactElement => {
  const title = text('Text', 'Badge');
  const colorTheme = text('Color theme', '#ffffff');
  const variant: BadgeVariant = select('Variant', variantOptions, variantOptions.fill);

  return (
    <Container>
      <Badge
        colorTheme={colorTheme}
        variant={variant}
      >
        {title}
      </Badge>
    </Container>
  );
};

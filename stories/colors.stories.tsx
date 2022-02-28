
/**
 * Module dependencies.
 */

import { Meta } from '@storybook/react';
import { color } from '@untile/react-components/dist/styles';
import { colors as colorsTheme } from 'src/styles/colors';
import { withDesign } from 'storybook-addon-designs';
import { withKnobs } from '@storybook/addon-knobs';
import React, { ReactElement } from 'react';
import styled, { ThemeConsumer } from 'styled-components';

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
  title: 'Styleguide/Colors'
} as Meta;

/**
 * `Container` styled component.
 */

const Container = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin: 50px auto 0;
  width: 100%;
`;

/**
 * `Card` styled component.
 */

const Card = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 4px;
  box-shadow: 0 15px 32px 0 rgba(0, 0, 0, 0.08);
  height: 150px;
  overflow: hidden;
  position: relative;
`;

/**
 * `Text` styled component.
 */

const Text = styled.div`
  align-items: center;
  background-color: ${color('white')};
  border-top: 1px solid ${color.transparentize('black', 0.1)};
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  height: 50px;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;

  div:first-child {
    font-weight: 700;
    margin-bottom: 2px;
  }
`;

/**
 * `ColorCardProps` type.
 */

type ColorCardProps = {
  colorHex: string,
  name: string
};

/**
 * `ColorCard` component.
 */

const ColorCard = ({ colorHex, name }: ColorCardProps): ReactElement => (
  <Card bgColor={colorHex}>
    <Text>
      <div>
        {name}
      </div>

      <div>
        {colorHex}
      </div>
    </Text>
  </Card>
);

/**
 * Export `palette`.
 */

export const palette = (): ReactElement => (
  <ThemeConsumer>
    {({ colors }) => (
      <Container>
        {Object.keys(colors).map((name: string, index: number) => typeof colors[name] === 'string' && (
          <ColorCard
            colorHex={colorsTheme[name]}
            key={index}
            name={name}
          />
        ))}
      </Container>
    )}
  </ThemeConsumer>
);

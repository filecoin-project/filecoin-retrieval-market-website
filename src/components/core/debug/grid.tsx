
/**
 * Module dependencies.
 */

import { Fill, color, media, units } from '@untile/react-components';
import { prop, theme } from 'styled-tools';
import Container from 'src/components/core/layout/container';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import times from 'lodash/times';

/**
 * `Props` type.
 */

type Props = {
  columns: number,
  gap: number
};

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled(Fill)`
  pointer-events: none;
  position: fixed;
  z-index: 999;

  ${media.min('md')`
    padding-left: ${theme('dimensions.verticalBar')}px;
  `}

  * {
    height: 100%;
  }
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div<Props>`
  display: grid;
  grid-gap: ${prop('gap', 0)}px;
  grid-template-columns: repeat(${prop('columns')}, 1fr);
`;

/**
 * `Column` styled component.
 */

const Column = styled.div`
  background-color: ${color.transparentize('white', 0.05)};
`;

/**
 * `Button` styled component.
 */

const Button = styled.button`
  bottom: ${units(7)};
  font-size: 10px;
  left: ${units(1)};
  position: fixed;
  z-index: 999;
`;

/**
 * `GridDebug` component.
 */

const GridDebug = (props: Props): ReactElement => {
  const { columns } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        {'Grid'}
      </Button>

      {visible && (
        <Wrapper>
          <Container>
            <Grid {...props}>
              {times(columns, index => <Column key={index} />)}
            </Grid>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

/**
 * Export `GridDebug` component.
 */

export default GridDebug;

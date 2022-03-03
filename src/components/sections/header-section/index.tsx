
/**
 * Module dependencies.
 */

import { color, units } from '@untile/react-components';
import { ifProp, theme } from 'styled-tools';
import Dot, { DotProps } from './dot';
import React, { ReactElement, useEffect, useState } from 'react';
import concat from 'lodash/concat';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import map from 'lodash/map';
import styled from 'styled-components';
import times from 'lodash/times';

/**
 * `Props` type.
 */

type Props = {
  className?: string,
  dotsColor: string
};

/**
 * Constants.
 */

const totalRows = 21;
const totalColumns = 34;

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.section`
  background-color: ${color('black')};
  padding: ${units(6)};
  position: relative;
  width: 100vw;
`;

/**
 * `RowsWrapper` styled component.
 */

const RowsWrapper = styled.div`
  display: grid;
  grid-auto-columns: 100%;
  grid-row-gap: calc((63vw - 2 * ${units(6)}) / ${totalRows});
  margin: auto;
  max-width: 93.4vw;
`;

/**
 * `Row` styled component.
 */

const Row = styled.div<{ isVisible?: boolean }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  opacity: ${ifProp('isVisible', 1, 0)};
  transition: opacity ${theme('animations.defaultTransition')};
  width: 100%;
`;

/**
 * `HeaderSection` component.
 */

const HeaderSection = (props: Props): ReactElement => {
  const { className, dotsColor } = props;
  const [hoveredDots, setHoveredDots] = useState<DotProps[]>([]);
  const [renderedRows, setRenderedRows] = useState<number[]>([]);
  const [hasHoverEffect, setHasHoverEffect] = useState<boolean>(false);

  useEffect(() => {
    if (isEmpty(renderedRows)) {
      setRenderedRows([totalRows - 1]);

      return;
    }

    const lastRenderedRow = last(renderedRows);

    if (lastRenderedRow > 0) {
      const timeout = setTimeout(() => {
        setRenderedRows(previous => concat(previous, lastRenderedRow - 1));
      }, 2 * lastRenderedRow);

      return () => clearTimeout(timeout);
    }

    if (lastRenderedRow === 0) {
      const timeout = setTimeout(() => {
        setHasHoverEffect(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [renderedRows]);

  return (
    <Wrapper className={className}>
      <RowsWrapper>
        {map(times(totalRows), (_, rowIndex) => (
          <Row
            isVisible={includes(renderedRows, rowIndex)}
            key={rowIndex}
          >
            {map(times(totalColumns), (_, columnIndex) => {
              const dot = {
                column: columnIndex,
                index: rowIndex * totalColumns + columnIndex,
                row: rowIndex
              };

              return (
                <Dot
                  color={dotsColor}
                  dot={dot}
                  hasHoverEffect={hasHoverEffect}
                  hoveredDots={hoveredDots}
                  key={dot.index}
                  onSetHoveredDots={setHoveredDots}
                  totalRows={totalRows}
                />
              );
            })}
          </Row>
        ))}
      </RowsWrapper>
    </Wrapper>
  );
};

/**
 * Export `HeaderSection` component.
 */

export default HeaderSection;

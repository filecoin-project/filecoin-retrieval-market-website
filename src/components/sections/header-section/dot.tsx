
/**
 * Module dependencies.
 */

import { prop, switchProp, theme } from 'styled-tools';
import { units } from '@untile/react-components';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo
} from 'react';

import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components';

/**
 * `DotSize` type.
 */

type DotSize = 'big' | 'bigger' | 'default' | 'large' | 'largest';

/**
 * `DotTrailDirection` type.
 */

type DotTrailDirection = 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'none' | 'right' | 'top' | 'topLeft' | 'topRight';

/**
 * Export `DotProps` type.
 */

export type DotProps = {
  column: number,
  index: number,
  row: number
}

/**
 * `Props` type.
 */

type Props = {
  className?: string,
  color: string,
  dot: DotProps,
  hasHoverEffect: boolean,
  hoveredDots: DotProps[],
  onSetHoveredDots: Dispatch<SetStateAction<DotProps[]>>,
  totalRows: number
}

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  height: 2px;
  position: relative;
  width: 2px;
`;

/**
 * `InnerWrapper` styled component.
 */

const InnerWrapper = styled.div<{
  color: string,
  size: DotSize,
  totalRows: number,
  trailDirection: DotTrailDirection,
  trailOpacity: number
}>`
  --trailLength: calc((64vw - 2 * ${units(6)}) / ${prop('totalRows')});
  --diagonalTrailLength: calc(var(--trailLength) + 1.4vw);
  --dotRadius: -1.39vw;

  border-radius: 50%;
  inset: var(--dotRadius);
  position: absolute;

  &::before {
    background-color: ${prop('color')};
    content: '';
    opacity: ${prop('trailOpacity')};
    position: absolute;
    transition:
      height ${theme('animations.quickSmoothTransition')},
      width ${theme('animations.quickSmoothTransition')};
    will-change: height, transform, width;

    ${switchProp('trailDirection', { /* eslint-disable indent */
      bottom: css`
        height: var(--trailLength);
        left: 50%;
        top: var(--dotRadius);
        transform: translate3d(-50%, 0, 0);
        width: 1px;
      `,
      bottomLeft: css`
        height: var(--diagonalTrailLength);
        left: 0;
        bottom: calc(var(--dotRadius) - 0.75vw);
        transform: rotate(45deg);
        width: 1px;
      `,
      bottomRight: css`
        height: var(--diagonalTrailLength);
        right: 0;
        bottom: calc(var(--dotRadius) - 0.75vw);
        transform: rotate(-45deg);
        width: 1px;
      `,
      left: css`
        height: 1px;
        left: var(--dotRadius);
        top: 50%;
        transform: translate3d(0, -50%, 0);
        width: var(--trailLength);
      `,
      right: css`
        height: 1px;
        right: var(--dotRadius);
        top: 50%;
        transform: translate3d(0, -50%, 0);
        width: var(--trailLength);
      `,
      top: css`
        bottom: var(--dotRadius);
        height: var(--trailLength);
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        width: 1px;
      `,
      topLeft: css`
        height: var(--diagonalTrailLength);
        left: 0;
        top: calc(var(--dotRadius) - 0.75vw);
        transform: rotate(-45deg);
        width: 1px;
      `,
      topRight: css`
        height: var(--diagonalTrailLength);
        right: 0;
        top: calc(var(--dotRadius) - 0.75vw);
        transform: rotate(45deg);
        width: 1px;
      `
    })}
  }

  &::after {
    background-color: ${prop('color')};
    border-radius: 50%;
    content: '';
    height: ${units(0.5)};
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: ${theme('animations.quickSmoothTransition')};
    transition-property: height, width;
    width: ${units(0.5)};
    will-change: height, width;

    ${switchProp('size', {
      big: css`
        height: ${units(1)};
        width: ${units(1)};
      `,
      bigger: css`
        height: ${units(1.5)};
        width: ${units(1.5)};
      `,
      large: css`
        height: ${units(2)};
        width: ${units(2)};
      `,
      largest: css`
        height: ${units(2.5)};
        width: ${units(2.5)};
      `
    })}
  }
`;

/**
 * `Dot` component.
 */

const Dot = (props: Props): ReactElement => {
  const {
    className,
    color,
    dot,
    hasHoverEffect,
    hoveredDots,
    onSetHoveredDots,
    totalRows
  } = props;

  const indexFound = useMemo(() => {
    return findIndex(hoveredDots, ({ index }) => index === dot.index);
  }, [dot.index, hoveredDots]);

  const size = useMemo(() => {
    const sizes = ['largest', 'large', 'bigger', 'big'];

    if (indexFound >= 0 && indexFound <= 3) {
      return sizes[indexFound] as DotSize;
    }

    return 'default';
  }, [indexFound]);

  const trailOpacity = useMemo(() => {
    if (indexFound > -1) {
      return 1 - 0.1 * indexFound;
    }

    return 0;
  }, [indexFound]);

  const trailDirection = useMemo(() => {
    if (indexFound > -1 && indexFound < 7) {
      const previousDot = hoveredDots[indexFound + 1];

      if (isEmpty(previousDot)) {
        return 'none';
      }

      if (previousDot.row === dot.row) {
        return previousDot.column < dot.column ? 'left' : 'right';
      }

      if (previousDot.column === dot.column) {
        return previousDot.row > dot.row ? 'top' : 'bottom';
      }

      if (previousDot.row < dot.row) {
        return previousDot.column < dot.column ? 'topLeft' : 'topRight';
      }

      if (previousDot.row > dot.row) {
        return previousDot.column > dot.column ? 'bottomRight' : 'bottomLeft';
      }
    }

    return 'none';
  }, [dot.column, dot.row, hoveredDots, indexFound]);

  const handleHoverDot = useCallback(() => {
    if (!hasHoverEffect) {
      return;
    }

    onSetHoveredDots(current => {
      let newDots = current;

      if (hoveredDots.length >= 8) {
        newDots = dropRight(newDots);
      }

      return concat(dot, newDots);
    });
  }, [dot, hasHoverEffect, hoveredDots.length, onSetHoveredDots]);

  return (
    <Wrapper
      className={className}
      onMouseEnter={() => handleHoverDot()}
    >
      <InnerWrapper
        color={color}
        size={size}
        totalRows={totalRows}
        trailDirection={trailDirection}
        trailOpacity={trailOpacity}
      />
    </Wrapper>
  );
};

/**
 * Export `Dot` component.
 */

export default Dot;

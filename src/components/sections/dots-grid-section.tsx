
/**
 * Module dependencies.
 */

import { transparentize } from '@untile/react-components';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import findIndex from 'lodash/findIndex';
import flatten from 'lodash/flatten';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
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
 * `CanvasProps` type.
 */

type CanvasProps = {
  context: CanvasRenderingContext2D,
  height: number,
  width: number
}

/**
 * `Dot` type.
 */

type Dot = {
  dotIndex: number,
  dotX: number,
  dotY: number
}

/**
 * Constants.
 */

const dotSizes = [10, 8, 6, 4];
const hoverRadius = 15;
const maxDotsWithTrail = 8;
const gapBetweenDots = 40;

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

/**
 * `isMouseHoveringDot`.
 */

function isMouseHoveringDot({ dotX, dotY, offsetX, offsetY }) {
  const hypotenuse = Math.abs(Math.pow(offsetX - dotX, 2)) + Math.abs(Math.pow(offsetY - dotY, 2));

  return Math.sqrt(hypotenuse) <= hoverRadius;
}

/**
 * `drawDot`.
 */

function drawDot({ color, context, dotX, dotY, size }) {
  context.beginPath();
  context.arc(dotX, dotY, size, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

/**
 * `drawLine`.
 */

function drawLine({ color, context, opacity, x1, x2, y1, y2 }) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 2;
  context.strokeStyle = transparentize(color, opacity);
  context.stroke();
}

/**
 * `clearCanvas`.
 */

function clearCanvas({ context, height, width }) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'transparent';
  context.fillRect(0, 0, width, height);
}

/**
 * `DotsGridSection` component.
 */

const DotsGridSection = ({ className, dotsColor }: Props): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const [canvas, setCanvas] = useState<CanvasProps>();
  const [dots, setDots] = useState<Dot[]>([]);
  const [totalRows, setTotalRows] = useState<number>();
  const [totalColumns, setTotalColumns] = useState<number>();
  const [hasRenderedFirstTime, setHasRenderedFirstTime] = useState<boolean>(false);
  const [hoveredDots, setHoveredDots] = useState<Dot[]>([]);
  const [lastRenderedRow, setLastRenderedRow] = useState<number>();
  const getDotSize = useCallback((dot: Dot) => {
    const indexFound = findIndex(hoveredDots, ({ dotIndex }) => {
      return dot.dotIndex === dotIndex;
    });

    if (indexFound >= 0 && indexFound <= 3) {
      return dotSizes[indexFound];
    }

    return 2;
  }, [hoveredDots]);

  const getDotTrail = useCallback((dot: Dot) => {
    const indexFound = findIndex(hoveredDots, ({ dotIndex }) => {
      return dot.dotIndex === dotIndex;
    });

    if (indexFound > -1 && indexFound < maxDotsWithTrail - 1) {
      return {
        ...hoveredDots[indexFound + 1],
        opacity: hoveredDots.length / maxDotsWithTrail - 0.1 * indexFound
      };
    }

    return null;
  }, [hoveredDots]);

  const handleUpdateHoveredDots = useCallback((dot: Dot) => {
    if (isEmpty(hoveredDots)) {
      setHoveredDots([dot]);

      return;
    }

    if (dot.dotIndex !== hoveredDots[0].dotIndex) {
      setHoveredDots(previous => {
        let newDots = previous;

        if (newDots.length === maxDotsWithTrail) {
          newDots = dropRight(newDots);
        }

        return concat(dot, newDots);
      });
    }
  }, [hoveredDots]);

  const handleRemoveLastHoveredDot = useCallback(() => {
    setHoveredDots(previous => {
      if (previous.length > 1) {
        return dropRight(previous);
      }

      return previous;
    });
  }, []);

  const handleDrawDots = useCallback(() => {
    clearCanvas({ ...canvas });
    forEach(dots, dot => {
      const trail = getDotTrail(dot);

      drawDot({
        ...dot,
        color: dotsColor,
        context: canvas.context,
        size: getDotSize(dot)
      });

      if (trail) {
        drawLine({
          color: dotsColor,
          context: canvas.context,
          opacity: trail.opacity,
          x1: dot.dotX,
          x2: trail.dotX,
          y1: dot.dotY,
          y2: trail.dotY
        });
      }
    });
  }, [canvas, dots, dotsColor, getDotSize, getDotTrail]);

  const handleDrawRow = useCallback((initialIndex: number) => {
    forEach(dots.slice(initialIndex, initialIndex + totalColumns), dot => {
      drawDot({
        ...dot,
        color: dotsColor,
        context: canvas.context,
        size: 2
      });
    });
  }, [canvas?.context, dots, dotsColor, totalColumns]);

  const handleMouseMovement = useCallback(({ offsetX, offsetY }) => {
    forEach(dots, dot => {
      if (isMouseHoveringDot({ ...dot, offsetX, offsetY })) {
        handleUpdateHoveredDots(dot);

        return false;
      }
    });
  }, [dots, handleUpdateHoveredDots]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (wrapperRef && wrapperRef?.current && canvasRef && canvasRef?.current) {
        const canvasWidth = wrapperRef.current.clientWidth;
        const canvasHeight = wrapperRef.current.clientHeight;
        const totalRows = Math.floor(canvasHeight / gapBetweenDots);

        setTotalColumns(Math.floor(canvasWidth / gapBetweenDots));
        setTotalRows(totalRows);
        setLastRenderedRow(totalRows);
        setCanvas({
          context: canvasRef?.current?.getContext('2d'),
          height: canvasHeight,
          width: wrapperRef.current.clientWidth
        });
      }
    };

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    if (canvas && totalRows && totalColumns) {
      const positionFix = (canvas?.width - (totalColumns - 1) * gapBetweenDots) / 2;

      setDots(flatten(map(times(totalRows), (_, rowIndex) => {
        return map(times(totalColumns), (_, columnIndex) => {
          const dotX = columnIndex * gapBetweenDots + positionFix;
          const dotY = rowIndex * gapBetweenDots + positionFix;
          const dotIndex = rowIndex * totalColumns + columnIndex;

          return {
            dotIndex,
            dotX,
            dotY
          };
        });
      })));
    }
  }, [canvas, totalColumns, totalRows]);

  useEffect(() => {
    if (canvas && totalColumns) {
      if (!hasRenderedFirstTime) {
        if (lastRenderedRow === 0) {
          setHasRenderedFirstTime(true);

          return;
        }

        const timeout = setTimeout(() => {
          handleDrawRow((lastRenderedRow - 1) * totalColumns);

          setLastRenderedRow(previous => previous - 1);
        }, 2 * lastRenderedRow);

        return () => clearTimeout(timeout);
      }
    }
  }, [
    canvas,
    handleDrawRow,
    hasRenderedFirstTime,
    lastRenderedRow,
    totalColumns
  ]);

  useEffect(() => {
    if (canvas) {
      if (hasRenderedFirstTime) {
        const currentCanvas = canvasRef?.current;

        currentCanvas.addEventListener('mousemove', handleMouseMovement);

        return () => currentCanvas.removeEventListener('mousemove', handleMouseMovement);
      }
    }
  }, [canvas, handleMouseMovement, hasRenderedFirstTime]);

  useEffect(() => {
    if (canvas && hasRenderedFirstTime) {
      handleDrawDots();
    }
  }, [canvas, handleDrawDots, hasRenderedFirstTime, hoveredDots]);

  useEffect(() => {
    if (canvas && hoveredDots.length > 0) {
      const timeout = setTimeout(() => {
        handleRemoveLastHoveredDot();
      }, 75);

      return () => clearTimeout(timeout);
    }
  }, [canvas, handleRemoveLastHoveredDot, hoveredDots]);

  return (
    <Wrapper
      className={className}
      ref={wrapperRef}
    >
      <canvas
        height={canvas?.height}
        ref={canvasRef}
        width={canvas?.width}
      />
    </Wrapper>
  );
};

/**
 * Export `DotsGridSection` component.
 */

export default DotsGridSection;

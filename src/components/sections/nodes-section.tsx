
/**
 * Module dependencies.
 */

import { Node, defaultNodes } from 'src/core/content-config/nodes-section';
import { colors } from 'src/styles/colors';
import { getRandomNumber } from 'src/core/utils/numbers';
import { transparentize, useBreakpoint } from '@untile/react-components';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import find from 'lodash/find';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import pick from 'lodash/pick';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  className?: string
};

/**
 * `Canvas` type.
 */

type Canvas = {
  context: CanvasRenderingContext2D,
  height: number,
  width: number
}

/**
 * Constants.
 */

const animationFps = 60;
const floatingDistance = 50;
const floatingSpeed = 0.5;
const showNodesIds = false;
const transitionDuration = 500;
const web2animationDuration = 5000;
const web3animationDuration = 5000;

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  width: 100%;
`;

/**
 * `drawDot`.
 */

function drawDot({ context, dotX, dotY, id, radius }) {
  context.beginPath();
  context.arc(dotX, dotY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = colors.blue600;
  context.fill();

  if (showNodesIds) {
    context.beginPath();
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(id, dotX, dotY);
    context.fill();
  }
}

/**
 * `drawLine`.
 */

function drawLine({ context, x1, x2, y1, y2 }) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 1;
  context.strokeStyle = transparentize(colors.blue600, 0.5);
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
 * `animateFloatingDot`.
 */

function animateFloatingDot({ height, initialX, initialY, node, width }): Node {
  const { directionX, directionY, dotX, dotY, radius } = node;
  const limitsX = [initialX - radius - floatingDistance, initialX + radius + floatingDistance];
  const limitsY = [initialY - radius - floatingDistance, initialY + radius + floatingDistance];
  const minX = limitsX[0] < 0 ? 0 : limitsX[0];
  const maxX = limitsX[1] > width ? width : limitsX[1];
  const minY = limitsY[0] < 0 ? 0 : limitsY[0];
  const maxY = limitsY[1] > height ? height : limitsY[1];
  let dirX = directionX;
  let dirY = directionY;

  if (dotX + radius >= maxX || dotX - radius <= minX) {
    dirX = directionX < 0 ? getRandomNumber(0, floatingSpeed) : getRandomNumber(-1 * floatingSpeed, 0);
  }

  if (dotY + radius >= maxY || dotY - radius <= minY) {
    dirY = directionY < 0 ? getRandomNumber(0, floatingSpeed) : getRandomNumber(-1 * floatingSpeed, 0);
  }

  return {
    ...node,
    directionX: dirX,
    directionY: dirY,
    dotX: dotX + dirX,
    dotY: dotY + dirY
  };
}

/**
 * `NodesSection` component.
 */

const NodesSection = ({ className }: Props): ReactElement => {
  const isTablet = useBreakpoint('md', 'max');
  const isMobile = useBreakpoint('sm', 'max');
  const wrapperRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [canvas, setCanvas] = useState<Canvas>();
  const [connectionsLine, setConnectionsLine] = useState<number>(0);
  const [hasRenderedFirstTime, setHasRenderedFirstTime] = useState<boolean>(false);
  const [isShowingWeb3, setShowingWeb3] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionFade, setTransitionFade] = useState<'increasing' | 'decreasing'>('increasing');
  const [nodes, setNodes] = useState<Node[]>([]);
  const initialNodes = useMemo<Node[]>(() => {
    const breakpointType = isMobile && 'mobile' || isTablet && 'tablet' || 'desktop';

    return map(defaultNodes(breakpointType), node => {
      return {
        ...node,
        directionX: getRandomNumber(-1 * floatingSpeed, floatingSpeed),
        directionY: getRandomNumber(-1 * floatingSpeed, floatingSpeed),
        dotX: canvas?.width * 0.05 + canvas?.width * 0.9 * node.dotX / 559,
        dotY: canvas?.height * 0.05 + canvas?.height * 0.9 * node.dotY / 230
      };
    });
  }, [canvas?.height, canvas?.width, isMobile, isTablet]);

  const handleAnimateFloatingDots = useCallback(() => {
    setNodes(previous => map(previous, (node: Node, index: number) => ({
      ...animateFloatingDot({
        ...canvas,
        initialX: initialNodes[index].dotX,
        initialY: initialNodes[index].dotY,
        node
      })
    })));
  }, [canvas, initialNodes]);

  const handleDrawDots = useCallback((nodes: Node[]) => {
    clearCanvas({ ...canvas });
    forEach(nodes, (node: Node) => {
      const { connections, dotX, dotY, laterConnections } = node;

      drawDot({
        context: canvas.context,
        ...pick(node, ['dotX', 'dotY', 'id', 'radius'])
      });

      if (connections) {
        forEach(connections, connectionId => {
          const nodeConnected = find(nodes, ({ id }) => id === connectionId);

          drawLine({
            context: canvas.context,
            x1: dotX,
            x2: nodeConnected.dotX,
            y1: dotY,
            y2: nodeConnected.dotY
          });
        });
      }

      if (laterConnections) {
        forEach(laterConnections, connectionId => {
          const nodeConnected = find(nodes, ({ id }) => id === connectionId);

          drawLine({
            context: canvas.context,
            x1: dotX,
            x2: dotX + (nodeConnected.dotX - dotX) * connectionsLine,
            y1: dotY,
            y2: dotY + (nodeConnected.dotY - dotY) * connectionsLine
          });
        });
      }
    });
  }, [canvas, connectionsLine]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (wrapperRef && wrapperRef?.current && canvasRef && canvasRef?.current) {
        const canvasWidth = wrapperRef.current.clientWidth;
        const canvasHeight = canvasWidth * 0.412;

        setHasRenderedFirstTime(false);
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
    if (canvas && !hasRenderedFirstTime) {
      handleDrawDots(initialNodes);
      setNodes(initialNodes);
      setHasRenderedFirstTime(true);
    }
  }, [canvas, handleDrawDots, hasRenderedFirstTime, initialNodes]);

  useEffect(() => {
    if (canvas && hasRenderedFirstTime) {
      const timeout = setTimeout(() => {
        setConnectionsLine(transitionFade === 'increasing' ? 0 : 1);
        setShowingWeb3(previous => !previous);
        setIsTransitioning(true);
      }, isShowingWeb3 ? web3animationDuration : web2animationDuration);

      return () => clearTimeout(timeout);
    }
  }, [canvas, hasRenderedFirstTime, isShowingWeb3, transitionFade]);

  useEffect(() => {
    if (canvas && hasRenderedFirstTime) {
      const interval = setInterval(() => {
        handleAnimateFloatingDots();
      }, 1000 / animationFps);

      return () => clearInterval(interval);
    }
  }, [canvas, handleAnimateFloatingDots, hasRenderedFirstTime]);

  useEffect(() => {
    if (canvas && hasRenderedFirstTime && isTransitioning) {
      const multiplier = transitionDuration / animationFps;
      const lineSizeMultiplier = 1 / animationFps;
      const timeout = setTimeout(() => {
        setIsTransitioning(false);

        if (transitionFade === 'increasing') {
          setTransitionFade('decreasing');

          return;
        }

        setTransitionFade('increasing');
      }, transitionDuration);

      const interval = setInterval(() => {
        setConnectionsLine(previous => {
          if (transitionFade === 'increasing') {
            return previous + lineSizeMultiplier > 1 ? 1 : previous + lineSizeMultiplier;
          }

          return previous - lineSizeMultiplier < 0 ? 0 : previous - lineSizeMultiplier;
        });
      }, multiplier);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [
    canvas,
    hasRenderedFirstTime,
    isTransitioning,
    transitionFade
  ]);

  useEffect(() => {
    if (canvas && hasRenderedFirstTime) {
      handleDrawDots(nodes);
    }
  }, [canvas, handleDrawDots, hasRenderedFirstTime, isShowingWeb3, nodes]);

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
 * Export `NodesSection` component.
 */

export default NodesSection;

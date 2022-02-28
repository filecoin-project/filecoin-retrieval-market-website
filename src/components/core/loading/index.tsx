
/**
 * Module dependencies.
 */

import { ifNotProp, ifProp, prop, theme } from 'styled-tools';
import React, { FC, ReactElement } from 'react';
import styled, { css } from 'styled-components';

/**
 * Export `LoaderProps` interface.
 */

export interface LoaderProps {
  size?: number;
  stroke?: number;
}

/**
 * Export `LoadingProps` interface.
 */

export interface LoadingProps extends LoaderProps {
  active: boolean;
  className?: string;
  relative?: boolean;
}

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.span<Pick<LoadingProps, 'active' | 'relative'>>`
  display: inline-block;
  opacity: ${ifProp('active', 1, 0)};
  pointer-events: none;
  transform: scale(0.5);
  transition: ${theme('animations.defaultTransition')};
  transition-property: opacity, transform;

  ${ifNotProp('relative', css`
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    z-index: 1;
  `)}

  ${ifProp(['active', 'relative'], css`
    transform: scale(1);
  `)}

  ${({ active, relative }) => active && !relative && css`
    transform: translate(-50%, -50%) scale(1);
  `}
`;

/**
 * `Loader` styled component.
 */

const Loader = styled.span<Pick<LoadingProps, 'size' | 'stroke'>>`
  animation: ${theme('keyframes.spin')} 0.75s linear infinite;
  border-left-color: transparent;
  border-radius: ${prop('size')}px;
  border-style: solid;
  border-width: ${prop('stroke')}px;
  display: block;
  height: ${prop('size')}px;
  width: ${prop('size')}px;
`;

/**
 * `Loading` component.
 */

const Loading: FC<LoadingProps> = (props: LoadingProps): ReactElement => {
  const { size, stroke, ...rest } = props;

  return (
    <Wrapper {...rest}>
      <Loader
        size={size}
        stroke={stroke}
      />
    </Wrapper>
  );
};

/**
 * Default props.
 */

Loading.defaultProps = {
  size: 24,
  stroke: 2
};

/**
 * Export `Loading` component.
 */

export default Loading;

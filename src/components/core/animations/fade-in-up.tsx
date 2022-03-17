
/**
 * Module dependencies.
 */

import { IntersectionOptions, useInView } from 'react-intersection-observer';
import { ifProp, prop, theme } from 'styled-tools';
import React, { ElementType, ReactElement, ReactNode } from 'react';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import styled, { css } from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  as?: ElementType,
  children: ReactNode,
  className?: string,
  fullHeight?: boolean,
  options?: IntersectionOptions & {
    distance?: any,
    transitionDelay?: number,
    transitionTime?: number
  }
};

/**
 * `Content` styled component.
 */

const Content = styled.div<{
  distance?: string,
  fullHeight?: boolean,
  isVisible: boolean,
  transitionDelay?: number,
  transitionTime?: number
}>`
  transition:
    opacity ${theme('animations.defaultTransition')} ${prop('transitionDelay', 0)}s,
    transform ${prop('transitionTime', 0.5)}s cubic-bezier(0, 0.59, 0, 1) ${prop('transitionDelay', 0)}s;
  will-change: transform;

  ${ifProp('isVisible', css`
    opacity: 1;
    transform: none;
  `, css`
    opacity: 0;
    transform: translateY(${prop('distance', '20%')});
  `)}

  ${ifProp('fullHeight', css`
    height: 100%;
  `)}
`;

/**
 * `FadeInUpAnimation` component.
 */

const FadeInUpAnimation = (props: Props): ReactElement => {
  const { children, className, options, ...rest } = props;
  const inViewOptions = omit(options, ['distance, transitionDelay, transitionTime']);
  const [ref, inView] = useInView(merge({}, {
    threshold: 0.2,
    triggerOnce: true
  }, inViewOptions));

  return (
    <Content
      {...rest}
      className={className}
      distance={options?.distance}
      isVisible={inView}
      ref={ref}
      transitionDelay={options?.transitionDelay}
      transitionTime={options?.transitionTime}
    >
      {children}
    </Content>
  );
};

/**
 * Export `FadeInUpAnimation` component.
 */

export default FadeInUpAnimation;

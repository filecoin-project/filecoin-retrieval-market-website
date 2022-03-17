
/**
 * Module dependencies.
 */

import { IntersectionOptions, useInView } from 'react-intersection-observer';
import { ifProp, prop } from 'styled-tools';
import React, { ElementType, ReactElement, ReactNode } from 'react';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  as?: ElementType,
  children: ReactNode,
  className?: string,
  options?: IntersectionOptions & {
    transitionDelay?: number,
    transitionTime?: number
  }
};

/**
 * `Content` styled component.
 */

const Content = styled.div<{
  isVisible: boolean,
  transitionDelay?: number,
  transitionTime?: number
}>`
  opacity: ${ifProp('isVisible', 1, 0)};
  transition: opacity ${prop('transitionTime', 0.5)}s ease ${prop('transitionDelay', 0)}s;
`;

/**
 * `FadeInAnimation` component.
 */

const FadeInAnimation = (props: Props): ReactElement => {
  const { children, options, ...rest } = props;
  const inViewOptions = omit(options, ['transitionDelay, transitionTime']);
  const [ref, inView] = useInView(merge({}, {
    threshold: 0.2,
    triggerOnce: true
  }, inViewOptions));

  return (
    <Content
      {...rest}
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
 * Export `FadeInAnimation` component.
 */

export default FadeInAnimation;

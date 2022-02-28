
/**
 * Module dependencies.
 */

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { ReactElement } from 'react';

/**
 * Export `ImageProps` type.
 */

export type ImageProps = NextImageProps & {
  className?: string
};

/**
 * `Image` component.
 */

const Image = (props: ImageProps): ReactElement => (
  <NextImage
    {...props}
  />
);

/**
 * Export `Image` component.
 */

export default Image;

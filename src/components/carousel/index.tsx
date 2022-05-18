
/**
 * Module dependencies.
 */

import { Swiper, SwiperSlide } from 'swiper/react';
import { media, units, useBreakpoint } from '@untile/react-components';
import { theme as stylesTheme } from 'src/styles/theme';
import { theme } from 'styled-tools';
import React, {
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import SwiperCore, {
  Controller,
  Keyboard,
  Mousewheel,
  Parallax,
  Scrollbar,
  SwiperOptions
} from 'swiper';

import merge from 'lodash/merge';
import styled, { createGlobalStyle } from 'styled-components';
import swiperStyles from 'swiper/swiper-bundle.css';

/**
 * Load swiper components.
 */

SwiperCore.use([
  Controller,
  Parallax,
  Scrollbar,
  Keyboard,
  Mousewheel
]);

/**
 * Export `CarouselProps` interface.
 */

export interface CarouselProps extends SwiperOptions {
  activeSlide: number,
  carouselConfig?: any;
  children: ReactNode;
  className?: string;
  onSetActiveSlide: Dispatch<SetStateAction<number>>;
  ref?: any;
  showScrollbar?: boolean;
  totalItems?: number;
}

/**
 * `GlobalStyle` component.
 */

const GlobalStyle = createGlobalStyle`
  ${swiperStyles}
`;

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  position: relative;

  > div {
    height: auto;
  }

  .swiper-container {
    height: 100%;
    margin: 0;
    padding-left: ${theme('grid.gutterMobile')}px;

    ${media.min('md')`
      padding-left: ${theme('grid.gutter')}px;
    `}
  }

  .swiper-wrapper {
    padding-bottom: ${units(1.5)};
  }

  .swiper-slide {
    height: auto;
  }
`;

/**
 * Default carousel config.
 */

const defaultCarouselConfig = ({ isMobile, totalItems }) => {
  return {
    slidesOffsetAfter: totalItems > 1 && (isMobile ? stylesTheme.grid.gutterMobile : stylesTheme.grid.gutter),
    slidesPerView: 1
  };
};

/**
 * Export `Slide` component.
 */

export const Slide = SwiperSlide;

/**
 * `Carousel` component.
 */

const Carousel: FC<CarouselProps> = forwardRef<any, CarouselProps>((props: CarouselProps, ref: any): ReactElement => {
  const {
    carouselConfig,
    children,
    className,
    containerModifierClass,
    onSetActiveSlide,
    speed,
    totalItems,
    ...rest } = props;

  const [windowWidth, setWindowWidth] = useState<number>();
  const isMobile = useBreakpoint('md', 'max');
  const modifierClassName = containerModifierClass ? `${containerModifierClass}-` : '';
  const normalizedCarouselConfig = useMemo(() => {
    if (!carouselConfig) {
      return null;
    }

    const defaultConfig = defaultCarouselConfig({
      isMobile,
      totalItems
    });

    return merge({}, carouselConfig, defaultConfig);
  }, [carouselConfig, isMobile, totalItems]);

  const handleSlideChange = useCallback(({ activeIndex }) => {
    onSetActiveSlide(activeIndex);
  }, [onSetActiveSlide]);

  const handleWindowResize = useCallback(() => {
    setWindowWidth(window.innerWidth);

    if (ref && ref.current) {
      ref.current.swiper.update();
    }
  }, [ref]);

  useEffect(() => {
    if (!windowWidth) {
      setWindowWidth(window.innerWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  return (
    <Wrapper className={className}>
      <GlobalStyle />

      <Swiper
        {...normalizedCarouselConfig}
        mousewheel={{
          forceToAxis: true
        }}
        onSlideChange={handleSlideChange}
        ref={ref}
        scrollbar={{
          dragClass: `${modifierClassName}scrollbar-drag`,
          el: `.${modifierClassName}scrollbar`,
          hide: false
        }}
        speed={speed ?? 750}
        {...rest}
      >
        {children}
      </Swiper>
    </Wrapper>
  );
});

/**
 * `Carousel` display name.
 */

Carousel.displayName = 'Carousel';

/**
 * Export `Carousel` component.
 */

export default Carousel;

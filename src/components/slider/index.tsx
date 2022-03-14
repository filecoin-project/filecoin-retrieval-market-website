
/**
 * Module dependencies.
 */

import { Swiper, SwiperSlide } from 'swiper/react';
import { color, media } from '@untile/react-components';
import { prop } from 'styled-tools';
import React, {
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useState
} from 'react';

import SwiperCore, {
  Controller,
  Parallax,
  Scrollbar,
  SwiperOptions
} from 'swiper';

import styled, { createGlobalStyle } from 'styled-components';
import swiperStyles from 'swiper/swiper-bundle.css';

/**
 * Load swiper components.
 */

SwiperCore.use([
  Controller,
  Parallax,
  Scrollbar
]);

/**
 * Export `SliderProps` interface.
 */

export interface SliderProps extends SwiperOptions {
  activeSlide: number;
  children: ReactNode;
  className?: string;
  ref: any;
  onSetActiveSlide: Dispatch<SetStateAction<number>>;
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

  &,
  > .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    cursor: grab;
    height: auto;
  }
`;

/**
 * `CarouselScrollbar` styled component.
 */

const CarouselScrollbar = styled.div<{ modifierClassName: string }>`
  cursor: pointer;
  padding: 15px 0;
  width: 100%;

  ${media.min('lg')`
    margin-left: calc(100% / 12);
    max-width: calc((100% / 12) * 7);
  `}

  .${prop('modifierClassName')}scrollbar {
    background-color: ${color.transparentize('white', 0.5)};
    height: 1px;
  }

  .${prop('modifierClassName')}scrollbar-drag {
    background-color: ${color('white')};
    border-radius: 3px;
    height: 5px;
    position: relative;
    top: -2px;
  }
`;

/**
 * Export `Slide` component.
 */

export const Slide = SwiperSlide;

/**
 * `Slider` component.
 */

const Slider: FC<SliderProps> = forwardRef<any, SliderProps>((props: SliderProps, ref: any): ReactElement => {
  const {
    children,
    className,
    containerModifierClass,
    onSetActiveSlide,
    showScrollbar,
    totalItems,
    ...rest
  } = props;

  const [windowWidth, setWindowWidth] = useState<number>();
  const modifierClassName = containerModifierClass ? `${containerModifierClass}-` : '';
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
        onSlideChange={handleSlideChange}
        ref={ref}
        scrollbar={{
          dragClass: `${modifierClassName}scrollbar-drag`,
          draggable: true,
          el: `.${modifierClassName}scrollbar`,
          hide: false
        }}
        {...rest}
      >
        {children}
      </Swiper>

      {totalItems > 1 && showScrollbar && (
        <CarouselScrollbar modifierClassName={modifierClassName}>
          <div className={`${modifierClassName}scrollbar`} />
        </CarouselScrollbar>
      )}
    </Wrapper>
  );
});

/**
 * `Slider` display name.
 */

Slider.displayName = 'Slider';

/**
 * Export `Slider` component.
 */

export default Slider;

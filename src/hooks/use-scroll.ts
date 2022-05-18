
/**
 * Module dependencies.
 */

import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

/**
 * `ScrollProps` type.
 */

type ScrollProps = {
  xPos: number,
  yPos: number,
};

/**
 * `useScroll` hook.
 */

function useScroll(): ScrollProps {
  const [state, setState] = useState({ xPos: 0, yPos: 0 });

  useEffect(() => {
    const onScroll = throttle(() => {
      setState({
        xPos: window.scrollX,
        yPos: window.scrollY
      });
    }, 250);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}

/**
 * Export `useScroll`.
 */

export default useScroll;

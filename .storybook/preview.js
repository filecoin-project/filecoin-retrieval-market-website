
/**
 * Module dependencies.
 */

import {
  GlobalStyle as UntileGlobalStyle,
  createTheme
} from '@untile/react-components';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/styles/theme';
import GlobalStyle from 'src/components/core/global-style';
import React from 'react';

/**
 * Export `parameters`.
 */

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'Light',
    values: [{
      name: 'Light',
      value: '#ffffff'
    }, {
      name: 'Dark',
      value: '#000000'
    }]
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider
  },
  viewport: {
    viewports: {
      xl: {
        name: 'xl',
        styles: {
          width: '1440px',
          height: '900px'
        }
      },
      lg: {
        name: 'lg',
        styles: {
          width: '1200px',
          height: '900px'
        }
      },
      md: {
        name: 'md',
        styles: {
          width: '992px',
          height: '900px'
        }
      },
      ms: {
        name: 'ms',
        styles: {
          width: '768px',
          height: '1024px'
        }
      },
      sm: {
        name: 'sm',
        styles: {
          width: '576px',
          height: '667px'
        }
      },
      xs: {
        name: 'xs',
        styles: {
          width: '480px',
          height: '667px'
        }
      },
      xxs: {
        name: 'xxs',
        styles: {
          width: '375px',
          height: '667px'
        }
      }
    }
  }
};

/**
 * Export `decorators`.
 */

export const decorators = [
  (Story) => (
    <ThemeProvider theme={createTheme(theme)}>
      <UntileGlobalStyle />

      <GlobalStyle />

      <Story />
    </ThemeProvider>
  )
];

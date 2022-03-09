
/**
 * Module dependencies.
 */

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  GlobalStyle as UntileGlobalStyle,
  createTheme,
  isProduction
} from '@untile/react-components';

import { countlyInit } from 'src/core/utils/countly';
import { theme } from 'src/styles/theme';
import GlobalStyle from 'src/components/core/global-style';
import GridDebug from 'src/components/core/debug/grid';
import Head from 'next/head';
import Navbar from 'src/components/navbar';
import React, { ReactElement, useEffect } from 'react';
import Script from 'next/script';
import packageJson from 'package.json';

/**
 * Performance debug.
 */

const performanceDebug = process.env.NEXT_PUBLIC_PERFORMANCE_DEBUG;
const debug: boolean = performanceDebug === 'true';

/**
 * Export `reportWebVitals`.
 *
 * Measure the performance of pages .
 */

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (isProduction() && debug) {
    console.log(metric); // eslint-disable-line no-console
  }
}

/**
 * `PageApp` page.
 */

const PageApp = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

  useEffect(() => {
    countlyInit();
  }, []);

  return (
    <>
      <Head>
        <meta
          content={'IE=edge'}
          httpEquiv={'X-UA-Compatible'}
        />

        <meta
          content={'text/html;charset=utf-8'}
          httpEquiv={'Content-Type'}
        />

        <meta
          content={'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'}
          name={'viewport'}
        />

        <meta
          content={packageJson.version}
          name={'version'}
        />

        <meta
          content={'true'}
          name={'HandheldFriendly'}
        />

        <link
          href={'/static/favicon/apple-touch-icon.png'}
          rel={'apple-touch-icon'}
          sizes={'180x180'}
        />

        <link
          href={'/static/favicon/favicon-32x32.png'}
          rel={'icon'}
          sizes={'32x32'}
          type={'image/png'}
        />

        <link
          href={'/static/favicon/favicon-16x16.png'}
          rel={'icon'}
          sizes={'16x16'}
          type={'image/png'}
        />

        <link
          href={'/site.webmanifest'}
          rel={'manifest'}
        />

        <link
          color={'#5bbad5'}
          href={'/safari-pinned-tab.svg'}
          rel={'mask-icon'}
        />

        <meta
          content={'#da532c'}
          name={'msapplication-TileColor'}
        />

        <meta
          content={'#0a142b'}
          name={'theme-color'}
        />
      </Head>

      <Script
        id={'scroll-restoration'}
        strategy={'beforeInteractive'}
      >
        {`history.scrollRestoration = "manual"`}
      </Script>

      <ThemeProvider theme={createTheme(theme)}>
        <UntileGlobalStyle />

        <GlobalStyle />

        <GlobalStyle />

        {!isProduction() && (
          <GridDebug
            columns={12}
            gap={16}
          />
        )}

        <Navbar />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

/**
 * Export `PageApp` page.
 */

export default PageApp;

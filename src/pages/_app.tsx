
/**
 * Module dependencies.
 */

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import {
  GlobalStyle as UntileGlobalStyle,
  createTheme,
  isProduction
} from '@untile/react-components';

import { theme } from 'src/styles/theme';
import App, { AppContext, AppProps, NextWebVitalsMetric } from 'next/app';
import GlobalStyle from 'src/components/core/global-style';
import GridDebug from 'src/components/core/debug/grid';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import Script from 'next/script';
import packageJson from 'package.json';

/**
 * Performance debug.
 */

const performanceDebug = process.env.NEXT_PUBLIC_PERFORMANCE_DEBUG;
const debug: boolean = performanceDebug === 'true';

/**
 * Query cache.
 */

const queryClient = new QueryClient();

/**
 * Google tag manager dd.
 */

const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

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
 * `Scripts` component.
 */

const Scripts = (): ReactElement => (
  <>
    <Script
      id={'scroll-restoration'}
      strategy={'beforeInteractive'}
    >
      {`history.scrollRestoration = "manual"`}
    </Script>

    {googleTagManagerId && (
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`}
        strategy={'afterInteractive'}
      />
    )}

    {googleTagManagerId && (
      <Script
        id={'google-tag-manager'}
        strategy={'afterInteractive'}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${googleTagManagerId}');
        `}
      </Script>
    )}
  </>
);

/**
 * `PageApp` page.
 */

const PageApp = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

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
      </Head>

      <Scripts />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={createTheme(theme)}>
            <UntileGlobalStyle />

            <GlobalStyle />

            {!isProduction() && (
              <GridDebug
                columns={12}
                gap={16}
              />
            )}

            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={!isProduction()} />
      </QueryClientProvider>
    </>
  );
};

/**
 * Get initial props.
 */

PageApp.getInitialProps = async (appContext: AppContext) => {
  return {
    ...await App.getInitialProps(appContext)
  };
};

/**
 * Export `PageApp` page.
 */

export default PageApp;

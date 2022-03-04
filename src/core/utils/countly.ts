
/**
 * Module dependencies.
 */

import countly from 'countly-sdk-web';

/**
 * Countly public key.
 */

const countlyPublicKey = process.env.NEXT_PUBLIC_COUNTLY_APP_KEY;

/**
 * Config.
 */

const config = {
  app_key: countlyPublicKey,
  url: 'https://countly.protocol.ai'
};

/**
 * Export `countlyInit`.
 */

export function countlyInit() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!config.app_key || !config.url) {
    console.warn('[lib/countly]', 'Countly config not found.'); // eslint-disable-line no-console

    return;
  }

  countly.init({
    ...config,
    debug: false
  });

  countly.track_sessions();
  countly.track_pageview();
  countly.track_clicks();
  countly.track_links();
  countly.track_scrolls();
}

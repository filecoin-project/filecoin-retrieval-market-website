
/**
 * Module dependencies.
 */

import { resolve } from 'url';
import getConfig from 'next/config';

/**
 * Export `absoluteUrlResolver`.
 */

export function absoluteUrlResolver(path: string): string {
  const { publicRuntimeConfig } = getConfig();
  const vercelBaseUrl = publicRuntimeConfig?.vercelBaseUrl;
  const url: string = vercelBaseUrl ? `https://${vercelBaseUrl}` : process.env.NEXT_PUBLIC_BASE_URL;

  return resolve(url, path);
}


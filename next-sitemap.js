
/**
 * Vercel base url.
 */

const vercelBaseUrl = process.env.VERCEL_URL;

/**
 * Export `sitemap` config.
 */

module.exports = {
  generateRobotsTxt: true,
  siteUrl: vercelBaseUrl ? `https://${vercelBaseUrl}` : process.env.NEXT_PUBLIC_BASE_URL
};

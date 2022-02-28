
/**
 * Module dependencies.
 */

import { ServerStyleSheet } from 'styled-components';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

/**
 * Google tag manager dd.
 */

const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

/**
 * `PageDocument` page.
 */

class PageDocument extends Document<DocumentInitialProps> {

  /**
   * Get initial props.
   */

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  /**
   * Render.
   */

  render() {
    return (
      <Html>
        <Head />

        <body>
          {googleTagManagerId && (
            <noscript>
              <iframe
                height={0}
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                style={{ display: 'none', visibility: 'hidden' }}
                width={0}
              />
            </noscript>
          )}

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }

}

/**
 * Export `PageDocument` page.
 */

export default PageDocument;


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
        <Head>
          <link
            href={'https://fonts.googleapis.com'}
            rel={'preconnect'}
          />

          <link
            crossOrigin={'true'}
            href={'https://fonts.gstatic.com'}
            rel={'preconnect'}
          />

          <link
            href={'https://fonts.googleapis.com/css2?family=DM+Sans&display=swap'}
            rel={'stylesheet'}
          />
        </Head>

        <body>
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

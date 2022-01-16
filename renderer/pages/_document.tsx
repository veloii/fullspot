import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="cursor-default bg-gray-900 text-white overflow-hidden pointer-events-none">
        <Head>
          <link
            href="//db.onlinewebfonts.com/c/860c3ec7bbc5da3e97233ccecafe512e?family=Circular+Std+Book"
            rel="stylesheet"
            type="text/css"
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

export default MyDocument;

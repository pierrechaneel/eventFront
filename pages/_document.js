// next document definition

import {
  default as Document,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class TheDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="ORDC Events" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="ORDC Events" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#ff6600" />

          <link rel="apple-touch-icon" href="/icons/icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/mask.svg" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="icon" type="image/x-icon" href="/orange-less.png"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TheDocument;

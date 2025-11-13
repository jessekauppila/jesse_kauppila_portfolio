import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jesse Kauppila Portfolio',
  description: 'Portfolio of Jesse Kauppila',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-page="690baa0cb1dfa04fed364b4d"
      data-wf-site="690baa0bb1dfa04fed364af7"
    >
      <body>
        {children}
        <Script
          id="font-preconnect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (document.head) {
                  var link1 = document.createElement('link');
                  link1.rel = 'preconnect';
                  link1.href = 'https://fonts.googleapis.com';
                  document.head.appendChild(link1);
                  var link2 = document.createElement('link');
                  link2.rel = 'preconnect';
                  link2.href = 'https://fonts.gstatic.com';
                  link2.crossOrigin = 'anonymous';
                  document.head.appendChild(link2);
                }
              })();
            `,
          }}
        />
        <Script
          id="webflow-modules"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(o,c){
                var n=c.documentElement,t=" w-mod-";
                n.className+=t+"js";
                ("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch");
              }(window,document);
            `,
          }}
        />
        <Script
          id="webfont-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (document.head) {
                  var script = document.createElement('script');
                  script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
                  script.async = false;
                  script.onload = function() {
                    if (typeof WebFont !== 'undefined') {
                      WebFont.load({
                        google: {
                          families: [
                            "Vollkorn:400,400italic,700,700italic",
                            "Merriweather:300,300italic,400,400italic,700,700italic,900,900italic",
                            "Varela Round:400",
                            "Manrope:regular",
                            "Comfortaa:regular"
                          ]
                        }
                      });
                    }
                  };
                  document.head.appendChild(script);
                }
              })();
            `,
          }}
        />
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=690baa0bb1dfa04fed364af7"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src="/webflow.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

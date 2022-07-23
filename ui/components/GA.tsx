import Script from "next/script";
import { GA_ID } from "~/constants";

const GoogleAnalytics = () => (
  <>
    <Script
      //
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script
      id="ga"
      defer
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `,
      }}
      strategy="afterInteractive"
    />
  </>
);

export default GoogleAnalytics;

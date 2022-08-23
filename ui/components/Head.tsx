import { default as NextHead } from "next/head";
import { FC } from "react";
import { FRONTEND_URL, LAND_OGP_H, LAND_OGP_W } from "~/constants";

const Head: FC<{ title?: string; ogp?: string }> = ({ title: _title, ogp }) => {
  const title = _title || "Phi";
  const description = "Phi visualizes your on-chain identity";

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={FRONTEND_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogp ? `https://${ogp}` : "/og.png"} />
      <meta property="og:image:width" content={String(LAND_OGP_W)} />
      <meta property="og:image:height" content={String(LAND_OGP_H)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@phi_xyz" />
      <meta name="twitter:creator" content="@phi_xyz" />

      <link rel="icon" href="/favicon.svg" />
      <link rel="preload" href="/fonts/JetBrainsMono.ttf" as="font" crossOrigin="" type="font/ttf" />
      <link rel="preload" href="/fonts/philson_block.otf" as="font" crossOrigin="" type="font/otf" />
    </NextHead>
  );
};

export default Head;

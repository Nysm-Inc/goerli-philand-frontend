import { default as NextHead } from "next/head";
import { FC } from "react";
import { FRONTEND_URL, LAND_OGP_H, LAND_OGP_W } from "~/constants";

const Head: FC<{ ogp?: string }> = ({ ogp }) => {
  const title = "Phi";
  const description = "Phi visualizes the Ethereum as Metaverse";

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
      <meta property="og:image:width" content={String(ogp ? LAND_OGP_W : 1200)} />
      <meta property="og:image:height" content={String(ogp ? LAND_OGP_H : 630)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@phi_xyz" />
      <meta name="twitter:creator" content="@phi_xyz" />
      <link rel="icon" href="/favicon.svg" />
    </NextHead>
  );
};

export default Head;

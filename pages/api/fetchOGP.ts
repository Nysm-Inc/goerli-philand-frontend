import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";

type OGP = {
  type: string;
  title: string;
  image: string;
  "image:width"?: string;
  "image:height"?: string;
  description: string;
  url: string;
  site_name: string;
};

const fetchOGP = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @ts-ignore
    const u = new URL(req.query.url);
    const headers = { "User-Agent": "bot" };
    const response = await axios.get(u.toString(), { headers });

    const dom = new JSDOM(response.data);
    const meta = dom.window.document.querySelectorAll("meta");
    const ogp = Array.from(meta)
      .filter((element) => element.hasAttribute("property"))
      .reduce((memo, el) => {
        const property = el.getAttribute("property")?.trim().replace("og:", "");
        const content = el.getAttribute("content");
        if (property && content) {
          return { ...memo, [property]: content };
        } else {
          return memo;
        }
      }, {} as OGP);

    const raw = await axios.get(ogp.image, { responseType: "arraybuffer" });
    const base64 = Buffer.from(raw.data, "binary").toString("base64");
    res.status(200).json({ ogp: `data:${raw.headers["content-type"]};base64,${base64}` });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default fetchOGP;

// const ens = decodeURI(u.pathname).substring(1);
// const _res = await axios.get<{ images: string[] }>(`${UTILS_API_GATEWAY}/images/list?name=${ens}`);
// const images = _res.data.images;
// ogpURL = images.length > 0 ? "https://" + images[images.length - 1] : "";

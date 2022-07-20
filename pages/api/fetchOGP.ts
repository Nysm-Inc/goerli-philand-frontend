import axios from "axios";
import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
import { FRONTEND_URL, UTILS_API_GATEWAY } from "~/constants";

type OGP = {
  type: string;
  title: string;
  image: string;
  description: string;
  url: string;
  site_name: string;
};

const fetchOGP = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { url },
    } = req;
    // @ts-ignore
    const u = new URL(url);
    const hostname = new URL(FRONTEND_URL).hostname;
    if (u.hostname === hostname && u.toString().endsWith(".eth")) {
      const ens = decodeURI(u.pathname).substring(1);
      const _res = await axios.get<{ images: string[] }>(`${UTILS_API_GATEWAY}/images/list?name=${ens}`);
      const images = _res.data.images;
      const ogp = images.length > 0 ? "https://" + images[images.length - 1] : "";

      const raw = await axios.get(ogp, { responseType: "arraybuffer" });
      const base64 = Buffer.from(raw.data, "binary").toString("base64");
      res.status(200).json({ ogp: `data:${raw.headers["content-type"]};base64,${base64}` });
    } else {
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
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default fetchOGP;

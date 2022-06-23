import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FRONTEND_URL, UTILS_API_GATEWAY } from "~/constants";

const fetchOGP = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { url },
  } = req;
  try {
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
      return;
    }
  } catch (err) {
    res.status(400).end(err);
    return;
  }
};

export default fetchOGP;

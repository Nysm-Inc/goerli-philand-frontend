import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const updateOGP = async (ens: string | null | undefined, dataurl: string) => {
  const body = { name: ens + ".png", file: dataurl };
  return axios.post(UTILS_API_GATEWAY + "/images/upload", body);
};

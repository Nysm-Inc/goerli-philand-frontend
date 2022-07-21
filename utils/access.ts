import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const postAccess = async (name: string, url: string, address?: string): Promise<void> => {
  const u = new URL(UTILS_API_GATEWAY + "/access");
  return axios.post(u.toString(), { name, url, user: address || "" });
};

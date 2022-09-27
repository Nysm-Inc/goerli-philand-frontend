import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const login = (address: string) => {
  const u = new URL(UTILS_API_GATEWAY + "/action");
  return axios.post(u.toString(), { address, type: "LOGIN" });
};

import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const getEXP = async (address: string) => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/exp");
  u.searchParams.append("address", address);
  const res = await axios.get<{ result: number }>(u.toString());
  return res?.data?.result || 0;
};

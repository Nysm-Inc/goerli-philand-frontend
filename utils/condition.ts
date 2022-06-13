import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";
import { ClaimableList } from "~/types/quest";

export const getClaimableList = async (address: string): Promise<ClaimableList> => {
  const url = new URL(UTILS_API_GATEWAY + "/condition/check");
  url.searchParams.append("address", address);
  const res = await axios.get<{ result: ClaimableList }>(url.toString());
  return res.data?.result || [];
};

export const postClaimableList = async (address: string): Promise<void> => {
  const url = new URL(UTILS_API_GATEWAY + "/condition/check");
  url.searchParams.append("address", address);
  return axios.post(url.toString());
};

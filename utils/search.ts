import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

type SearchResponse = {
  name: {
    id: string;
    name: string;
    sender: string;
  }[];
  scrollId: string;
};

export const search = async (name: string): Promise<SearchResponse> => {
  const url = new URL(UTILS_API_GATEWAY + "/search");
  url.searchParams.append("name", name);

  const res = await axios.get<SearchResponse>(url.toString());
  return res.data;
};

export const updateSearchIndexed = async (name?: string): Promise<void> => {
  const url = new URL(UTILS_API_GATEWAY + "/search");
  if (name) {
    url.searchParams.append("name", name);
  }
  return axios.post(url.toString());
};

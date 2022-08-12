import axios from "axios";
import { ENS_GRAPH_ENDPOINT, UTILS_API_GATEWAY } from "~/constants";

type Domain = {
  name: string;
  labelName: string;
  labelhash: string;
};

export const getOwnedEnsDomains = async (account: string): Promise<Domain[]> => {
  const query = `
      {
        account(id: "${account.toLowerCase()}") {
          domains {
            name
            labelName
            labelhash
          }
        }
      }
    `;
  const res = await axios.post<{ data: { account?: { domains: Domain[] } } }>(ENS_GRAPH_ENDPOINT, { query });
  return res.data.data.account?.domains || [];
};

export const isValid = (ens: string) => ens.match(/^.+\.eth$/g);

export const createPhiSubdomain = (address: string, value: number) => {
  const u = new URL(UTILS_API_GATEWAY + "/ens/create");
  u.searchParams.append("address", address);
  u.searchParams.append("value", value.toString());
  return axios.get<{ hash: string }>(u.toString());
};

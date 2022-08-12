import axios from "axios";
import { ENS_GRAPH_ENDPOINT, UTILS_API_GATEWAY } from "~/constants";

type Domain = {
  id: string;
  name: string;
  labelName: string;
  labelhash: string;
};

export const getOwnedEnsDomains = async (account: string): Promise<Domain[]> => {
  const query = `
      {
        account(id: "${account.toLowerCase()}") {
          domains {
            id
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

export const createPhiSubdomain = (address: string) => {
  const unix = new Date().getTime();
  const u = new URL(UTILS_API_GATEWAY + "/ens/create");
  u.searchParams.append("address", address);
  u.searchParams.append("value", unix.toString());
  return axios.post(u.toString());
};

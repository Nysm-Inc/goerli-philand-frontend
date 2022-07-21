import axios from "axios";
import { ENS_GRAPH_ENDPOINT } from "~/constants";

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

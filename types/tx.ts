import { Chain } from "wagmi";

export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  action?: string;
  msg?: string;
  hash?: string;
  chain?: Chain;
  status: Status;
  tmpStatus: Status;
};

export const formatTxErr = (error: Error, variables: any): string => {
  return JSON.stringify({
    name: error.name,
    message: error.message,
    contract: variables.addressOrName,
    function: variables.functionName,
    args: variables.args,
  });
};
